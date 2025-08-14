import bcrypt from "bcryptjs";
import User from "../models/user.model";

import { generateToken } from "../utils/jwt";

export const register = async (data: {
    email: string;
    password: string;
    name: string;
}) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
        email: data.email,
        password: hashedPassword,
        name: data.name,
    });

    await user.save();

    const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    return { token };
};

export const login = async (data: { email: string; password: string }) => {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("Invalid credentials.");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");

    const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    return { token };
};
