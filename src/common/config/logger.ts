import { pino } from "pino";
import type { Request, Response, NextFunction } from "express";
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
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
