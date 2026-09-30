import { pino } from "pino";
import type { Request, Response, NextFunction } from "express";
import { loggerConfig } from "#/config/logger.config.js";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        level: "debug",
        options: {
          destination: loggerConfig.filePath,
          mkdir: true,
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino-pretty",
        level: loggerConfig.level,
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
