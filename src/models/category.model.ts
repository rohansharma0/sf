import { Schema, model, Types, Document } from "mongoose";

export interface ICategory extends Document {
    title: string;
    description?: string;
    image?: string;
    imagePublicId?: string;
    subCategories: Types.ObjectId[];
    products: Types.ObjectId[];
    isBanner?: boolean;
    slug: string;
    parentId?: Types.ObjectId | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        image: { type: String },
        imagePublicId: { type: String },
        subCategories: [{ type: Types.ObjectId, ref: "SubCategory" }],
        products: [{ type: Types.ObjectId, ref: "Product" }],
        isBanner: { type: Boolean, default: false },
        slug: { type: String, required: true, unique: true, index: true },
        parentId: { type: Types.ObjectId, ref: "Category", default: null },
    },
    { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
