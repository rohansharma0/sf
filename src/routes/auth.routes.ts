import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { generateToken } from "../utils/jwt";

const router = express.Router();

// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         session: false,
//         failureRedirect: "/login",
//     }),
//     (req: any, res) => {
//         const token = generateToken(req.user);
//         // Redirect with token or send token directly
//         res.redirect(`http://localhost:3000/login/success?token=${token}`);
//     }
// );

router.post(
    "/register",
    validateRequest(registerSchema),
    AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);

export default router;
