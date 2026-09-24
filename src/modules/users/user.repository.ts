import { prisma } from "../../common/config/prisma.js";
export class UserRepository {
  async getAllUsers() {
    const users = await prisma.user.listAll({});
    return users;
  }
}
