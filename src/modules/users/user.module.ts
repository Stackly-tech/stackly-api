import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { UserRepository } from "./user.repository.js";
import { type SharedServices } from "#/common/app.module.js";
import { QueryService } from "#/common/query/services/query.service.js";
import { BasePrismaAdapter } from "#/common/query/adapters/base-prisma.adapter.js";
import { Prisma } from "#/generated/prisma/client.js";

/**
 * User module factory
 * Initializes all User-related dependencies
 */
export function UserModule(queryService: QueryService, shared: SharedServices) {
  const repository = new UserRepository(shared.prisma);
  const adapter = new BasePrismaAdapter<
    Prisma.UserFindManyArgs,
    Prisma.UserCountArgs,
    Prisma.UserAggregateArgs,
    Prisma.UserWhereInput,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput,
    Prisma.UserScalarFieldEnum,
    Prisma.UserGroupByArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindUniqueArgs
  >();
  const service = new UserService(repository, queryService, adapter);
  const controller = new UserController(service);

  return {
    repository,
    service,
    controller,
  };
}
