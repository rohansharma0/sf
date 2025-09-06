import { Schema, model, Document } from "mongoose";

interface IOrderItem {
    product: Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: "pending" | "paid" | "failed";
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
}

const OrderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
    },
    { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
