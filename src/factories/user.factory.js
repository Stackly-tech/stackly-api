import { UserController } from "../controllers/user.controller.js";
import { UserServices } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();
const userService = new UserServices(userRepository);
export const userController = new UserController(userService);


