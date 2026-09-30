import "dotenv/config";
import app from "#/app/app.module.js";
import { prisma } from "#/integrations/database/prisma.service.js";
import { logger } from "#/integrations/logging/logger.service.js";
import { appConfig } from "#/config/app.config.js";

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(appConfig.port, () => {
  logger.info(`Server started on port ${appConfig.port}`);
});
