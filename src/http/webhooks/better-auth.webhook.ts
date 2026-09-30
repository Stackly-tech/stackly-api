import { toNodeHandler } from "better-auth/node";
import { auth } from "#/config/better-auth.config.js";

export const handleAuthWebhooks = toNodeHandler(auth);
