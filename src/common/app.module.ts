import { prisma, logger } from "#common/config/connections.js";
import { employeeModule } from "#modules/employee/employee.module.js";
import { studentModule } from "#modules/student/student.module.js";
import { QueryBuilder } from "#common/query/query.builder.js";
import { QueryService } from "./query/services/query.service.js";

// Infrastructure
const queryBuilder = new QueryBuilder();

// Shared services across all modules
const shared = {
  prisma,
  logger,
  queryBuilder,
};

// Query service for DTO transformation
const queryService = new QueryService(shared);

// Module initialization
const employee = employeeModule(queryService, shared);
const student = studentModule(queryService, shared);

export type SharedServices = typeof shared;
export { employee, student };