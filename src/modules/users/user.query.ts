import type { UserSelect } from "../../generated/prisma/models.js";

const DEFAULT_SELECT: UserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
};

export function buildSelect(requested?: string[]): UserSelect {
  if (!requested || requested.length === 0) return DEFAULT_SELECT;

  const allowed = requested.filter((field) => field in DEFAULT_SELECT);
  if (allowed.length === 0) return DEFAULT_SELECT;

  return allowed.reduce(
    (acc, field) => ({ ...acc, [field]: true }),
    {} as UserSelect,
  );
}
