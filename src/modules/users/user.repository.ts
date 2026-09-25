import { prisma } from "../../common/config/prisma.js";
import {
  type UserInclude,
  type UserSelect,
  type UserOrderByWithRelationInput,
} from "../../generated/prisma/models.js";
import { UserWhereInputObjectZodSchema } from "../../generated/zod/schemas/index.js";
import { buildSelect } from "./user.query.js";
export class UserRepository {
  findAll = async (
    filters: unknown,
    select?: [],
    sortBy?: UserOrderByWithRelationInput,
  ) => {
    const where = UserWhereInputObjectZodSchema.partial().parse(filters ?? {});
    console.log("🚀 ~ UserRepository ~ findAll ~ where:", where);
    return prisma.user.listAll({
      where,
      select: buildSelect(select),
      orderBy: sortBy,
    });
  };
  findPage = async (
    filters: unknown,
    select?: [],
    opts?: {
      sortBy?: UserOrderByWithRelationInput;
      include?: UserInclude;
      page?: number;
      pageSize?: number;
    },
  ) => {
    const where = UserWhereInputObjectZodSchema.partial().parse(filters ?? {});
    console.log("🚀 ~ UserRepository ~ where:", where);
    return prisma.user.listPage({
      where,
      select: buildSelect(select),
      ...opts,
    });
  };
}
