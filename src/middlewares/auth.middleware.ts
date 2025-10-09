import { Request, Response, NextFunction } from "express";
import { JwtPayload, verifyAccessToken } from "../utils/jwt";
import { Types } from "mongoose";
import { IRole } from "../models/user.model";
import { verifyCsrfToken } from "./csrf.middleware";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: Types.ObjectId;
                email: string;
                role: IRole;
            };
        }
    }
}

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyAccessToken(token) as JwtPayload;
        req.user = {
            id: new Types.ObjectId(decoded.id),
            email: decoded.email,
            role: decoded.role,
        };
        verifyCsrfToken(req, res, next);
    } catch (err: any) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                error: "Access denied. Insufficient permissions.",
            });
        }

        next();
    };
};
