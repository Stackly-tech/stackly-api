// import { type Express } from "express";
// import swaggerUi from "swagger-ui-express";
// import {
//   OpenAPIRegistry,
//   OpenApiGeneratorV31,
//   extendZodWithOpenApi,
// } from "@asteasolutions/zod-to-openapi";
// import { z } from "zod";
// extendZodWithOpenApi(z);
// export const registry = new OpenAPIRegistry();

// // Register the standard base envelope schemas for documentation visibility
// export const GenericErrorSchema = registry.register(
//   "ErrorEnvelope",
//   z.object({
//     success: z.literal(false),
//     error: z.object({
//       code: z.string(),
//       message: z.string(),
//       details: z.record(z.string(), z.array(z.string())).optional(),
//     }),
//   }),
// );

// export function buildSuccessEnvelopeSchema<T extends z.ZodTypeAny>(
//   dataSchema: T,
// ) {
//   return z.object({
//     success: z.literal(true),
//     data: dataSchema,
//     meta: z.record(z.any()),
//   });
// }

// // Security Schemas
// registry.registerComponent("securitySchemes", "BearerAuth", {
//   type: "http",
//   scheme: "bearer",
//   bearerFormat: "JWT",
// });

// export function generateOpenAPIDocument() {
//   const generator = new OpenApiGeneratorV31(registry.definitions);
//   return generator.generateDocument({
//     openapi: "3.0.0",
//     info: {
//       title: "Enterprise Scalable Mini-Framework API",
//       version: "1.0.0",
//       description:
//         "Fully decoupled automated blueprint validation & OpenAPI mapping server framework architecture",
//     },
//     servers: [{ url: "/api/v1" }],
//   });
// }
