import { Request, Response, NextFunction } from "express";

export const verifyCsrfToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const csrfCookie = req.cookies["csrf_token"];
    const csrfHeader = req.headers["x-csrf-token"];

    if (["GET", "OPTIONS", "HEAD"].includes(req.method)) {
        return next();
    }

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({
            error: "CSRF token missing or invalid.",
        });
    }

    next();
};
