import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "#/integrations/database/prisma.service.js";
import { username, admin } from "better-auth/plugins";
import { appConfig, authConfig } from "#/config/index.js";
export const auth = betterAuth({
  baseURL: appConfig.corsOrigin,
  basePath: "/api/auth",
  trustedOrigins: [appConfig.trustedOrigins ?? ""],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  experimental: {
    instrumentation: {
      enabled: false,
    },
  },
  user: {
    modelName: "user",
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [username(), admin()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: authConfig.github_client_id ?? "",
      clientSecret: authConfig.github_client_secret ?? "",
    },
    google: {
      clientId: authConfig.google_client_id ?? "",
      clientSecret: authConfig.google_client_secret ?? "",
    },
  },
});
