import "dotenv/config";
import app from "#/app/app.module.js";
import { logger } from "#/integrations/logging/logger.service.js";
import { appConfig } from "#/config/app.config.js";
import { container } from "#/app/app.container.js";
async function bootStrap() {
  await container.start();
  const server = app.listen(appConfig.port, () => {
    logger.info(`Server started on port ${appConfig.port}`);
  });
  const shutdown = async () => {
    server.close(async () => {
      await container.stop();
      process.exit(0);
    });
  };
  process.on("SIGINT", shutdown);

  process.on("SIGTERM", shutdown);
}
bootStrap().catch((error) => {
  logger.error(error, "Failed to start Server");
  process.exit(0);
});
