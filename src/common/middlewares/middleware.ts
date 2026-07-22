import express, { type Express } from "express";
import { requestLogger } from "#common/config/logger.js";
export function registerMiddlewares(app: Express) {
  app.use(express.json());
  app.use(requestLogger);
}
