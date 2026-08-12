import { Router } from "express";
import { prisma } from "#common/config/prisma.js";
import { authenticate } from "./auth.middleware.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const controller = new AuthController(new AuthService(prisma));
export const authRouter = Router();
authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.post("/refresh", controller.refresh);
authRouter.post("/forgot-password", controller.forgotPassword);
authRouter.post("/reset-password", controller.resetPassword);
authRouter.post("/change-password", authenticate, controller.changePassword);
authRouter.post("/logout", authenticate, controller.logout);
authRouter.post("/logout-all", authenticate, controller.logoutAll);
authRouter.get("/me", authenticate, controller.me);
