import { pino } from "pino";
import type { Request, Response, NextFunction } from "express";
import { config } from "#/config.js";
import path from "node:path";
const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        level: "debug",
        options: {
          destination: path.join(config.PROJECT_DIR, "app.log"),
          mkdir: true,
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino-pretty",
        level: process.env.LOG_LEVEL || "info",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
    ],
  },
});

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  });
  next();
};
export { logger, requestLogger };
