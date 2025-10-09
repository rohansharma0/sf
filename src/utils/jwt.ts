import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { IRole } from "../models/user.model";

export type JwtPayload = {
    id: string;
    email: string;
    role: IRole;
};

export const generateToken = (payload: JwtPayload) => {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: payload.id }, env.JWT_REFRESH_SECRET!, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) =>
    jwt.verify(token, env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, env.JWT_REFRESH_SECRET);
