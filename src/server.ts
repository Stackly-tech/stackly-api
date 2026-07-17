import "dotenv/config";
import app from "#app.js";
import { logger } from "#config/logger.js";
const PORT = process.env.PORT;
import { prisma } from "#config/prisma.js";

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
