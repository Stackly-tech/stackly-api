import express, { type Express } from "express";
import cors from "cors";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { requestLogger } from "#/infrastructure/logging/logger.service.js";
import { graphqlModule } from "#/graphql/graphql.module.js";
import { handleAuthWebhooks } from "#/http/webhooks/better-auth.webhook.js";
import { swaggerUi, document } from "#/common/utils/index.js";
import { errorHandler } from "#/common/middlewares/middleware.js";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3100",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Authorization", "Content-Type"],
      maxAge: 600,
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use(compression({ level: 9, threshold: 1024 }));
  app.use(express.json({ limit: "5mb" }));
  app.use(requestLogger);

  app.use("/graphql", (req, res) => graphqlModule(req, res));
  app.all("/api/auth/*splat", handleAuthWebhooks);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(document));

  app.get("/", (_req, res) => {
    res.redirect("/api-docs");
  });

  app.use(errorHandler);

  return app;
}

export const app = createApp();
export default app;
