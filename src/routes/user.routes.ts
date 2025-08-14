import express from "express";
import * as UserController from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.put("/", authenticateUser, UserController.updateUser);
router.post("/password", authenticateUser, UserController.changePassword);
router.get("/", authenticateUser, UserController.getUserById);

router.get("/wishlist", authenticateUser, UserController.getWishlist);
router.post("/wishlist", authenticateUser, UserController.toggleWishlist);

export default router;
