import { StudentService } from "./student.service.js";
import { StudentController } from "./student.controller.js";
import { StudentRepository } from "./student.repository.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";
import { Prisma } from "#generated/prisma/client.js";

/**
 * Student module factory
 * Initializes all Student-related dependencies
 */
export function studentModule(
  queryService: QueryService,
  shared: SharedServices,
) {
  const repository = new StudentRepository(shared.prisma);
  const adapter = new BasePrismaAdapter<
    Prisma.StudentFindManyArgs,
    Prisma.StudentWhereInput,
    Prisma.StudentSelect,
    Prisma.StudentOrderByWithRelationInput,
    Prisma.StudentGroupByArgs,
    Prisma.StudentAggregateArgs,
    Prisma.StudentSelect,
    Prisma.StudentScalarFieldEnum
  >();
  const service = new StudentService(repository, shared, queryService, adapter);
  const controller = new StudentController(service);

  return {
    repository,
    service,
    controller,
  };
}
