import type { NextFunction, Request, Response } from "express";
import { redis, connectRedis } from "#common/config/redis.js";
import { prisma } from "#common/config/prisma.js";
import {
  AuthorizationError,
  AuthenticationError,
} from "#exceptions/authentication.errors.js";
import { TokenService } from "#common/security/token-service.js";

export type AuthContext = {
  userId: string;
  tenantId: string;
  sessionId: string;
  jti: string;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

const tokenService = new TokenService();

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new AuthenticationError();
  try {
    const { payload } = await tokenService.verifyAccessToken(header.slice(7));
    const userId = payload.sub;
    const tenantId = payload.tenantId;
    const sessionId = payload.sid;
    const jti = payload.jti;
    if (!userId || !tenantId || !sessionId || !jti)
      throw new AuthenticationError();
    await connectRedis();
    if (await redis.exists(`auth:blacklist:${jti}`))
      throw new AuthenticationError();
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId,
        tenantId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
    if (!session) throw new AuthenticationError();
    req.auth = { userId, tenantId, sessionId, jti };
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError();
  }
}

export function authorize(permission: string) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) throw new AuthenticationError();
    const cacheKey = `auth:permissions:${req.auth.tenantId}:${req.auth.userId}`;
    await connectRedis();
    let permissions = await redis.sMembers(cacheKey);
    if (!permissions.length) {
      const rows = await prisma.userRole.findMany({
        where: {
          userId: req.auth.userId,
          role: { OR: [{ tenantId: req.auth.tenantId }, { tenantId: null }] },
        },
        select: {
          role: {
            select: {
              rolePermissions: {
                select: { permission: { select: { key: true } } },
              },
            },
          },
        },
      });
      permissions = rows.flatMap((row) =>
        row.role.rolePermissions.map((item) => item.permission.key),
      );
      if (permissions.length) await redis.sAdd(cacheKey, permissions);
      await redis.expire(cacheKey, 300);
    }
    if (!permissions.includes(permission)) throw new AuthorizationError();
    next();
  };
}
