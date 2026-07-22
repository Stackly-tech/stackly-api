import { prisma, logger } from "#common/config/connections.js";
import { employeeModule } from "#modules/employee/employee.module.js";
const shared = {
  prisma,
  logger,
};
const employee = employeeModule(shared);
export { employee };
