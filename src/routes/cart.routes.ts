import { Router } from "express";
import * as CartController from "../controllers/cart.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateUser, CartController.getCart);
router.post("/", authenticateUser, CartController.addToCart);
router.delete(
    "/:productId",
    authenticateUser,
    CartController.removeProductFromCart
);

export default router;
