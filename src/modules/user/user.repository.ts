import { randomUUID } from "node:crypto";
import { prisma } from "#/infrastructure/database/prisma.service.js";
import type { Prisma, User } from "#/generated/prisma/client.js";
import type { IUserRepository } from "./user.repository.interface.js";
import type { PageArgs, UserPageResult, CreateUserInput, UpdateUserInput } from "./user.types.js";

export class UserRepository implements IUserRepository {
  async findAll(args: Prisma.UserFindManyArgs = {}): Promise<User[]> {
    return prisma.user.findMany(args);
  }

  async findPage(args: Prisma.UserFindManyArgs & PageArgs = {}): Promise<UserPageResult> {
    return prisma.user.listPage(args);
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserInput): Promise<User> {
    const createData: Prisma.UserCreateInput = {
      id: randomUUID(),
      email: data.email,
      name: data.name ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
      emailVerified: false,
    };
    if (data.firstName) createData.firstName = data.firstName;
    if (data.lastName) createData.lastName = data.lastName;

    return prisma.user.create({
      data: createData,
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const updateData: Prisma.UserUpdateInput = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.name !== undefined) updateData.name = data.name;

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
