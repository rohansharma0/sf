import { Request, Response } from "express";
import * as CategoryService from "../services/category.service";
import { handle } from "../middlewares/requestHandler";

export const createCategory = handle(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const image = req.file?.path;
    const imagePublicId = req.file?.filename;
    const result = await CategoryService.createCategory({
        title,
        description,
        image,
        imagePublicId,
    });
    res.status(201).json(result);
});

export const getAllCategories = handle(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    res.status(200).json(result);
});

export const getCategoryById = handle(async (req: Request, res: Response) => {
    const result = await CategoryService.getCategoryById(req.params.id);
    if (!result) {
        return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(result);
});

export const updateCategory = handle(async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategoryById(
        req.params.id,
        req.body
    );
    if (!result) {
        return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(result);
});

export const deleteCategory = handle(async (req: Request, res: Response) => {
    const result = await CategoryService.deleteCategoryById(req.params.id);
    if (!result) {
        return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(result);
});
