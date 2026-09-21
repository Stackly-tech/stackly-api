import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "#/common/config/prisma.js";
import { username, admin } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3100"],
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
      clientId: "Ov23li1FZc9ydwSfnohq",
      clientSecret: "87e8d82f434b35a093bf529afb5ccce4dc8356fc",
    },
    google: {
      clientId:
        "349719831191-9bu7a1ii40vrhp4vie2etqf8rvdovu62.apps.googleusercontent.com",
      clientSecret: "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",
    },
  },
});
