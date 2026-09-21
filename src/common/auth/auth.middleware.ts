// infrastructure/auth/auth.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { BetterAuthService } from "./better-auth.service.js";

const authService = new BetterAuthService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await authService.getSession(req);
    console.log("🚀 ~ authenticate ~ session:", session);

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.auth = {
      userId: session.user.id,
      sessionId: session.session.id,
    };

    next();
  } catch (error) {
    next(error);
  }
}
