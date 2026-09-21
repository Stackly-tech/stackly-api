import { type NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("module", {
    description:
      "Generate a complete feature module (Controller, Service, Repository, Query, Route, Entity, DTOs)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module singular name (e.g. user, book, category):",
        validate: (value: string) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Module singular name is required.";
        },
      },
      {
        type: "input",
        name: "plural",
        message: "Module plural name (e.g. users, books, categories):",
        default: (answers: { name: string }) => {
          const name = answers.name;
          if (name.endsWith("y") && !/[aeiou]y$/i.test(name)) {
            return name.slice(0, -1) + "ies";
          }
          if (
            name.endsWith("s") ||
            name.endsWith("x") ||
            name.endsWith("z") ||
            name.endsWith("ch") ||
            name.endsWith("sh")
          ) {
            return name + "es";
          }
          return name + "s";
        },
      },
      {
        type: "input",
        name: "prismaModel",
        message: "Prisma Model Name (e.g. User, Books, Publisher, Category):",
        default: (answers: { name: string }) => {
          return plop.getHelper("pascalCase")(answers.name);
        },
      },
    ],
    actions: [
      // 1. Controller
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.controller.ts",
        templateFile: "plop-templates/module/controller.ts.hbs",
      },
      // 2. Entity
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.entity.ts",
        templateFile: "plop-templates/module/entity.ts.hbs",
      },
      // 3. Module Factory
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.module.ts",
        templateFile: "plop-templates/module/module.ts.hbs",
      },
      // 4. Query Metadata
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.query.ts",
        templateFile: "plop-templates/module/query.ts.hbs",
      },
      // 5. Repository
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.repository.ts",
        templateFile: "plop-templates/module/repository.ts.hbs",
      },
      // 6. Route
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.route.ts",
        templateFile: "plop-templates/module/route.ts.hbs",
      },
      // 7. Service
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/{{kebabCase name}}.service.ts",
        templateFile: "plop-templates/module/service.ts.hbs",
      },
      // 8. DTOs
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/dtos/create-{{kebabCase name}}.dto.ts",
        templateFile: "plop-templates/module/dtos/create-dto.ts.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/dtos/update-{{kebabCase name}}.dto.ts",
        templateFile: "plop-templates/module/dtos/update-dto.ts.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{kebabCase plural}}/dtos/list-{{kebabCase plural}}.dto.ts",
        templateFile: "plop-templates/module/dtos/list-dto.ts.hbs",
      },
      // 9. Auto-register in src/common/app.module.ts
      {
        type: "modify",
        path: "src/common/app.module.ts",
        pattern: /(\/\/\s*Infrastructure)/g,
        template: `import { {{pascalCase name}}Module } from "#/modules/{{kebabCase plural}}/{{kebabCase name}}.module.js";\n$1`,
      },
      {
        type: "modify",
        path: "src/common/app.module.ts",
        pattern: /(export type SharedServices = typeof shared;)/g,
        template: `const {{camelCase name}} = {{pascalCase name}}Module(queryService, shared);\n$1`,
      },
      {
        type: "modify",
        path: "src/common/app.module.ts",
        pattern: /(export\s*\{\s*)(.*?)(\s*\};)/s,
        template: `$1$2, {{camelCase name}}$3`,
      },
      // 10. Auto-register in src/common/config/routes.ts
      {
        type: "modify",
        path: "src/common/config/routes.ts",
        pattern: /(export const router = express.Router\(\);)/g,
        template: `import { {{camelCase name}}Router } from "#/modules/{{kebabCase plural}}/{{kebabCase name}}.route.js";\n$1`,
      },
      {
        type: "modify",
        path: "src/common/config/routes.ts",
        pattern: /(export function registerRoute)/g,
        template: `router.use("/{{kebabCase plural}}", {{camelCase name}}Router);\n$1`,
      },
    ],
  });
}
