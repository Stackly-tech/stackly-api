import { auth } from "#/integrations/auth/better-auth.js";
import { GraphQLError } from "graphql";
export class BetterAuthService {
  async getSession(headers: Headers) {
    return auth.api.getSession({
      headers,
    });
  }

  async getRequiredSession(headers: Headers) {
    const session = await this.getSession(headers);
    if (!session) {
      throw new GraphQLError("Unauthorized");
    }
    return session;
  }
}
