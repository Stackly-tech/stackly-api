import { type Express } from "express";
import { router as indexRouter } from "../routes/index.js";

export function registerRoute(app: Express) {
  app.use("/api", indexRouter);
}
