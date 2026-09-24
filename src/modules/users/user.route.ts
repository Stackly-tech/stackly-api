import express from "express";
const router = express.Router();
import { user } from "#/common/app.module.js";
export const userRouter = router.post("/", user.controller.getItems);
