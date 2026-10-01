import type { Prisma } from "#/generated/prisma/client.js";
import { UserPage } from "./user.node.js";
import { builder } from "#/graphql/builder.js";
import { UserRef } from "./user.node.js";
import { CreateUserInput, UpdateUserInput } from "./user.inputs.js";
import type {
  CreateUserInput as DomainCreateInput,
  UpdateUserInput as DomainUpdateInput,
} from "#/modules/user/user.types.js";

export type QueryFieldBuilder = Parameters<
  Parameters<typeof builder.queryFields>[0]
>[0];
export type MutateFieldBuilder = Parameters<
  Parameters<typeof builder.mutationFields>[0]
>[0];

export class UserResolver {
  constructor() {}
  users = (t: QueryFieldBuilder) => {
    return t.prismaField({
      type: ["User"],

      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },

      resolve: (query, _root, args, ctx) => {
        const findArgs: Prisma.UserFindManyArgs = {
          ...query,
          ...(args.take != null && { take: args.take }),
          ...(args.skip != null && { skip: args.skip }),
        };

        return ctx.services.user.listAll(findArgs);
      },
    });
  };

  user = (t: QueryFieldBuilder) => {
    return t.prismaField({
      type: "User",
      nullable: true,

      args: {
        id: t.arg.string({ required: true }),
      },

      resolve: (_query, _root, args, ctx) => {
        console.log("🚀 ~ UserResolver ~ _query:", _query);
        return ctx.services.user.getById(args.id, _query);
      },
    });
  };

  userPage = (t: QueryFieldBuilder): ReturnType<QueryFieldBuilder["field"]> => {
    return t.field({
      type: UserPage,

      args: {
        page: t.arg.int(),
        pageSize: t.arg.int(),
      },

      resolve: (_root, args, ctx) => {
        return ctx.services.user.listPage({
          ...(args.page != null && { page: args.page }),
          ...(args.pageSize != null && { pageSize: args.pageSize }),
        });
      },
    });
  };
  userCreate = (
    t: MutateFieldBuilder,
  ): ReturnType<MutateFieldBuilder["field"]> => {
    return t.field({
      type: UserRef,
      args: { input: t.arg({ type: CreateUserInput, required: true }) },
      resolve: (_root, args, ctx) => {
        const input: DomainCreateInput = {
          email: args.input.email,
        };
        if (args.input.firstName) input.firstName = args.input.firstName;
        if (args.input.lastName) input.lastName = args.input.lastName;
        if (args.input.name) input.name = args.input.name;
        return ctx.services.user.createUser(input);
      },
    });
  };
  userUpdate = (
    t: MutateFieldBuilder,
  ): ReturnType<MutateFieldBuilder["field"]> => {
    return t.field({
      type: UserRef,
      args: {
        id: t.arg.string({ required: true }),
        input: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: (_root, args, ctx) => {
        const input: DomainUpdateInput = {};
        if (args.input.firstName) input.firstName = args.input.firstName;
        if (args.input.lastName) input.lastName = args.input.lastName;
        if (args.input.name) input.name = args.input.name;
        return ctx.services.user.updateUser(args.id, input);
      },
    });
  };
  deleteUser = (
    t: MutateFieldBuilder,
  ): ReturnType<MutateFieldBuilder["field"]> => {
    return t.field({
      type: UserRef,
      args: { id: t.arg.string({ required: true }) },
      resolve: (_root, args, ctx) => ctx.services.user.deleteUser(args.id),
    });
  };
}
