
import { StudentService } from "./student.service.js";
import { StudentController } from "./student.controller.js";
import { StudentRepository } from "./student.repository.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { StudentPrismaAdapter } from "#modules/student/adapters/student.prisma.adaptor.js";

/**
 * Student module factory
 * Initializes all Student-related dependencies
 */
export function studentModule(
  queryService: QueryService,
  shared: SharedServices,
) {
  const repository = new StudentRepository(shared.prisma);
  const adapter = new StudentPrismaAdapter(repository);
  const service = new StudentService(
    repository,
    shared,
    queryService,
    adapter,
  );
  const controller = new StudentController(service);

  return {
    repository,
    service,
    controller,
  };
}