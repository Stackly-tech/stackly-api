import { prisma, logger } from "#/common/config/connections.js";
import { QueryBuilder } from "#/common/query/query.builder.js";
import { QueryService } from "./query/services/query.service.js";
import { UserModule } from "#/modules/users/user.module.js";
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
const user = UserModule(queryService, shared);
export type SharedServices = typeof shared;
export { user };
