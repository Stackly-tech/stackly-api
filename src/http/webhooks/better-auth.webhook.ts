import { toNodeHandler } from "better-auth/node";
import { auth } from "#/common/auth/better-auth.config.js";

export const handleAuthWebhooks = toNodeHandler(auth);
