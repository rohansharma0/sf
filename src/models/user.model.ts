import { Schema, model, Document, Types } from "mongoose";

export type IRole = "ADMIN" | "USER";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: IRole;
    refreshToken?: string | null;
    wishlist: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },
        refreshToken: {
            type: String,
            default: null,
        },
        wishlist: [
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

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.refreshToken;
    delete user.role;
    delete user.__v;
    return user;
};

export const User = model<IUser>("User", userSchema);
