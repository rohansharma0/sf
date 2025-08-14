import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: "admin" | "user";
    wishlist: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
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
    delete user.role;
    delete user.__v;
    return user;
};

export default model<IUser>("User", userSchema);
