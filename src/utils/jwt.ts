import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: {
    id: any;
    email: string;
    role: string;
}) => {
    return jwt.sign(payload, env.JWT_SECRET!, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET!);
};
