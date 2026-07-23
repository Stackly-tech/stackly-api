import { prisma, logger } from "#common/config/connections.js";
import { employeeModule } from "#modules/employee/employee.module.js";
import { type ISharedServices } from "./types/ISharedService.js";
const shared: ISharedServices = {
  prisma,
  logger,
};
const employee = employeeModule(shared);
export { employee };
