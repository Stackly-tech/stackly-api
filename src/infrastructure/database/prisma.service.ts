import { PrismaClient } from "#/generated/prisma/client.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";
import { prismaExtensions } from "./prisma.extensions.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const basePrisma = new PrismaClient({
  adapter,
  log: ["query"],
  comments: [prismaQueryInsights()],
});

export const prisma = basePrisma.$extends(prismaExtensions);

export class PrismaService {
  readonly client = prisma;
  readonly baseClient = basePrisma;

  async connect() {
    await basePrisma.$connect();
  }

  async disconnect() {
    await basePrisma.$disconnect();
  }
}
