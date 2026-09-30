import { randomUUID } from "node:crypto";
import { logger } from "#/integrations/logging/logger.service.js";
import { redis } from "#/integrations/cache/redis.service.js";
import { prisma } from "#/integrations/database/prisma.service.js";
import { UserModule } from "#/graphql/schema.js";

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
