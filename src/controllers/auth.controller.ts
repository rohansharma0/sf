import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";

export const register = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json(
            successResponse(201, "User registered successfully.", result)
        );
    } catch (err: any) {
        logger.error("Register error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(
            successResponse(201, "User logged in successfully.", result)
        );
    } catch (err: any) {
        logger.error("Login error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
