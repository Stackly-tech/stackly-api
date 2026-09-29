import { PrismaService } from "#/infrastructure/database/prisma.service.js";
import { RedisCacheService } from "#/infrastructure/cache/redis.service.js";
import { UserModule } from "#/modules/user/user.module.js";
import type { AppContext } from "./app.context.js";

export class AppContainer {
  readonly prisma: PrismaService;
  readonly cache: RedisCacheService;
  readonly userModule: typeof UserModule;

  constructor() {
    this.prisma = new PrismaService();
    this.cache = new RedisCacheService();
    this.userModule = UserModule;
  }

  getContext(): AppContext {
    return {
      prisma: this.prisma,
      cache: this.cache,
      services: {
        user: this.userModule.service,
      },
    };
  }
}

export const container = new AppContainer();
