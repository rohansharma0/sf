import { Schema, model, Types, Document } from "mongoose";

export interface IFeedSection extends Document {
    title: string;
    slug: string;
    description?: string;
    collectionId: Types.ObjectId;
    layout: "grid" | "carousel" | "banner";
    position: number;
    limit: number;
    isActive: boolean;
    categoryId?: Types.ObjectId | null;
    subcategoryId?: Types.ObjectId | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const FeedSectionSchema = new Schema<IFeedSection>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        collectionId: {
            type: Schema.Types.ObjectId,
            ref: "Collection",
            required: true,
        },
        layout: {
            type: String,
            enum: ["grid", "carousel", "banner"],
            default: "grid",
        },
        position: { type: Number, default: 0 },
        limit: { type: Number, default: 20 },
        isActive: { type: Boolean, default: true },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        subcategoryId: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
            default: null,
        },
    },
    { timestamps: true }
);

export const FeedSection = model<IFeedSection>(
    "FeedSection",
    FeedSectionSchema
);
