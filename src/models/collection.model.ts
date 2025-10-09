import { Schema, model, Types, Document } from "mongoose";

export type RuleStruct = {
    minPrice?: number;
    maxPrice?: number;
    discountOnly?: boolean;
    tags?: string[];
    brands?: string[];
    colors?: string[];
    sizes?: string[];
    categoryId?: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    createdWithinDays?: number;
};

export interface ICollection extends Document {
    name: string;
    slug: string;
    description?: string;
    type: "manual" | "rule";
    productIds?: Types.ObjectId[];
    rules?: RuleStruct;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const RuleSchema = new Schema<RuleStruct>(
    {
        minPrice: Number,
        maxPrice: Number,
        discountOnly: { type: Boolean },
        tags: [{ type: String }],
        brands: [{ type: String }],
        colors: [{ type: String }],
        sizes: [{ type: String }],
        categoryId: { type: Types.ObjectId, ref: "Category" },
        subcategoryId: { type: Types.ObjectId, ref: "SubCategory" },
        createdWithinDays: Number,
    },
    { _id: false }
);

const CollectionSchema = new Schema<ICollection>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String },
        type: { type: String, enum: ["manual", "rule"], required: true },
        productIds: [{ type: Types.ObjectId, ref: "Product" }],
        rules: RuleSchema,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Collection = model<ICollection>("Collection", CollectionSchema);
