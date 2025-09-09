import { Request, Response, NextFunction } from "express";
import { jsonLogger, logger } from "../utils/logger";

const logRequest = (req: Request) => {
    const safeBody = { ...req.body };
    // if (safeBody.password) safeBody.password = "******";
    // if (safeBody.oldPassword) safeBody.oldPassword = "******";
    // if (safeBody.newPassword) safeBody.newPassword = "******";
    const requestBody =
        req.method !== "GET" ? `- REQUEST: ${JSON.stringify(safeBody)}` : "";
    logger.info(`${req.method} ${req.originalUrl} ${requestBody}`);
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
    jsonLogger.log({
        level: "json",
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
        responseBody = body;
        if (typeof body === "string") {
            try {
                responseBody = JSON.parse(body);
            } catch {}
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
