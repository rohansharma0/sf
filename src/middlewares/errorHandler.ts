import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error({
        status,
        message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });
    res.status(status).json({ error: message });
};
