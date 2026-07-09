import express from "express";
import { testController } from "../factories/test.factory.js";
export const testRouter = express.Router();

testRouter.get('/',testController.getAll);