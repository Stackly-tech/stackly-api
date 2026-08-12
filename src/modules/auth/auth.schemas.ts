import { z } from "zod";

export const tenantIdSchema = z.string().trim().min(1).max(128);

export const registerSchema = z.object({
  tenantId: tenantIdSchema.default("default"),
  email: z.string().trim().toLowerCase().email().max(320),
  password: z.string().min(12).max(128),
});

export const loginSchema = z.object({
  tenantId: tenantIdSchema.default("default"),
  email: z.string().trim().toLowerCase().email().max(320),
  password: z.string().min(1).max(128),
  deviceName: z.string().trim().max(128).optional(),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1).optional(),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(12).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
