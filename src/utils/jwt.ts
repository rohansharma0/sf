import jwt from "jsonwebtoken";

export const generateToken = (payload: {
    id: any;
    email: string;
    role: string;
}) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET!, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.TOKEN_SECRET!);
};
