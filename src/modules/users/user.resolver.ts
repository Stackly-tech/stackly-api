import { builder } from "../../graphql/builder.js";
import { UserService } from "./user.service.js";
import { type User } from "../../generated/prisma/client.js";

const UserRef = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
  }),
});
const UserPage = builder.objectRef<{
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
export function registerUserQueries(userService: UserService) {
  builder.queryField("users", (t) =>
    t.prismaField({
      type: ["User"],
      args: { take: t.arg.int(), skip: t.arg.int() },
      resolve: (query) => userService.listAll({ ...query }),
    }),
  );
  builder.queryField("userPage", (t) =>
    t.field({
      type: UserPage,
      args: { page: t.arg.int(), pageSize: t.arg.int() },
      resolve: (_root, args) => userService.listPage(args),
    }),
  );
}
