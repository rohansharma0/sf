import { Request, Response } from "express";
import * as SubCategoryService from "../services/subcategory.service";
import {
    createSubCategorySchema,
    updateSubCategorySchema,
} from "../schemas/subcategory.schema";
import { successResponse, errorResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";
import cloudinary from "../config/cloudinary";

export const createSubCategory = async (req: Request, res: Response) => {
    try {
        const image = req.file?.path || null;
        const imagePublicId = req.file?.filename || null;

        const result = await SubCategoryService.createSubCategory(
            req.body,
            req.params.cId,
            image,
            imagePublicId
        );
        res.status(201).json(
            successResponse(201, "SubCategory created successfully.", result)
        );
    } catch (err: any) {
        logger.error("Create SubCategory error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getAllSubCategories = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const result = await SubCategoryService.getAllSubCategories({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
        });

        res.status(200).json(
            successResponse(200, "SubCategories fetched successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getSubCategoryById = async (req: Request, res: Response) => {
    try {
        const result = await SubCategoryService.getSubCategoryById(
            req.params.id
        );
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "SubCategory not found."));
        }

        res.status(200).json(
            successResponse(200, "SubCategory fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Get SubCategory by ID error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const updateSubCategory = async (req: Request, res: Response) => {
    try {
        const parsed = updateSubCategorySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(errorResponse(400, "Invalid data"));
        }

        const result = await SubCategoryService.updateSubCategoryById(
            req.params.id,
            parsed.data
        );
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "SubCategory not found."));
        }

        res.status(200).json(
            successResponse(200, "SubCategory updated successfully.", result)
        );
    } catch (err: any) {
        logger.error("Update SubCategory error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
    try {
        const result = await SubCategoryService.deleteSubCategoryById(
            req.params.id
        );
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "SubCategory not found."));
        }

        if (result.imagePublicId) {
            await cloudinary.uploader.destroy(result.imagePublicId);
        }

        res.status(200).json(
            successResponse(200, "SubCategory deleted successfully.", result)
        );
    } catch (err: any) {
        logger.error("Delete subcategory error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};
