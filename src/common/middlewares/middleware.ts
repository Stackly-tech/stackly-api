import express, { type Express } from "express";
import { requestLogger, logger } from "#common/config/logger.js";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import compression from "compression";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "#exceptions/app.error.js";
import { ZodError } from "zod";
import { Prisma } from "#generated/prisma/client.js";

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
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    logger.warn({ err }, err.message);
    return res.status(400).json({
      message: "Validation failed",
      errors: err.flatten(),
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.warn(err);
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          message: "Duplicate record",
        });

      case "P2025":
        return res.status(404).json({
          message: "Record not found",
        });
    }
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    logger.warn(err);
    return res.status(400).json({
      message: "Invalid query",
    });
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    logger.warn(err);
    return res.status(500).json({
      message: "Database unavailable",
    });
  }
  if (err instanceof SyntaxError) {
    logger.warn(err);
    return res.status(400).json({
      message: "Invalid JSON",
    });
  }
  if (err instanceof Error) {
    logger.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
  logger.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
  });
}
