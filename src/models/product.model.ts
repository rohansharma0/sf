import { Schema, model, Types, Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description?: string;
    status: "active" | "draft" | "archived";
    images: string[];
    imagePublicIds: string[];
    price: number;
    compareAtPrice?: number;
    isTaxable: boolean;
    purchaseCost?: number;
    barcode?: string;
    weight?: number;
    weightUnit?: string;
    stock: number;
    isStockTrackable: boolean;
    isOnSale: boolean;
    brand?: string;
    colors?: string[];
    sizes?: string[];
    inStock?: boolean;
    tags?: string[];
    categoryId?: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        status: {
            type: String,
            enum: ["active", "draft", "archived"],
            default: "active",
            index: true,
        },
        images: [{ type: String }],
        imagePublicIds: [{ type: String }],
        price: { type: Number, required: true, index: true },
        compareAtPrice: { type: Number },
        isTaxable: { type: Boolean, default: true },
        purchaseCost: { type: Number },
        barcode: { type: String, index: true },
        weight: { type: Number },
        weightUnit: { type: String },
        stock: { type: Number, default: 0 },
        isStockTrackable: { type: Boolean, default: true },
        isOnSale: { type: Boolean, default: false, index: true },

        brand: { type: String, index: true },
        colors: [{ type: String, index: true }],
        sizes: [{ type: String }],
        inStock: { type: Boolean, default: true, index: true },
        tags: [{ type: String, index: true }],

        categoryId: { type: Types.ObjectId, ref: "Category", index: true },
        subcategoryId: {
            type: Types.ObjectId,
            ref: "SubCategory",
            index: true,
        },
    },
    { timestamps: true }
);

ProductSchema.index({ categoryId: 1, subcategoryId: 1, price: 1 });
ProductSchema.index({ brand: 1, price: 1 });

export const Product = model<IProduct>("Product", ProductSchema);
