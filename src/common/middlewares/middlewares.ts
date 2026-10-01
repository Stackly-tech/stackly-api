import express, { type Express } from "express";
import {
  requestLogger,
  logger,
} from "#/integrations/logging/logger.service.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import compression from "compression";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "#/common/errors/app.error.js";
import { ZodError } from "zod";
import { Prisma } from "#/generated/prisma/client.js";
import multer from "multer";
import os from "os";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export function registerMiddlewares(app: Express) {
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
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
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
