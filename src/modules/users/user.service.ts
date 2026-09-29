import { UserRepository } from "./user.repository.js";
import { Prisma } from "../../generated/prisma/client.js";
type PageArgs = { page?: number | null; pageSize?: number | null };

export class UserService {
  constructor(private repo: UserRepository) {}
  listPage = async (args: Prisma.UserFindManyArgs & PageArgs = {}) => {
    return this.repo.findPage(args);
  };

  listAll = async (args: Prisma.UserFindManyArgs = {}) => {
    return this.repo.findAll(args);
  };
}
