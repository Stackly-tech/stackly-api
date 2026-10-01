import { UserResolver } from "#/modules/user/graphql/user.resolver.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { builder } from "#/graphql/builder.js";
import { prisma } from "#/integrations/database/prisma.service.js";

export function createUserModule() {
  const repository = new UserRepository(prisma);
  const service = new UserService(repository);
  const resolver = new UserResolver();
  builder.queryFields((t) => ({
    users: resolver.users(t),
    user: resolver.user(t),
    userPage: resolver.userPage(t),
  }));
  builder.mutationFields((t) => ({
    userCreate: resolver.userCreate(t),
    userUpdate: resolver.userUpdate(t),
    deleteUser: resolver.deleteUser(t),
  }));
console.log("hello");
  return {
    repository,
    service,
  };
}
