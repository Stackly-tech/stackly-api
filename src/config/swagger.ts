import swaggerUi from "swagger-ui-express";
import swaggerJsdoc, {type Options} from "swagger-jsdoc";

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
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi, swaggerSpec };
