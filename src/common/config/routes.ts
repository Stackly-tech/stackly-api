import { type Express } from "express";
import express from "express";
import { swaggerUi, document } from "./swagger.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./better-auth.config.js";
import { authenticate } from "#/common/auth/auth.middleware.js";
import { userRouter } from "#/modules/users/user.route.js";
import { yoga } from "./graphql.yoga.js";
export const router = express.Router();
router.use("/users", userRouter);
export function registerRoute(app: Express) {
  app.use("/graphql", yoga);
  app.get("/", authenticate, (_req, res) => {
    res.redirect("/api-docs");
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(document));
  app.all("/api/auth/*splat", toNodeHandler(auth));
  app.use("/api", router);
}
