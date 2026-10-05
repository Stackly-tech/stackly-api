import { randomUUID } from "node:crypto";
import { logger } from "#/integrations/logging/logger.service.js";
import { container } from "#/app/app.container.js";
import { authService } from "#/integrations/index.js";
export const createContext = ({ request }: { request: Request }) => {
  const requestId = request.headers.get("x-request-id") ?? randomUUID();
  const { prisma, cache, services } = container.getContext();
  // Remember the result so we only look it up once per request
  let sessionPromise:
    ReturnType<typeof authService.getRequiredSession> | undefined;
  const getSession = () => {
    sessionPromise ??= authService.getRequiredSession(request.headers);
    return sessionPromise;
  };
  return {
    getSession,
    prisma,
    redis: cache,
    log: logger.child({ requestId }),
    services: {
      user: services.user,
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
