import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "#/integrations/database/prisma.service.js";
import { username, admin } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "",
  basePath: "/api/auth",
  trustedOrigins: [process.env.trustedOrigins ?? ""],
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
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
});
