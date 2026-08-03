import type { Request, Response, RequestHandler, NextFunction } from "express";
import express from "express";
import { registerMiddlewares } from "./common/middlewares/middleware.js";
// import { registerSwagger } from "#config/swagger.js";
import { registerRoute } from "#common/config/routes.js";
const app = express();
registerMiddlewares(app);
// registerSwagger(app);
registerRoute(app);
app.use(
  (err: RequestHandler, req: Request, res: Response, next: NextFunction) => {
    next(err);
  },
);
export default app;
