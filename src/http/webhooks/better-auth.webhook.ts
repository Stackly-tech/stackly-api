import { toNodeHandler } from "better-auth/node";
import { auth } from "#/integrations/auth/better-auth.js";

export const handleAuthWebhooks = toNodeHandler(auth);
