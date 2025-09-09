import { Request, Response } from "express";
import * as ProductService from "../services/product.service";
import {
    createProductSchema,
    updateProductSchema,
} from "../schemas/product.schema";
import { successResponse, errorResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";
import cloudinary from "../config/cloudinary";
import { handle } from "../middlewares/requestHandler";

export const createProduct = handle(async (req: Request, res: Response) => {
    // const images = req.files?.map((file: any) => file.path) || [];
    // const imagePublicIds =
    //     req.files?.map((file: any) => file.filename) || [];

    // const data = { ...parsed.data, images, imagePublicIds };

    const result = await ProductService.createProduct(
        req.body,
        req.params.cId,
        req.params.sId
    );
    res.status(201).json(result);
});

export const getProducts = handle(async (req: Request, res: Response) => {
    const result = await ProductService.getProductById(req.body.productIds);
    if (!result) {
        return res.status(404).json({ error: "Products not found." });
    }
    res.status(200).json(result);
});

export const getAllProducts = handle(async (req: Request, res: Response) => {
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

    res.status(200).json(result);
});

export const getProductById = handle(async (req: Request, res: Response) => {
    const result = await ProductService.getProductById(req.params.id);
    if (!result) {
        return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(result);
});

export const updateProduct = handle(async (req: Request, res: Response) => {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const result = await ProductService.updateProductById(
        req.params.id,
        parsed.data
    );
    if (!result) {
        return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(result);
});

export const deleteProduct = handle(async (req: Request, res: Response) => {
    const result = await ProductService.deleteProductById(req.params.id);
    if (!result) {
        return res.status(404).json({ error: "Product not found." });
    }

    if (result.imagePublicIds) {
        await Promise.all(
            result.imagePublicIds.map((id) => cloudinary.uploader.destroy(id))
        );
    }

    res.status(200).json(result);
});

export const checkStock = handle(async (req: Request, res: Response) => {
    const result = await ProductService.checkStock(
        req.body.productId,
        req.body.stock
    );

    res.status(200).json(result);
});
