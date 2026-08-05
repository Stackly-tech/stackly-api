import { EmployeeService } from "./employee.service.js";
import { EmployeeController } from "./employee.controller.js";
import { EmployeeRepository } from "./employee.repository.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";
import { Prisma } from "#generated/prisma/client.js";

/**
 * Employee module factory
 * Initializes all Employee-related dependencies
 */
export function employeeModule(
  queryService: QueryService,
  shared: SharedServices,
) {
  const repository = new EmployeeRepository(shared.prisma);
  const adapter = new BasePrismaAdapter<
    Prisma.EmployeeFindManyArgs,
    Prisma.EmployeeCountArgs,
    Prisma.EmployeeAggregateArgs,
    Prisma.EmployeeWhereInput,
    Prisma.EmployeeSelect,
    Prisma.EmployeeOrderByWithRelationInput,
    Prisma.EmployeeScalarFieldEnum,
    Prisma.EmployeeGroupByArgs
  >();
  const service = new EmployeeService(
    repository,
    shared,
    queryService,
    adapter,
  );
  const controller = new EmployeeController(service);

  return {
    repository,
    service,
    controller,
  };
}
