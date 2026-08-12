import { type Express } from "express";
import express from "express";
import { employeeRouter } from "#modules/employee/employee.route.js";
import { studentRouter } from "#modules/student/student.route.js";
import { swaggerUi, document } from "./swagger.js";
import { orderRouter } from "#modules/orders/orders.router.js";
import { authRouter } from "#modules/auth/auth.module.js";
export const router = express.Router();
router.use("/employee", employeeRouter);
router.use("/orders", orderRouter);
router.use("/student", studentRouter);
router.use("/auth", authRouter);

export function registerRoute(app: Express) {
  app.get("/", (_req, res) => {
    res.redirect("/api-docs");
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(document));
  app.use("/api", router);
}
