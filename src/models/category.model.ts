import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    image?: string;
    imagePublicId?: string;
    subCategories: Types.ObjectId[];
    products: Types.ObjectId[];
    isBanner: boolean;
}

const categorySchema = new Schema<ICategory>(
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
        subCategories: [
            {
                type: Schema.Types.ObjectId,
                ref: "SubCategory",
                default: [],
                required: false,
            },
        ],
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

categorySchema.methods.toJSON = function () {
    const category = this.toObject();
    delete category.createdAt;
    delete category.updatedAt;
    delete category.__v;
    return category;
};

export default model<ICategory>("Category", categorySchema);
