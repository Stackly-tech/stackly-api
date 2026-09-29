import { prisma } from "../../common/config/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
type PageArgs = { page?: number | null; pageSize?: number | null };

export class UserRepository {
  findAll = async (args: Prisma.UserFindManyArgs = {}) => {
    return prisma.user.findMany(args);
  };
  findPage = async (args: Prisma.UserFindManyArgs & PageArgs = {}) => {
    return prisma.user.listPage(args);
  };
}
