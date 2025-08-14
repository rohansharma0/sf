import { Schema, model, Document, Types } from "mongoose";

export interface ISubCategory extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    image?: string;
    imagePublicId?: string;
    products: Types.ObjectId[];
    isBanner: boolean;
}
const subCategorySchema = new Schema<ISubCategory>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
        imagePublicId: {
            type: String,
            default: null,
        },
        isBanner: {
            type: Boolean,
            default: false,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                default: [],
                required: false,
            },
        ],
    },
    {
        timestamps: true,
    }
);

subCategorySchema.methods.toJSON = function () {
    const subCategory = this.toObject();
    delete subCategory.createdAt;
    delete subCategory.updatedAt;
    delete subCategory.__v;
    return subCategory;
};

export default model<ISubCategory>("SubCategory", subCategorySchema);
