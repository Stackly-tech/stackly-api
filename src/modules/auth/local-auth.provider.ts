import type {
  AuthProvider,
  ProviderAuthInput,
  ProviderIdentity,
} from "./auth-provider.js";

export class LocalAuthProvider implements AuthProvider {
  readonly name = "LOCAL" as const;

  async authenticate(input: ProviderAuthInput): Promise<ProviderIdentity> {
    if (!input.email || !input.password) {
      throw new Error("Local authentication requires email and password");
    }
    return {
      provider: this.name,
      providerUserId: input.email,
      email: input.email,
      emailVerified: false,
    };
  }
}
