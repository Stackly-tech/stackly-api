import { user } from "#/common/app.module.js";
import { Router } from "express";

const { findAll, findById, create, update, patch, remove, query } =
  user.controller;
export const userRouter = Router();

userRouter.get("/query", query);
userRouter.post("/query", query);

userRouter.get("/", findAll);
userRouter.post("/", create);

userRouter.get("/:id", findById);
userRouter.put("/:id", update);
userRouter.patch("/:id", patch);
userRouter.delete("/:id", remove);
