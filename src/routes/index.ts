import express from "express";
import { employeeRouter } from "./employee.router.js";
import { studentRouter } from "./student.router.js";
export const router = express.Router();
router.use("/employee", employeeRouter);
router.use('/student', studentRouter)