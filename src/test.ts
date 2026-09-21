// import * as OpenApiValidator from "express-openapi-validator";
// import { swaggerSpec } from "#config/swagger.js";
// import request from "supertest";
// import express from "express";
// import app from "#app.js";
// import { before, describe, it } from "node:test";
// import assert from "node:assert";

// describe("GET /employee/list Open Api validation test", () => {
//   let testApp: express.Express;

//   before(() => {
//     testApp = express();

//     // 1. Force Express to parse JSON bodies just in case
//     testApp.use(express.json());

//     // 2. Load the validator first
//     testApp.use(
//       OpenApiValidator.middleware({
//         apiSpec: swaggerSpec as any,
//         validateRequests: true,
//         validateResponses: true,
//       }),
//     );

//     // 3. Mount your application
//     testApp.use(app);

//     // 4. FIXED: The error handler must catch and log the validation details
//     testApp.use(
//       (
//         err: any,
//         req: express.Request,
//         res: express.Response,
//         next: express.NextFunction,
//       ) => {
//         // This will force the real validation error to print out in your terminal window
//         console.error(
//           "❌ VALIDATION BREAKAGEAGE DETAILS:",
//           err.message,
//           err.errors,
//         );

//         res.status(err.status || 500).json({
//           message: err.message,
//           errors: err.errors,
//         });
//       },
//     );
//   });

//   it("should match the exact schema defined in swagger.ts", async () => {
//     const response = await request(testApp)
//       .get("/api/employee/list")
//       .set("Accept", "application/json");

//     // If it fails, print the response body to see the validator message
//     if (response.status !== 200) {
//       console.log("Response Body details:", response.body);
//     }

//     assert.strictEqual(response.status, 200);
//   });
// });

import { defineAbility } from "@casl/ability";
const ability = defineAbility((can, cannot) => {
  can("manage", "all");
  cannot("delete", "User");
});
const hasA1 = ability.can("read", "Post");
console.log("🚀 ~ hasA1:", hasA1);
const hasB1 = ability.can("delete", "User");
console.log("🚀 ~ hasB1:", hasB1);
