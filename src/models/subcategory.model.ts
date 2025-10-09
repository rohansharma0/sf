import { Schema, model, Types, Document } from "mongoose";

export interface ISubCategory extends Document {
    title: string;
    description?: string;
    image?: string;
    imagePublicId?: string;
    products: Types.ObjectId[];
    isBanner?: boolean;
    slug: string;
    parentCategoryId?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        image: { type: String },
        imagePublicId: { type: String },
        products: [{ type: Types.ObjectId, ref: "Product" }],
        isBanner: { type: Boolean, default: false },
        slug: { type: String, required: true, index: true },
        parentCategoryId: { type: Types.ObjectId, ref: "Category" },
    },
    { timestamps: true }
);

export const SubCategory = model<ISubCategory>(
    "SubCategory",
    SubCategorySchema
);
