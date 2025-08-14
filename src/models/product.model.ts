import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    status: "active" | "draft" | "archived";
    images: string[];
    imagePublicIds: string[];
    price: number;
    compareAtPrice: number;
    isTaxable: boolean;
    purchaseCost?: number;
    barcode?: string;
    weight?: number;
    weightUnit?: string;
    stock: number;
    isStockTrackable: boolean;
    isOnSale: boolean;

    // variants?: Types.ObjectId[];
}

const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "draft", "archived"],
            default: "draft",
        },
        images: {
            type: [String],
            default: [],
        },
        imagePublicIds: {
            type: [String],
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        compareAtPrice: {
            type: Number,
            required: true,
        },
        isTaxable: {
            type: Boolean,
            default: false,
        },
        purchaseCost: {
            type: Number,
            required: false,
        },
        barcode: {
            type: String,
            required: false,
        },
        weight: {
            type: Number,
            required: false,
        },
        weightUnit: {
            type: String,
            enum: ["lb", "kg", "oz", "g"],
        },
        stock: {
            type: Number,
            required: false,
            default: 0,
        },
        isStockTrackable: {
            type: Boolean,
            required: false,
            default: true,
        },
        isOnSale: {
            type: Boolean,
            required: false,
            default: false,
        },
        // variants: [
        //     {
        //         type: [Schema.Types.ObjectId],
        //         ref: "Variant",
        //         default: [],
        //     },
        // ],
    },
    {
        timestamps: true,
    }
);

productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.createdAt;
    delete product.updatedAt;
    delete product.__v;
    return product;
};

export default model<IProduct>("Product", productSchema);
