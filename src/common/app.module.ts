import { prisma, logger } from "#common/config/connections.js";
import { employeeModule } from "#modules/employee/employee.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { ValidationService } from "./query/services/validation.service.js";
import { EmployeePrismaAdapter } from "#modules/employee/adapters/employee.prisma.adaptor.js";
const validationService = new ValidationService();
const queryService = new QueryService(validationService);
const adaptor = new EmployeePrismaAdapter();
const shared = {
  prisma,
  logger,
  queryService,
  adaptor,
};
export type SharedServices = typeof shared;
const employee = employeeModule(shared);
export { employee };
