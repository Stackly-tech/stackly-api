import { createHash, randomBytes, randomUUID } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

const issuer = process.env.JWT_ISSUER ?? "stackly-api";
const audience = process.env.JWT_AUDIENCE ?? "stackly-api";
const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

if (secret.length < 32) {
  console.warn("JWT_SECRET must be at least 32 characters in production");
}

export interface AccessTokenClaims {
  sub: string;
  sid: string;
  tenantId: string;
  jti: string;
}

export class TokenService {
  async createAccessToken(
    claims: Omit<AccessTokenClaims, "jti">,
  ): Promise<string> {
    return new SignJWT({ tenantId: claims.tenantId, sid: claims.sid })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuer(issuer)
      .setAudience(audience)
      .setSubject(claims.sub)
      .setJti(randomUUID())
      .setIssuedAt()
      .setExpirationTime(process.env.ACCESS_TOKEN_TTL ?? "15m")
      .sign(secret);
  }

  verifyAccessToken(token: string): Promise<{ payload: AccessTokenClaims }> {
    return jwtVerify<AccessTokenClaims>(token, secret, {
      issuer,
      audience,
    });
  }

  createOpaqueToken(): string {
    return randomBytes(48).toString("base64url");
  }

  hashOpaqueToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
