
import {orders } from "#common/app.module.js"
import { Router } from "express";
const { findAll, findById, create, update, patch } = orders.controller;
export const orderRouter = Router();
orderRouter.get("/data", findAll);
orderRouter
  .get("/", findById)
  .post("/", create)
  .put("/", update)
  .patch("/", patch);
