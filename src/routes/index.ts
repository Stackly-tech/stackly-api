import express from "express";
import { employeeRouter } from "./employee.router.js";
export const router = express.Router();
router.use("/employee", employeeRouter);
