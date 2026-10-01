import { PrismaService } from "#/integrations/database/prisma.service.js";
import { RedisCacheService } from "#/integrations/cache/redis.service.js";
import { UserModule } from "#/graphql/schema.js";
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
  async start() {
    await this.prisma.connect();
    // await this.cache.connect();
  }
  async stop() {
    await this.prisma.disconnect();
  }
}

export const container = new AppContainer();
