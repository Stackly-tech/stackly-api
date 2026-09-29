import express from "express";
const router = express.Router();
import { user } from "#/common/app.module.js";
export const userRouter = router
  .post("/list", user.controller.list)
  .post("/page", user.controller.page);
