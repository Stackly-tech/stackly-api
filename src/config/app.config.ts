export const appConfig = {
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3100",
  nodeEnv: process.env.NODE_ENV ?? "development",
  trustedOrigins: process.env.trustedOrigins,
  trustProxy: "",
};
