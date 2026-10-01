import { createClient, type RedisClientType } from "redis";
import { redisConfig } from "#/config/redis.config.js";

export class RedisCacheService {
  constructor() {
    this.client.on("error", (error) => {
      console.error("Redis client error:", error);
    });
  }
  private client: RedisClientType = createClient({
    url: redisConfig.url,
  });
  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.client.get(key);
    return val ? (JSON.parse(val) as T) : null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const val = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, val, { EX: ttlSeconds });
    } else {
      await this.client.set(key, val);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
