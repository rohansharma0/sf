import { Request, Response } from "express";
import * as CategoryService from "../services/category.service";
import { handle } from "../middlewares/requestHandler";
import { getProducts } from "../services/product.service";

export const createCategory = handle(async (req: Request, res: Response) => {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
});

export const getAllCategories = handle(async (_req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
});

export const getCategoryProducts = handle(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const q = req.query as Record<string, string | undefined>;

        const page = parseInt(q.page ?? "1", 10);
        const limit = parseInt(q.limit ?? "20", 10);

        const filters: any = { categoryId: id };

        if (q.brands) filters.brands = q.brands.split(",");
        if (q.colors) filters.colors = q.colors.split(",");
        if (q.sizes) filters.sizes = q.sizes.split(",");
        if (q.tags) filters.tags = q.tags.split(",");
        if (q.minPrice) filters.minPrice = Number(q.minPrice);
        if (q.maxPrice) filters.maxPrice = Number(q.maxPrice);
        if (q.discountOnly === "true") filters.discountOnly = true;
        if (q.inStock) filters.inStock = q.inStock === "true";

        const allowedSorts = [
            "newest",
            "price_asc",
            "price_desc",
            "discount",
        ] as const;
        type SortOption = (typeof allowedSorts)[number];
        const sortParam = q.sort || "newest";
        const sort: SortOption = allowedSorts.includes(sortParam as SortOption)
            ? (sortParam as SortOption)
            : "newest";

        const data = await getProducts({
            page,
            limit,
            sort,
            filters,
            includeFacets: q.includeFacets === "true",
        });

        res.json({ success: true, ...data });
    }
);

export const updateCategory = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await CategoryService.updateCategoryById(id, req.body);
    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.json(updated);
});

export const deleteCategory = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await CategoryService.deleteCategoryById(id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.status(204).json();
});
