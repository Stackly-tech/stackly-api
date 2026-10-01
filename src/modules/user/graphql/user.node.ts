import { builder } from "../../../graphql/builder.js";
import type { User } from "#/generated/prisma/client.js";

export const UserRef = builder.prismaObject("User", {
  select: {},
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name", { nullable: true }),
    firstName: t.exposeString("firstName", { nullable: true }),
    lastName: t.exposeString("lastName", { nullable: true }),
    emailVerified: t.exposeBoolean("emailVerified"),
    createdAt: t.string({ resolve: (user) => user.createdAt.toISOString() }),
    updatedAt: t.string({ resolve: (user) => user.updatedAt.toISOString() }),
  }),
});

export const UserPage = builder.objectRef<{
  rows: User[];
  totalCount: number;
  totalPages: number;
  page: number;
}>("UserPage");

UserPage.implement({
  fields: (t) => ({
    rows: t.field({ type: [UserRef], resolve: (p) => p.rows }),
    totalCount: t.exposeInt("totalCount"),
    totalPages: t.exposeInt("totalPages"),
    page: t.exposeInt("page"),
  }),
});
