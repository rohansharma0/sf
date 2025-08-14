import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";

import * as SystemPreferenceService from "../services/systempreference.service";

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await SystemPreferenceService.getAll();
        res.status(200).json(
            successResponse(
                200,
                "System Preference fetched successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getByGroupId = async (req: Request, res: Response) => {
    try {
        const result = await SystemPreferenceService.getByGroupId(
            req.params.groupId
        );
        res.status(200).json(
            successResponse(
                200,
                "System Preference fetched successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getByKey = async (req: Request, res: Response) => {
    try {
        const result = await SystemPreferenceService.getByKey(
            req.params.groupId,
            req.params.key
        );
        res.status(200).json(
            successResponse(
                200,
                "System Preference fetched successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const set = async (req: Request, res: Response) => {
    try {
        const { groupId, key, value } = req.body;
        if (!groupId || !key) {
            return res
                .status(400)
                .json(errorResponse(400, "GroupId and Key are required"));
        }
        const result = await SystemPreferenceService.set(groupId, key, value);
        res.status(200).json(
            successResponse(
                200,
                "System Preference fetched successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Get System Preference error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
