import { PrismaClient, Prisma } from "#/generated/prisma/client.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
import { PAGINATION } from "../constants/index.js";
export const basePrisma = new PrismaClient({
  adapter,
  log: ["query"],
  comments: [prismaQueryInsights()],
});
export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        args.where = { ...args.where };
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where };
        return query(args);
      },
    },
  },
  model: {
    $allModels: {
      async listPage<T>(
        this: T,
        args: Prisma.Args<T, "findMany"> & { page?: number; pageSize?: number },
      ) {
        const context = Prisma.getExtensionContext(this);
        const { page, pageSize, ...findArgs } = args as any;

        const take = Math.min(
          pageSize ?? PAGINATION.DEFAULT_ROWS_PER_PAGE,
          PAGINATION.MAX_ROWS_PER_PAGE,
        );
        const skip = (page && page > 1 ? page - 1 : 0) * take;

        const [rows, totalCount] = await Promise.all([
          (context as any).findMany({ ...findArgs, skip, take }),
          (context as any).count({ where: findArgs.where }),
        ]);

        return {
          rows,
          totalCount,
          totalPages: Math.ceil(totalCount / take),
          page: page ?? 1,
        };
      },
    },
  },
});
