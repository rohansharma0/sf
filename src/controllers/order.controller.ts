import { Request, Response } from "express";
import { paymentService } from "../services/payment.service";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id; // from auth middleware
        const { cart } = req.body; // cart = [{ productId, quantity, price }]

        const totalAmount = cart.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        );

        // Save order in DB (status = pending)
        const order = await Order.create({
            user: userId,
            items: cart,
            totalAmount,
            status: "pending",
        });

        // Create Razorpay order
        const razorpayOrder = await paymentService.createRazorpayOrder(
            totalAmount,
            order._id as string
        );

        // Save razorpayOrderId to order
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.json({ success: true, order, razorpayOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Order creation failed",
        });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId,
        } = req.body;

        const isValid = paymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            await Order.findByIdAndUpdate(orderId, { status: "failed" });
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        await Order.findByIdAndUpdate(orderId, {
            status: "paid",
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
        });

        res.json({ success: true, message: "Payment verified" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Payment verification error",
        });
    }
};
