import { builder } from "../../../graphql/builder.js";

export const CreateUserInput = builder.inputType("CreateUserInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    firstName: t.string({ required: false }),
    lastName: t.string({ required: false }),
    name: t.string({ required: false }),
  }),
});

export const UpdateUserInput = builder.inputType("UpdateUserInput", {
  fields: (t) => ({
    firstName: t.string({ required: false }),
    lastName: t.string({ required: false }),
    name: t.string({ required: false }),
  }),
});
