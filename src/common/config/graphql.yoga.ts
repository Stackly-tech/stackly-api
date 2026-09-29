import { createYoga } from "graphql-yoga";
import { registerGraphQL } from "../app.module.js";

export const yoga = createYoga({
  schema: registerGraphQL(),
});
