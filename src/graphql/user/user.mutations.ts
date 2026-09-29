import { builder } from "../builder.js";
import { UserRef } from "./user.node.js";
import { CreateUserInput, UpdateUserInput } from "./user.inputs.js";
import type { CreateUserInput as DomainCreateInput, UpdateUserInput as DomainUpdateInput } from "#/modules/user/user.types.js";

builder.mutationField("createUser", (t) =>
  t.field({
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
  }),
);

builder.mutationField("updateUser", (t) =>
  t.field({
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
  }),
);

builder.mutationField("deleteUser", (t) =>
  t.field({
    type: UserRef,
    args: { id: t.arg.string({ required: true }) },
    resolve: (_root, args, ctx) => ctx.services.user.deleteUser(args.id),
  }),
);
