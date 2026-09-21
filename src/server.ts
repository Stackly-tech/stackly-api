import "dotenv/config";
import app from "#/app.js";
import { prisma, logger } from "#/common/config/connections.js";
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
