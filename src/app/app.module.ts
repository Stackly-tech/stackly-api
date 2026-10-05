import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { randomUUID } from "node:crypto";
import { rateLimit } from "express-rate-limit";
import { requestLogger } from "#/integrations/logging/logger.service.js";
import { graphqlModule } from "#/graphql/graphql.module.js";
import { handleAuthWebhooks } from "#/http/webhooks/better-auth.webhook.js";
import { swaggerUi, document } from "#/common/utils/index.js";
import { restErrorHandler } from "#/integrations/errorHandler/rest.errorHandler.js";
import { appConfig } from "#/config/app.config.js";
export function createApp(): Express {
  const app = express();
  const isProd = appConfig.nodeEnv === "production";

  app.disable("x-powered-by");
  if (appConfig.trustProxy) app.set("trust proxy", appConfig.trustProxy);

  // 1. Trace everything: request ID, then logging
  app.use((req, res, next) => {
    const id = req.header("x-request-id")?.slice(0, 64) ?? randomUUID();
    req.id = id;
    res.setHeader("x-request-id", id);
    next();
  });
  app.use(requestLogger);

  // 2. Health check, before limiters
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // 3. Security headers + CORS
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: appConfig.corsOrigin, // string or array from env
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Authorization", "Content-Type", "X-Request-Id"],
      exposedHeaders: ["X-Request-Id"],
      maxAge: 600,
    }),
  );

  // 4. Rate limiting: strict for auth, general for the rest
  app.use(
    "/api/auth",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 20,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // 5. Better Auth: must come before any body parser
  app.all("/api/auth/*splat", handleAuthWebhooks);

  app.use(compression({ threshold: 1024 }));

  // 6. GraphQL: Yoga parses its own body, so mount before express.json()
  app.use("/graphql", (req, res) => graphqlModule(req, res));

  // 7. REST: body parsing only applies from here down
  app.use(express.json({ limit: "100kb" }));

  if (!isProd) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(document));
    app.get("/", (_req, res) => res.redirect("/api-docs"));
  }

  // 8. 404 + error handling, always last
  app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
  });
  app.use(restErrorHandler);

  return app;
}
export const app = createApp();
export default app;
