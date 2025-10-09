import bcrypt from "bcryptjs";
import mongoose, { Types } from "mongoose";
import { User } from "../models/user.model";

export const updateUser = async (
    user: {
        name: string;
        email: string;
    },
    id: Types.ObjectId
) => {
    return await User.updateOne({ _id: id }, { $set: user });
};

export const getUserById = async (id: Types.ObjectId) => {
    return await User.findById(id).select("-wishlist");
};

export const changePassword = async (
    data: {
        currentPassword: string;
        newPassword: string;
    },
    id: Types.ObjectId
) => {
    const existingUser = await User.findById(id);
    if (!existingUser) throw new Error("User not found.");

    const isMatch = await bcrypt.compare(
        data.currentPassword,
        existingUser.password
    );
    if (!isMatch) throw new Error("Invalid current password.");

    if (await bcrypt.compare(data.newPassword, existingUser.password)) {
        throw new Error("New password cannot be the same as current password.");
    }

    existingUser.password = await bcrypt.hash(data.newPassword, 10);
    return await existingUser.save();
};

export const getWishlist = async (id: Types.ObjectId) => {
    return await User.findById(id).select("wishlist -_id").populate("wishlist");
};

export const toggleWishlist = async (id: Types.ObjectId, productId: string) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    const prodId = new mongoose.Types.ObjectId(productId);
    const index = user.wishlist.findIndex((pId) => pId.equals(prodId));

    if (index > -1) {
        user.wishlist.splice(index, 1);
    } else {
        user.wishlist.push(prodId);
    }

    await user.save();
    return user;
};
