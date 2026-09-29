import type { Prisma, User } from "#/generated/prisma/client.js";
import type { PageArgs, UserPageResult, CreateUserInput, UpdateUserInput } from "./user.types.js";

export interface IUserRepository {
  findAll(args?: Prisma.UserFindManyArgs): Promise<User[]>;
  findPage(args?: Prisma.UserFindManyArgs & PageArgs): Promise<UserPageResult>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<User>;
}
