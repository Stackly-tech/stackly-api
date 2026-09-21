export type AuthProviderName =
  "LOCAL" | "GOOGLE" | "MICROSOFT" | "GITHUB" | "KEYCLOAK" | "AUTH0";

export interface ProviderAuthInput {
  tenantId: string;
  authorizationCode?: string;
  email?: string;
  password?: string;
}

export interface ProviderIdentity {
  provider: AuthProviderName;
  providerUserId: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
}

export interface AuthProvider {
  readonly name: AuthProviderName;
  authenticate(input: ProviderAuthInput): Promise<ProviderIdentity>;
}
