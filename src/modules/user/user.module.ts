import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

export function createUserModule() {
  const repository = new UserRepository();
  const service = new UserService(repository);

  return {
    repository,
    service,
  };
}

export const UserModule = createUserModule();
