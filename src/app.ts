import express, {
  type Request,
  type Response,
  type RequestHandler,
  type NextFunction,
} from "express";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import { requestLogger } from "./middlewares/request.logger.js";
import { router as indexRouter } from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(requestLogger);
app.get("/", (req: Request, res: Response) => {
  res.redirect("/api-docs");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", indexRouter);
app.use(
  (err: RequestHandler, req: Request, res: Response, next: NextFunction) => {
    next(err);
  },
);
export default app;
