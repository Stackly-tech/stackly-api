import { type Express } from "express";
import { router as indexRouter } from "#routes/index.js";

export function registerRoute(app: Express) {
  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });
  app.use("/api", indexRouter);
}
