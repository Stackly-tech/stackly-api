import type { Request, Response, NextFunction } from "express";
import { BetterAuthService } from "./better-auth.service.js";

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

const authService = new BetterAuthService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("skbskj");
    const session = await authService.getSession(req);

    if (!session) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
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
