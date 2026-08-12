import swaggerUi from "swagger-ui-express";
export { swaggerUi };
export const document = {
  openapi: "3.1.1",

  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthCredentials" },
            },
          },
        },
        responses: {
          "201": { description: "User registered" },
          "409": { description: "Duplicate user" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Create an authenticated session",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthCredentials" },
            },
          },
        },
        responses: {
          "200": { description: "Access token issued" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/refresh": {
      post: {
        summary: "Rotate a refresh token",
        responses: {
          "200": { description: "Token rotated" },
          "401": { description: "Invalid refresh token" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        summary: "Revoke the current session",
        security: [{ accessToken: [] }],
        responses: { "204": { description: "Session revoked" } },
      },
    },
    "/api/auth/logout-all": {
      post: {
        summary: "Revoke all sessions",
        security: [{ accessToken: [] }],
        responses: { "204": { description: "Sessions revoked" } },
      },
    },
    "/api/auth/me": {
      get: {
        summary: "Get the current user",
        security: [{ accessToken: [] }],
        responses: { "200": { description: "Current user" } },
      },
    },
    "/api/auth/forgot-password": {
      post: {
        summary: "Request a password reset",
        responses: { "200": { description: "Generic response" } },
      },
    },
    "/api/auth/reset-password": {
      post: {
        summary: "Reset a password",
        responses: {
          "200": { description: "Password reset" },
          "401": { description: "Invalid reset token" },
        },
      },
    },
    "/api/auth/change-password": {
      post: {
        summary: "Change the current password",
        security: [{ accessToken: [] }],
        responses: {
          "200": { description: "Password changed" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      accessToken: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      AuthCredentials: {
        type: "object",
        required: ["email", "password"],
        properties: {
          tenantId: { type: "string", default: "default" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 12 },
        },
      },
      QueryDto: {
        type: "object",
        properties: {
          pagination: {
            $ref: "#/components/schemas/PaginationDto",
          },
          select: {
            type: "array",
            items: {
              type: "string",
            },
          },
          filters: {
            $ref: "#/components/schemas/FilterGroupDto",
          },
          search: {
            $ref: "#/components/schemas/SearchDto",
          },
          sort: {
            type: "array",
            items: {
              $ref: "#/components/schemas/SortDto",
            },
          },
          aggregate: {
            type: "array",
            items: {
              $ref: "#/components/schemas/AggregateDto",
            },
          },
          groupBy: {
            type: "array",
            items: {
              type: "string",
            },
          },
          distinct: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },

      PaginationDto: {
        type: "object",
        properties: {
          page: {
            type: "integer",
            minimum: 1,
            example: 1,
          },
          limit: {
            type: "integer",
            minimum: 1,
            example: 20,
          },
        },
      },

      SearchDto: {
        type: "object",
        properties: {
          value: {
            type: "string",
            example: "john",
          },
          fields: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["firstName", "email"],
          },
        },
      },

      SortDto: {
        type: "object",
        required: ["field", "direction"],
        properties: {
          field: {
            type: "string",
            example: "salary",
          },
          direction: {
            type: "string",
            enum: ["asc", "desc"],
          },
        },
      },

      AggregateDto: {
        type: "object",
        required: ["function", "field"],
        properties: {
          function: {
            type: "string",
            enum: ["count", "sum", "avg", "min", "max"],
          },
          field: {
            type: "string",
            example: "salary",
          },
          alias: {
            type: "string",
            example: "averageSalary",
          },
        },
      },

      FilterRuleDto: {
        type: "object",
        required: ["field", "operator"],
        properties: {
          field: {
            type: "string",
            example: "department",
          },
          operator: {
            type: "string",
            enum: [
              "eq",
              "neq",
              "gt",
              "gte",
              "lt",
              "lte",
              "between",
              "in",
              "notIn",
              "contains",
              "startsWith",
              "endsWith",
              "like",
              "isTrue",
              "isFalse",
              "isNull",
              "isNotNull",
            ],
          },
          value: {},
        },
      },

      FilterGroupDto: {
        type: "object",
        required: ["operator", "rules"],
        properties: {
          operator: {
            type: "string",
            enum: ["and", "or", "not"],
          },
          rules: {
            type: "array",
            items: {
              oneOf: [
                {
                  $ref: "#/components/schemas/FilterRuleDto",
                },
                {
                  $ref: "#/components/schemas/FilterGroupDto",
                },
              ],
            },
          },
        },
      },
    },
  },
};
