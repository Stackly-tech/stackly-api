import { UserRepository } from "./user.repository.js";
export class UserService {
  constructor(private repo: UserRepository) {}
  async getItems(paramsObj, queryObj, loginObj) {}
  async getItem(context) {}
  async getItemsList(context) {}
  async createItem() {}
}
