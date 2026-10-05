import { printSchema, lexicographicSortSchema } from "graphql";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { builder } from "./builder.js";
import { createUserModule } from "#/modules/user/user.module.js";
export const UserModule = createUserModule();
export const schema = builder.toSchema();

export function generateSchemaFile() {
  try {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));
    const targetDir = path.join(process.cwd(), "src", "graphql", "generated");
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(path.join(targetDir, "schema.graphql"), schemaAsString);
  } catch (err) {
    console.error("Failed to write schema.graphql:", err);
  }
}

generateSchemaFile();
