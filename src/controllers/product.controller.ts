import { Request, Response } from "express";
import * as ProductService from "../services/product.service";
import {
    createProductSchema,
    updateProductSchema,
} from "../schemas/product.schema";
import { successResponse, errorResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";
import cloudinary from "../config/cloudinary";

export const createProduct = async (req: Request, res: Response) => {
    try {
        // const images = req.files?.map((file: any) => file.path) || [];
        // const imagePublicIds =
        //     req.files?.map((file: any) => file.filename) || [];

        // const data = { ...parsed.data, images, imagePublicIds };

        const result = await ProductService.createProduct(
            req.body,
            req.params.cId,
            req.params.sId
        );
        res.status(201).json(
            successResponse(201, "Product created successfully.", result)
        );
    } catch (err: any) {
        logger.error("Create product error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.getProductById(req.body.productIds);
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Products not found."));
        }

        res.status(200).json(
            successResponse(200, "Products fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Get product by ID error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            category,
            minPrice,
            maxPrice,
        } = req.query;

        const result = await ProductService.getAllProducts({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
            category: category ? String(category) : undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });

        res.status(200).json(
            successResponse(200, "Products fetched successfully", result)
        );
    } catch (err: any) {
        logger.error("Get Products Error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};
export const getProductById = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.getProductById(req.params.id);
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Product not found."));
        }

        res.status(200).json(
            successResponse(200, "Product fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Get product by ID error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const parsed = updateProductSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(errorResponse(400, "Invalid data"));
        }

        const result = await ProductService.updateProductById(
            req.params.id,
            parsed.data
        );
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Product not found."));
        }

        res.status(200).json(
            successResponse(200, "Product updated successfully.", result)
        );
    } catch (err: any) {
        logger.error("Update product error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.deleteProductById(req.params.id);
        if (!result) {
            return res
                .status(404)
                .json(errorResponse(404, "Product not found."));
        }

        if (result.imagePublicIds) {
            await Promise.all(
                result.imagePublicIds.map((id) =>
                    cloudinary.uploader.destroy(id)
                )
            );
        }

        res.status(200).json(
            successResponse(200, "Product deleted successfully.", result)
        );
    } catch (err: any) {
        logger.error("Delete product error", { message: err.message });
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const checkStock = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.checkStock(
            req.body.productId,
            req.body.stock
        );

        res.status(200).json(
            successResponse(200, "Product stock availability.", result)
        );
    } catch (err: any) {
        logger.error("Product stock availability error", {
            message: err.message,
        });
        res.status(500).json(errorResponse(500, err.message));
    }
};
