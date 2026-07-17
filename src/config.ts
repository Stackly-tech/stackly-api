import path from "node:path";
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
export const config = {
  ROOT_DIR: path.join(__dirname, "src"),
  URL_PATH: "http://localhost",
  BASE_VERSION: "",
  CONTROLLER_DIRECTORY: path.join(__dirname, "controllers"),
  SERVICE_DIRECTORY: path.join(__dirname, "services"),
  PROJECT_DIR: __dirname,
};
