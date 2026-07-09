import { TestController } from "../controllers/test.controller.js";
import { TestService } from "../services/test.service.js";
import { TestRepository } from "../repositories/test.repository.js";

const testRepository = new TestRepository();
const testService = new TestService(testRepository);
export const testController = new TestController(testService);

