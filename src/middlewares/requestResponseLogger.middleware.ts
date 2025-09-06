import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

declare module "winston" {
    interface Logger {
        json: (message: any) => Logger;
    }
}

const logRequest = (req: Request) => {
    logger.info(
        `${req.method} ${req.originalUrl} - REQUEST: ${JSON.stringify(
            req.body
        )}`
    );
};

const logResponse = (
    req: Request,
    res: Response,
    responseBody: any,
    duration: number
) => {
    logger.info(
        `${req.method} ${req.originalUrl} - RESPONSE: ${JSON.stringify(
            responseBody
        )}`
    );
    logger.info(
        `${req.method} ${req.originalUrl} - STATUS: ${res.statusCode} - DURATION: ${duration}ms`
    );
};

const logJsonRequestResponse = (
    req: Request,
    res: Response,
    responseBody: any,
    duration: number
) => {
    logger.json({
        request: {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
        },
        response: {
            status: res.statusCode,
            body: responseBody,
        },
        duration,
        timestamp: new Date().toISOString(),
    });
};

export const requestResponseLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    logRequest(req);

    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);
    let responseBody: any;

    res.json = (body: any) => {
        responseBody = body;
        return originalJson(body);
    };

    res.send = (body: any) => {
        try {
            responseBody = typeof body === "string" ? JSON.parse(body) : body;
        } catch {
            responseBody = body;
        }
        return originalSend(body);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        logResponse(req, res, responseBody, duration);
        logJsonRequestResponse(req, res, responseBody, duration);
    });

    next();
};
