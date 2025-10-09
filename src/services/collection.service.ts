import { Collection } from "../models/collection.model";
import { getProducts, SortType } from "./product.service";

interface ProductQueryOptions {
    page: number;
    limit: number;
    sort: SortType;
    includeFacets?: boolean;
}

export async function createCollection(data: any) {
    return Collection.create(data);
}

export async function updateCollection(id: string, updates: any) {
    return Collection.findByIdAndUpdate(id, updates, { new: true }).lean();
}

export async function getCollectionProducts(
    collectionId: string,
    userFilters: Record<string, any> = {},
    options: ProductQueryOptions = { page: 1, limit: 20, sort: "newest" }
) {
    const collection = await Collection.findById(collectionId).lean();
    if (!collection) throw new Error("Collection not found");

    const { page, limit, sort, includeFacets = false } = options;

    if (collection.type === "manual") {
        const filters = {
            ...userFilters,
            _id: { $in: collection.productIds || [] },
        };
        return getProducts({ page, limit, sort, filters, includeFacets });
    }

    const rules = collection.rules || {};
    const mappedRules: Record<string, any> = {};

    if (rules.minPrice !== undefined) mappedRules.minPrice = rules.minPrice;
    if (rules.maxPrice !== undefined) mappedRules.maxPrice = rules.maxPrice;
    if (rules.discountOnly) mappedRules.discountOnly = true;
    if (rules.tags) mappedRules.tags = rules.tags;
    if (rules.brands) mappedRules.brands = rules.brands;
    if (rules.colors) mappedRules.colors = rules.colors;
    if (rules.sizes) mappedRules.sizes = rules.sizes;
    if (rules.categoryId) mappedRules.categoryId = rules.categoryId;
    if (rules.subcategoryId) mappedRules.subcategoryId = rules.subcategoryId;
    if (rules.createdWithinDays)
        mappedRules.createdWithinDays = rules.createdWithinDays;

    const finalFilters = { ...mappedRules, ...userFilters };

    return getProducts({
        page,
        limit,
        sort,
        filters: finalFilters,
        includeFacets,
    });
}
