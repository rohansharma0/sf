import { Request, Response } from "express";
import * as CategoryService from "../services/category.service";

import { successResponse, errorResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const image = req.file?.path;
        const imagePublicId = req.file?.filename;
        const result = await CategoryService.createCategory({
            title,
            description,
            image,
            imagePublicId,
        });
        res.status(201).json(
            successResponse(201, "Category created successfully.", result)
        );
    } catch (err: any) {
        logger.error("Create category error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.getAllCategories();
        res.status(200).json(
            successResponse(200, "Categories fetched successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.getCategoryById(req.params.id);
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Category not found."));
        }

        res.status(200).json(
            successResponse(200, "Category fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Get category by ID error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.updateCategoryById(
            req.params.id,
            req.body
        );
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Category not found."));
        }

        res.status(200).json(
            successResponse(200, "Category updated successfully.", result)
        );
    } catch (err: any) {
        logger.error("Update category error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.deleteCategoryById(req.params.id);
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Category not found."));
        }

        res.status(200).json(
            successResponse(200, "Category deleted successfully.", result)
        );
    } catch (err: any) {
        logger.error("Delete category error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};
