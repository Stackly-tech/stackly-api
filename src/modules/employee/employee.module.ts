import { EmployeeService } from "./employee.service.js";
import { EmployeeController } from "./employee.controller.js";
import { EmployeeRepository } from "./employee.repository.js";
import { type SharedServices } from "#common/app.module.js";
export function employeeModule(shared: SharedServices) {
  const repository = new EmployeeRepository(shared.prisma);
  const service = new EmployeeService(repository, shared);
  const controller = new EmployeeController(service);
  return {
    repository,
    service,
    controller,
  };
}
