import { randomUUID } from "node:crypto";
import { logger } from "#/integrations/logging/logger.service.js";
import { container } from "#/app/app.container.js";
export const createContext = ({ request }: { request: Request }) => {
  const requestId = request.headers.get("x-request-id") ?? randomUUID();
  return {
    prisma: container.getContext().prisma,
    redis: container.getContext().cache,
    log: logger.child({ requestId }),
    services: {
      user: container.getContext().services.user,
    },
  };
};

console.log("hello")

export type Context = ReturnType<typeof createContext>;
