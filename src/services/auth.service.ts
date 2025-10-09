import bcrypt from "bcryptjs";

import { generateToken, verifyRefreshToken } from "../utils/jwt";
import { generateCsrfToken } from "../utils/csrf";
import { User } from "../models/user.model";

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

    const { accessToken, refreshToken } = generateToken({
        id: user._id?.toString()!,
        email: user.email,
        role: user.role,
    });

    user.refreshToken = refreshToken;
    await user.save();

    const csrfToken = generateCsrfToken();

    return { accessToken, refreshToken, csrfToken };
};

export const login = async (data: { email: string; password: string }) => {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("Invalid credentials.");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials.");

    const { accessToken, refreshToken } = generateToken({
        id: user._id?.toString()!,
        email: user.email,
        role: user.role,
    });

    user.refreshToken = refreshToken;

    const csrfToken = generateCsrfToken();

    await user.save();

    return { accessToken, refreshToken, csrfToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) throw new Error("Missing refresh token.");

    const decoded = verifyRefreshToken(refreshToken) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken)
        throw new Error("Invalid refresh token.");

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
        id: user._id?.toString()!,
        email: user.email,
        role: user.role,
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    const csrfToken = generateCsrfToken();
    return { accessToken, refreshToken: newRefreshToken, csrfToken };
};
