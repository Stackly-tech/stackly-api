import { type PrismaClient } from "#generated/prisma/client.js";
import { type Logger } from "pino";
export type ISharedServices = {
  prisma: PrismaClient;
  logger: Logger;
};
//   queryService: QueryService;
//   encryptionService: EncryptionService;
//   cacheService: CacheService;
