import path from "node:path";

const projectDir = process.cwd();

export const loggerConfig = {
  level: process.env.LOG_LEVEL || "info",
  filePath: path.join(projectDir, "src", "app.log"),
};
