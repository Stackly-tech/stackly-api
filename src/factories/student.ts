import { prisma } from "../config/prisma.js";
import { StudentContoller } from "../controllers/student.controller.js";
import { StudentRepositary } from "../repositories/student.repositarty.js";
import { StudentService } from "../services/students.services.js";

const studentRepositary = new StudentRepositary(prisma)
const studentServices = new StudentService(studentRepositary)
export const studentController = new StudentContoller(studentServices)