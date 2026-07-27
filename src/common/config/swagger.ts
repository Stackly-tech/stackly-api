import swaggerUi from "swagger-ui-express";
export { swaggerUi };
export const document = {
  openapi: "3.1.1",

  components: {
    schemas: {
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
