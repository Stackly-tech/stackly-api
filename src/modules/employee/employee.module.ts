import { EmployeeService } from "./employee.service.js";
import { EmployeeController } from "./employee.controller.js";
import { EmployeeRepository } from "./employee.repository.js";
import { type ISharedServices } from "#common/types/ISharedService.js";
export function employeeModule(shared: ISharedServices) {
  const repository = new EmployeeRepository(shared.prisma);
  const service = new EmployeeService(repository, shared);
  const controller = new EmployeeController(service);
  return {
    repository,
    service,
    controller,
  };
}
