import { EmployeeService } from "#services/employee.service.js";
import { EmployeeController } from "#controllers/employee.controller.js";
import { EmployeeRepository } from "#repositories/employee.repository.js";
import { prisma } from "#config/prisma.js";

const employeeRepository = new EmployeeRepository(prisma);
const employeeService = new EmployeeService(employeeRepository);
export const employeeController = new EmployeeController(employeeService);
