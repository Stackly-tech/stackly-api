import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";
export function UserModule(sharedService) {
  const repo = new UserRepository();
  const service = new UserService(repo);
  const controller = new UserController(service);
  return {
    repo,
    service,
    controller,
  };
}
