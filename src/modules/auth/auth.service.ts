import { PrismaClient, UserStatus } from "#generated/prisma/client.js";
import { connectRedis, redis } from "#common/config/redis.js";
import {
  InvalidCredentialsError,
  AccountLockedError,
  AuthenticationError,
} from "#exceptions/authentication.errors.js";
import { Argon2PasswordHasher } from "#common/security/password-hasher.js";
import { TokenService } from "#common/security/token-service.js";
import type { LoginInput, RegisterInput } from "./auth.schemas.js";

const maxFailures = 5;
const lockDurationMs = 15 * 60 * 1000;
const refreshDurationMs = 30 * 24 * 60 * 60 * 1000;

export class AuthService {
  private readonly passwordHasher = new Argon2PasswordHasher();
  private readonly tokenService = new TokenService();

  constructor(private readonly prisma: PrismaClient) {}

  async register(input: RegisterInput) {
    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = await this.prisma.user.create({
      data: {
        tenantId: input.tenantId,
        email: input.email,
        passwordHash,
        status: UserStatus.ACTIVE,
        emailVerified: false,
      },
      select: {
        id: true,
        tenantId: true,
        email: true,
        status: true,
        emailVerified: true,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId: user.tenantId,
        actorUserId: user.id,
        action: "USER_CREATED",
        entity: "User",
        entityId: user.id,
      },
    });

    return user;
  }

  async login(
    input: LoginInput,
    metadata: { ipAddress?: string; userAgent?: string },
  ) {
    await connectRedis();
    const throttleKey = `auth:login:${input.tenantId}:${input.email}`;
    const attempts = Number((await redis.get(throttleKey)) ?? "0");
    if (attempts >= maxFailures) {
      throw new AccountLockedError();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        tenantId_email: { tenantId: input.tenantId, email: input.email },
      },
    });

    if (!user?.passwordHash) {
      await this.recordFailure(throttleKey);
      throw new InvalidCredentialsError();
    }

    if (
      user.status === UserStatus.DISABLED ||
      user.status === UserStatus.DELETED
    ) {
      throw new InvalidCredentialsError();
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new AccountLockedError();
    }

    const valid = await this.passwordHasher.verify(
      user.passwordHash,
      input.password,
    );
    if (!valid) {
      await this.recordFailure(throttleKey);
      const failures = user.failedLoginCount + 1;
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginCount: failures,
          lockedUntil:
            failures >= maxFailures
              ? new Date(Date.now() + lockDurationMs)
              : null,
        },
      });
      throw new InvalidCredentialsError();
    }

    await redis.del(throttleKey);
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        tenantId: user.tenantId,
        ...(input.deviceName ? { deviceName: input.deviceName } : {}),
        ...(metadata.ipAddress ? { ipAddress: metadata.ipAddress } : {}),
        ...(metadata.userAgent ? { userAgent: metadata.userAgent } : {}),
        expiresAt: new Date(Date.now() + refreshDurationMs),
      },
    });
    const refreshToken = this.tokenService.createOpaqueToken();
    await this.prisma.refreshToken.create({
      data: {
        sessionId: session.id,
        userId: user.id,
        tokenHash: this.tokenService.hashOpaqueToken(refreshToken),
        familyId: session.id,
        expiresAt: session.expiresAt,
      },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
    await this.prisma.auditLog.create({
      data: {
        tenantId: user.tenantId,
        actorUserId: user.id,
        action: "LOGIN",
        entity: "Session",
        entityId: session.id,
        ...(metadata.ipAddress ? { ipAddress: metadata.ipAddress } : {}),
        ...(metadata.userAgent ? { userAgent: metadata.userAgent } : {}),
      },
    });

    const accessToken = await this.tokenService.createAccessToken({
      sub: user.id,
      sid: session.id,
      tenantId: user.tenantId,
    });

    return { accessToken, refreshToken, expiresAt: session.expiresAt };
  }

  async logout(sessionId: string, userId: string): Promise<void> {
    const session = await this.prisma.session.findFirst({
      where: { id: sessionId, userId },
    });
    if (!session) {
      throw new AuthenticationError();
    }
    await this.prisma.$transaction([
      this.prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      }),
      this.prisma.refreshToken.updateMany({
        where: { sessionId: session.id, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
      this.prisma.auditLog.create({
        data: {
          tenantId: session.tenantId,
          actorUserId: userId,
          action: "LOGOUT",
          entity: "Session",
          entityId: session.id,
        },
      }),
    ]);
  }

  async logoutAll(userId: string): Promise<void> {
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.session.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: now },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: now },
      }),
    ]);
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.tokenService.hashOpaqueToken(refreshToken);
    const current = await this.prisma.refreshToken.findUnique({
      include: { session: true, user: true },
      where: { tokenHash },
    });
    if (
      !current ||
      current.expiresAt <= new Date() ||
      current.revokedAt ||
      current.session.revokedAt
    ) {
      throw new AuthenticationError("Invalid refresh token");
    }

    if (current.usedAt) {
      const now = new Date();
      await this.prisma.$transaction([
        this.prisma.refreshToken.updateMany({
          where: { familyId: current.familyId, revokedAt: null },
          data: { revokedAt: now },
        }),
        this.prisma.session.update({
          where: { id: current.sessionId },
          data: { revokedAt: now },
        }),
      ]);
      throw new AuthenticationError("Refresh token reuse detected");
    }

    const replacement = this.tokenService.createOpaqueToken();
    const replacementHash = this.tokenService.hashOpaqueToken(replacement);
    const accessToken = await this.tokenService.createAccessToken({
      sub: current.userId,
      sid: current.sessionId,
      tenantId: current.user.tenantId,
    });
    await this.prisma.$transaction([
      this.prisma.refreshToken.update({
        where: { id: current.id },
        data: { usedAt: new Date(), replacedBy: replacementHash },
      }),
      this.prisma.refreshToken.create({
        data: {
          sessionId: current.sessionId,
          userId: current.userId,
          tokenHash: replacementHash,
          familyId: current.familyId,
          expiresAt: current.expiresAt,
        },
      }),
      this.prisma.session.update({
        where: { id: current.sessionId },
        data: { lastUsedAt: new Date() },
      }),
    ]);
    return {
      accessToken,
      refreshToken: replacement,
      expiresAt: current.expiresAt,
    };
  }

  async forgotPassword(tenantId: string, email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
    });
    if (!user) return;
    const token = this.tokenService.createOpaqueToken();
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: this.tokenService.hashOpaqueToken(token),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const reset = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash: this.tokenService.hashOpaqueToken(token) },
    });
    if (!reset || reset.usedAt || reset.expiresAt <= new Date())
      throw new AuthenticationError("Invalid reset token");
    const passwordHash = await this.passwordHasher.hash(password);
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: reset.userId },
        data: { passwordHash, failedLoginCount: 0, lockedUntil: null },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: reset.id },
        data: { usedAt: now },
      }),
      this.prisma.session.updateMany({
        where: { userId: reset.userId, revokedAt: null },
        data: { revokedAt: now },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: reset.userId, revokedAt: null },
        data: { revokedAt: now },
      }),
    ]);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (
      !user?.passwordHash ||
      !(await this.passwordHasher.verify(user.passwordHash, currentPassword))
    ) {
      throw new InvalidCredentialsError();
    }
    const passwordHash = await this.passwordHasher.hash(newPassword);
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
      }),
      this.prisma.session.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: now },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: now },
      }),
      this.prisma.auditLog.create({
        data: {
          tenantId: user.tenantId,
          actorUserId: userId,
          action: "PASSWORD_CHANGED",
          entity: "User",
          entityId: userId,
        },
      }),
    ]);
  }

  async me(userId: string, tenantId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId, tenantId },
      select: {
        id: true,
        tenantId: true,
        email: true,
        status: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });
  }

  private async recordFailure(key: string): Promise<void> {
    await redis.incr(key);
    await redis.expire(key, 15 * 60);
  }
}
