import { UserModule } from "#/modules/users/user.module.js";
import { registerUserQueries } from "../modules/users/user.resolver.js";
import { builder } from "../graphql/builder.js";
const user = UserModule({});
export { user };

//graphql Flow
export function registerGraphQL() {
  registerUserQueries(user.service);
  return builder.toSchema();
}
