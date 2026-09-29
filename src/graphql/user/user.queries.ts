import { builder } from "../builder.js";
import { UserPage } from "./user.node.js";
import type { Prisma } from "#/generated/prisma/client.js";

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    args: { take: t.arg.int(), skip: t.arg.int() },
    resolve: (query, _root, args, ctx) => {
      const findArgs: Prisma.UserFindManyArgs = { ...query };
      if (args.take !== null && args.take !== undefined) findArgs.take = args.take;
      if (args.skip !== null && args.skip !== undefined) findArgs.skip = args.skip;
      return ctx.services.user.listAll(findArgs);
    },
  }),
);

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: { id: t.arg.string({ required: true }) },
    resolve: (_query, _root, args, ctx) => ctx.services.user.getById(args.id),
  }),
);

builder.queryField("userPage", (t) =>
  t.field({
    type: UserPage,
    args: { page: t.arg.int(), pageSize: t.arg.int() },
    resolve: (_root, args, ctx) => {
      const pageArgs: { page?: number; pageSize?: number } = {};
      if (args.page !== null && args.page !== undefined) pageArgs.page = args.page;
      if (args.pageSize !== null && args.pageSize !== undefined) pageArgs.pageSize = args.pageSize;
      return ctx.services.user.listPage(pageArgs);
    },
  }),
);
