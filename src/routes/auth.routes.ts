import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authenticateUser } from "../middlewares/auth.middleware";
import { verifyCsrfToken } from "../middlewares/csrf.middleware";

const router = express.Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);
router.post("/refresh", verifyCsrfToken, AuthController.refreshToken);
router.post("/logout", authenticateUser, AuthController.logout);

export default router;
