import { Request, Response } from "express";
import * as CollectionService from "../services/collection.service";
import { handle } from "../middlewares/requestHandler";
import { parseSort } from "../utils/sort";

export const createCollection = handle(async (req: Request, res: Response) => {
    const created = await CollectionService.createCollection(req.body);
    res.status(201).json({ success: true, data: created });
});

export const updateCollection = handle(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await CollectionService.updateCollection(id, req.body);
    res.json({ success: true, data: updated });
});

export const getCollectionProductsController = handle(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { page = "1", limit = "20", sort } = req.query;

        const filters: any = {};
        if (req.query.brands)
            filters.brands = (req.query.brands as string).split(",");
        if (req.query.colors)
            filters.colors = (req.query.colors as string).split(",");
        if (req.query.sizes)
            filters.sizes = (req.query.sizes as string).split(",");
        if (req.query.tags)
            filters.tags = (req.query.tags as string).split(",");
        if (req.query.minPrice) filters.minPrice = Number(req.query.minPrice);
        if (req.query.maxPrice) filters.maxPrice = Number(req.query.maxPrice);
        if (req.query.discountOnly === "true") filters.discountOnly = true;

        const data = await CollectionService.getCollectionProducts(
            id,
            filters,
            {
                page: Number(page),
                limit: Number(limit),
                sort: parseSort(sort as string | undefined),
                includeFacets: req.query.includeFacets === "true",
            }
        );

        res.json({ success: true, ...data });
    }
);
