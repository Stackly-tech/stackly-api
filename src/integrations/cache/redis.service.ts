import { createClient, type RedisClientType } from "redis";
import { redisConfig } from "#/config/redis.config.js";

export const redis: RedisClientType = createClient({
  url: redisConfig.url,
});

redis.on("error", (error) => {
  console.error("Redis client error:", error);
});

export class RedisCacheService {
  readonly client = redis;

  async connect(): Promise<void> {
    if (!redis.isOpen) {
      await redis.connect();
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await redis.get(key);
    return val ? (JSON.parse(val) as T) : null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const val = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.set(key, val, { EX: ttlSeconds });
    } else {
      await redis.set(key, val);
    }
  }

  async del(key: string): Promise<void> {
    await redis.del(key);
  }
}
