import mongoose, { Schema, Document, model } from "mongoose";

export interface ICartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItem[];
}

const cartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
    },
    { timestamps: true }
);

cartSchema.methods.toJSON = function () {
    const cart = this.toObject();
    delete cart.createdAt;
    delete cart.updatedAt;
    delete cart.__v;
    return cart;
};

export default model<ICart>("Cart", cartSchema);
