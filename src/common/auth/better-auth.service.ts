// infrastructure/auth/better-auth.service.ts

import { fromNodeHeaders } from "better-auth/node";
import { auth } from "#/common/config/better-auth.config.js";
import type { Request } from "express";
export class BetterAuthService {
  async getSession(req: Request) {
    console.log(
      "🚀 ~ BetterAuthService ~ getSession ~ req.headers:",
      req.headers.cookie,
    );
    const ss = fromNodeHeaders(req.headers);
    console.log("🚀 ~ BetterAuthService ~ getSession ~ ss:", ss);
    return auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  }

  async getRequiredSession(req: Request) {
    const session = await this.getSession(req);
    console.log(
      "🚀 ~ BetterAuthService ~ getRequiredSession ~ session:",
      session,
    );

    if (!session) {
      throw new Error("Unauthorized");
    }

    return session;
  }
}
