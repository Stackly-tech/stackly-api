import { PrismaClient } from "#/generated/prisma/client.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const basePrisma = new PrismaClient({
  adapter,
  log: ["query"],
  comments: [prismaQueryInsights()],
});
export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query, model, operation }) {
        return query(args);
      },
    },
  },
});
