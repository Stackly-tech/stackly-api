import { student } from "#common/app.module.js";
import { Router } from "express";

const { findAll, findById, create, update, patch } = student.controller;
export const studentRouter = Router();
studentRouter.get("/list", findAll);
studentRouter
  .get("/", findById)
  .post("/", create)
  .put("/", update)
  .patch("/", patch);