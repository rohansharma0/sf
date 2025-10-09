import { Request, Response } from "express";
import * as SubCategoryService from "../services/subCategory.service";
import { handle } from "../middlewares/requestHandler";
import { updateSubCategorySchema } from "../schemas/subCategory.schema";

export const createSubCategory = handle(async (req: Request, res: Response) => {
    const image = req.file?.path || null;
    const imagePublicId = (req as any).file?.filename || null;

    const result = await SubCategoryService.createSubCategory(
        req.body,
        req.params.cId,
        image,
        imagePublicId
    );

    res.status(201).json(result);
});

export const getAllSubCategories = handle(
    async (req: Request, res: Response) => {
        const { page = 1, limit = 10, search = "" } = req.query;

        const result = await SubCategoryService.getAllSubCategories({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
        });

        res.status(200).json(result);
    }
);

export const getSubCategoryById = handle(
    async (req: Request, res: Response) => {
        const result = await SubCategoryService.getSubCategoryById(
            req.params.id
        );
        if (!result) {
            return res.status(404).json({ error: "SubCategory not found." });
        }

        res.status(200).json(result);
    }
);

export const updateSubCategory = handle(async (req: Request, res: Response) => {
    const parsed = updateSubCategorySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error });
    }

    const result = await SubCategoryService.updateSubCategoryById(
        req.params.id,
        parsed.data
    );
    if (!result) {
        return res.status(404).json({ error: "SubCategory not found." });
    }
    res.status(200).json(result);
});

export const deleteSubCategory = handle(async (req: Request, res: Response) => {
    const result = await SubCategoryService.deleteSubCategoryById(
        req.params.id
    );
    if (!result) {
        return res.status(404).json({ error: "SubCategory not found." });
    }

    // if (result.imagePublicId) {
    //     await cloudinary.uploader.destroy(result.imagePublicId);
    // }

    res.status(200).json(result);
});
