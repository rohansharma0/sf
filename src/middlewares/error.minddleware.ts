import { Request, Response, NextFunction } from "express";
import { jsonLogger, logger } from "../utils/logger";

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.warn(`${req.method} ${req.originalUrl} - Route not found`);

    jsonLogger.log({
        level: "json",
        error: {
            status: 404,
            method: req.method,
            url: req.originalUrl,
            message: "Route not found",
        },
        timestamp: new Date().toISOString(),
    });

    res.status(404).json({
        error: "Route not found",
    });
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error(`${req.method} ${req.originalUrl} - Error : ${message}`, {
        stack: err.stack,
    });

    jsonLogger.log({
        level: "json",
        error: {
            status,
            message: message,
            stack: err.stack,
        },
        request: {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
        },
        timestamp: new Date().toISOString(),
    });

    res.status(status).json({ error: message });
};
