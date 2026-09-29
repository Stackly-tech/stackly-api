import type { PrismaService } from "#/infrastructure/database/prisma.service.js";
import type { RedisCacheService } from "#/infrastructure/cache/redis.service.js";
import type { UserService } from "#/modules/user/user.service.js";

export interface AppContext {
  prisma: PrismaService;
  cache: RedisCacheService;
  services: {
    user: UserService;
  };
}
