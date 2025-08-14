import bcrypt from "bcryptjs";
import User from "../models/user.model";
import mongoose from "mongoose";

export const updateUser = async (
    user: {
        name: string;
        email: string;
    },
    id: string
) => {
    return await User.updateOne({ _id: id }, { $set: user });
};

export const getUserById = async (id: string) => {
    return await User.findById(id).select("-wishlist");
};

export const changePassword = async (
    data: {
        currentPassword: string;
        password: string;
    },
    id: string
) => {
    const existingUser = await User.findById(id);
    if (!existingUser) throw new Error("User not found.");
    const isMatch = await bcrypt.compare(
        data.currentPassword,
        existingUser.password
    );
    if (!isMatch) throw new Error("Invalid credentials.");
    existingUser.password = await bcrypt.hash(data.password, 10);
    return await existingUser.save();
};

export const getWishlist = async (id: string) => {
    return await User.findById(id).select("wishlist -_id").populate("wishlist");
};

export const toggleWishlist = async (id: string, productId: string) => {
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
