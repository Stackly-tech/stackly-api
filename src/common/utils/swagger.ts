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
    },
  },
};
