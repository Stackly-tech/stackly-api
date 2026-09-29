import "dotenv/config";
import app from "#/app/app.module.js";
import { prisma } from "#/infrastructure/database/prisma.service.js";
import { logger } from "#/infrastructure/logging/logger.service.js";

const PORT = process.env.PORT || 3000;

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
