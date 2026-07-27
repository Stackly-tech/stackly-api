import express, { type Express } from "express";
import { requestLogger } from "#common/config/logger.js";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import compression from "compression";
export function registerMiddlewares(app: Express) {
  app.use(helmet());
  app.use(
    cors({
      credentials: false,
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
}
