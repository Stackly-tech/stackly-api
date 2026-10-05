import type { Request, Response, NextFunction } from "express";
import { BetterAuthService } from "./better-auth.service.js";
import { fromNodeHeaders } from "better-auth/node";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
      };
    }
  }
}

export const authService = new BetterAuthService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const session = await authService.getRequiredSession(
      fromNodeHeaders(req.headers),
    );
    req.auth = {
      userId: session.user.id,
      sessionId: session.session.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}
