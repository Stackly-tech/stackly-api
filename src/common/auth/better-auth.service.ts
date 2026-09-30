import { fromNodeHeaders } from "better-auth/node";
import { auth } from "#/config/better-auth.config.js";
import type { Request } from "express";

export class BetterAuthService {
  async getSession(req: Request) {
    return auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  }

  async getRequiredSession(req: Request) {
    const session = await this.getSession(req);
    if (!session) {
      throw new Error("Unauthorized");
    }
    return session;
  }
}
