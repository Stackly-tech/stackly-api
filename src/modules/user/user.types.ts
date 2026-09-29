import type { User } from "#/generated/prisma/client.js";

export type PageArgs = {
  page?: number;
  pageSize?: number;
};

export interface CreateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface UserPageResult {
  rows: User[];
  totalCount: number;
  totalPages: number;
  page: number;
}
