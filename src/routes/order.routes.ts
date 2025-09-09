import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/order.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", authenticateUser, createOrder);
router.post("/verify", authenticateUser, verifyPayment);

export default router;
