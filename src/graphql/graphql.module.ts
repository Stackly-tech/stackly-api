import { createYoga } from "graphql-yoga";
import { schema } from "./schema.js";
import { createContext } from "./context.js";
import { errorHandler } from "#/integrations/index.js";
export const graphqlModule = createYoga({
  schema,
  context: createContext,
  graphqlEndpoint: "/graphql",
  plugins: [errorHandler],
});
