import { Request, Response } from "express";
import * as ProductService from "../services/product.service";
import { handle } from "../middlewares/requestHandler";

interface ProductFilters {
    brands: string[];
    colors: string[];
    sizes: string[];
    tags: string[];
    minPrice?: number;
    maxPrice?: number;
    discountOnly?: boolean;
    inStock?: boolean;
    categoryId?: string;
    subcategoryId?: string;
    createdWithinDays?: number;
}

export const createProduct = handle(async (req: Request, res: Response) => {
    const payload = req.body;
    const doc = await ProductService.createProduct(payload);
    res.status(201).json(doc);
});

export const updateProduct = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const doc = await ProductService.updateProduct(id, updates);
    res.json(doc);
});

export const deleteProduct = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(204).json();
});

export const getAllProducts = handle(async (req: Request, res: Response) => {
    const q = req.query as Record<string, string | undefined>;

    const page = parseInt(q.page ?? "1", 10);
    const limit = parseInt(q.limit ?? "20", 10);

    const filters: ProductFilters = {
        brands: q.brands?.split(",") ?? [],
        colors: q.colors?.split(",") ?? [],
        sizes: q.sizes?.split(",") ?? [],
        tags: q.tags?.split(",") ?? [],
    };

    if (q.minPrice) filters.minPrice = Number(q.minPrice);
    if (q.maxPrice) filters.maxPrice = Number(q.maxPrice);
    if (q.discountOnly === "true") filters.discountOnly = true;
    if (q.inStock) filters.inStock = q.inStock === "true";
    if (q.categoryId) filters.categoryId = q.categoryId;
    if (q.subcategoryId) filters.subcategoryId = q.subcategoryId;
    if (q.createdWithinDays)
        filters.createdWithinDays = Number(q.createdWithinDays);

    const allowedSorts = [
        "newest",
        "price_asc",
        "price_desc",
        "discount",
    ] as const;

    type SortOption = (typeof allowedSorts)[number];

    const sortParam = (req.query.sort as string) || "newest";
    const sort: SortOption = allowedSorts.includes(sortParam as SortOption)
        ? (sortParam as SortOption)
        : "newest";

    const data = await ProductService.getProducts({
        page,
        limit,
        sort,
        filters,
        includeFacets: req.query.includeFacets === "true",
    });

    res.json(data);
});

export const getProductById = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, data: product });
});

export const checkStock = handle(async (req: Request, res: Response) => {
    const items = req.body.items as { productId: string; qty: number }[];
    if (!Array.isArray(items))
        return res.status(400).json({ error: "items required" });
    const result = await ProductService.checkStock(items);
    res.json(result);
});
