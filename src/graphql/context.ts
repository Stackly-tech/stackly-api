import { randomUUID } from "node:crypto";
import { logger } from "#/infrastructure/logging/logger.service.js";
import { redis } from "#/infrastructure/cache/redis.service.js";
import { prisma } from "#/infrastructure/database/prisma.service.js";
import { UserModule } from "#/modules/user/user.module.js";

export const createContext = ({ request }: { request: Request }) => {
  const requestId = request.headers.get("x-request-id") ?? randomUUID();
  return {
    prisma,
    redis,
    log: logger.child({ requestId }),
    services: {
      user: UserModule.service,
    },
  };
};

export type Context = ReturnType<typeof createContext>;
