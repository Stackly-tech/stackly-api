import { Router } from "express";
import { studentController } from "../factories/student.js";

export const studentRouter = Router()

studentRouter.get('/students', studentController.findAll)