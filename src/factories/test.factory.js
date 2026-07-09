import { TestController } from "../controllers/test.controller.js";
import { TestService } from "../services/test.service.js";
import { TestRepository } from "../repositories/test.repository.js";
import { prisma } from "../config/prisma.js";

const testRepository = new TestRepository(prisma);
const testService = new TestService(testRepository);
export const testController = new TestController(testService);

