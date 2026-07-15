import logger from "../config/logger.js";
import { type Request, type Response, type NextFunction } from "express";
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on("finish", () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  });
  next();
};
