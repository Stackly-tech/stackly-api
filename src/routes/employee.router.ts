import { employeeController } from "../factories/factory.js";
import { Router } from "express";
export const employeeRouter = Router();
employeeRouter.get("/list/", employeeController.findAll);
employeeRouter.get("/", employeeController.findById);
employeeRouter.post("/", employeeController.create);
employeeRouter.put("/", employeeController.update);
employeeRouter.patch("/", employeeController.patch);
