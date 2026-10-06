import type { Prisma, User } from "#/generated/prisma/client.js";
// import type { IUserRepository } from "./user.repository.interface.js";
import type {
  PageArgs,
  UserPageResult,
  CreateUserInput,
  UpdateUserInput,
} from "./user.types.js";
import { UserRepository } from "#/modules/user/user.repository.js";
export class UserService {
  constructor(private repo: UserRepository) {}

  listPage = async (
    args: Prisma.UserFindManyArgs & PageArgs = {},
  ): Promise<UserPageResult> => {
    return this.repo.findPage(args);
  };

  listAll = async (args: Prisma.UserFindManyArgs = {}): Promise<User[]> => {
    return this.repo.findAll(args);
  };

  getById = async (
    id: string,
    query: Prisma.UserFindFirstArgs,
  ): Promise<User | null> => {
    return this.repo.findById(id, query);
  };

  createUser = async (data: CreateUserInput): Promise<User> => {
    return this.repo.create(data);
  };

  updateUser = async (id: string, data: UpdateUserInput): Promise<User> => {
    return this.repo.update(id, data);
  };

  deleteUser = async (id: string): Promise<User> => {
    return this.repo.delete(id);
  };
}

console.log("UserService loaded");