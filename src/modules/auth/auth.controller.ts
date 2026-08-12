import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import {
  loginSchema,
  passwordSchema,
  refreshSchema,
  registerSchema,
} from "./auth.schemas.js";

function setRefreshCookie(res: Response, token: string) {
  res.setHeader(
    "Set-Cookie",
    `refresh_token=${encodeURIComponent(token)}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
}

function readRefreshCookie(req: Request): string | undefined {
  const value = req.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("refresh_token="));
  return value
    ? decodeURIComponent(value.slice("refresh_token=".length))
    : undefined;
}

export class AuthController {
  constructor(private readonly service: AuthService) {}

  register = async (req: Request, res: Response) =>
    res
      .status(201)
      .json(await this.service.register(registerSchema.parse(req.body)));

  login = async (req: Request, res: Response) => {
    const input = loginSchema.parse(req.body);
    const userAgent = req.get("user-agent");
    const metadata = {
      ...(req.ip ? { ipAddress: req.ip } : {}),
      ...(userAgent ? { userAgent } : {}),
    };
    const result = await this.service.login(input, metadata);
    setRefreshCookie(res, result.refreshToken);
    return res.json({
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
    });
  };

  refresh = async (req: Request, res: Response) => {
    const input = refreshSchema.parse(req.body);
    const refreshToken = input.refreshToken ?? readRefreshCookie(req);
    if (!refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });
    const result = await this.service.refresh(refreshToken);
    setRefreshCookie(res, result.refreshToken);
    return res.json({
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
    });
  };

  logout = async (req: Request, res: Response) => {
    await this.service.logout(req.auth!.sessionId, req.auth!.userId);
    res.setHeader(
      "Set-Cookie",
      "refresh_token=; HttpOnly; Path=/api/auth; Max-Age=0; SameSite=Lax",
    );
    return res.status(204).send();
  };

  logoutAll = async (req: Request, res: Response) => {
    await this.service.logoutAll(req.auth!.userId);
    res.setHeader(
      "Set-Cookie",
      "refresh_token=; HttpOnly; Path=/api/auth; Max-Age=0; SameSite=Lax",
    );
    return res.status(204).send();
  };

  me = async (req: Request, res: Response) =>
    res.json(await this.service.me(req.auth!.userId, req.auth!.tenantId));

  forgotPassword = async (req: Request, res: Response) => {
    const body = req.body as { tenantId?: string; email?: string };
    if (body.tenantId && body.email)
      await this.service.forgotPassword(
        body.tenantId,
        body.email.toLowerCase(),
      );
    return res.json({
      message: "If the account exists, reset instructions will be sent",
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const body = req.body as { token?: string; password?: string };
    if (!body.token || !body.password)
      return res.status(400).json({ message: "Invalid reset request" });
    await this.service.resetPassword(body.token, body.password);
    return res.json({ message: "Password reset successfully" });
  };

  changePassword = async (req: Request, res: Response) => {
    const input = passwordSchema.parse(req.body);
    await this.service.changePassword(
      req.auth!.userId,
      input.currentPassword,
      input.newPassword,
    );
    return res.json({ message: "Password changed successfully" });
  };
}
