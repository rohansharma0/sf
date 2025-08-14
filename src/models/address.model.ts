import { Schema, model, Document, Types } from "mongoose";

export interface IAddress extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    firstName: string;
    lastName: string;
    country: string;
    state: string;
    address1: string;
    address2: string;
    phoneNumber: string;
    city: string;
    zip: string;
    isPrimary: boolean;
}

const addressSchema = new Schema<IAddress>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
            default: "",
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: false,
            default: "",
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        isPrimary: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

addressSchema.methods.toJSON = function () {
    const address = this.toObject();
    delete address.createdAt;
    delete address.updatedAt;
    delete address.__v;
    return address;
};

export default model<IAddress>("Address", addressSchema);
