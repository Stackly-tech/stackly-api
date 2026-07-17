import { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc, { type Options, type Paths } from "swagger-jsdoc";
const paths: Paths = {
  "/employee/list": {
    get: {
      tags: ["emploees"],
      summary: "Returns a list of employees.",
      description: "OK",
      responses: {
        "200": {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pet",
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Pet",
              },
            },
          },
        },
        "400": {
          description: "Invalid ID supplied",
        },
        "404": {
          description: "Pet not found",
        },
        "422": {
          description: "Validation exception",
        },
        default: {
          description: "Unexpected error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};
const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stackly API",
      version: "1.0.0",
      description: "Employee Training API",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      schemas: {
        Employee: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            department: {
              type: "string",
            },
          },
        },
      },
    },
    paths,
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export function registerSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
