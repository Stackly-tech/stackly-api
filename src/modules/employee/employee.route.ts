import { employee } from "#common/app.module.js";
import { Router } from "express";
const { findAll, findById, create, update, patch } = employee.controller;
export const employeeRouter = Router();
employeeRouter
  .get("/list", findAll)
  .get("/", findById)
  .post("/query", findAll)
  .post("/", create)
  .put("/", update)
  .patch("/", patch);
