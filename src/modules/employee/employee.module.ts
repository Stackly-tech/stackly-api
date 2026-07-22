import { EmployeeService } from "./employee.service.js";
import { EmployeeController } from "./employee.controller.js";
import { EmployeeRepository } from "./employee.repository.js";
export function employeeModule(shared: any) {
  const repository = new EmployeeRepository(shared.prisma);
  const service = new EmployeeService(repository);
  const controller = new EmployeeController(service);
  return {
    repository,
    service,
    controller,
  };
}
