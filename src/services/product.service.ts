import { FilterQuery, SortOrder, Types } from "mongoose";
import { IProduct, Product } from "../models/product.model";

export type SortType = "newest" | "price_asc" | "price_desc" | "discount";

export interface ProductQueryInput {
    page?: number;
    limit?: number;
    sort?: SortType;
    filters?: Record<string, any>;
    includeFacets?: boolean;
}

export async function getProducts(opts: ProductQueryInput) {
    const {
        page = 1,
        limit = 20,
        sort = "newest",
        filters = {},
        includeFacets = false,
    } = opts;

    const filter: FilterQuery<IProduct> = {};

    // Category filters
    if (filters.categoryId && Types.ObjectId.isValid(filters.categoryId)) {
        filter.categoryId = new Types.ObjectId(filters.categoryId);
    }
    if (
        filters.subcategoryId &&
        Types.ObjectId.isValid(filters.subcategoryId)
    ) {
        filter.subcategoryId = new Types.ObjectId(filters.subcategoryId);
    }

    // Price range
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        filter.price = {};
        if (filters.minPrice !== undefined)
            filter.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice !== undefined)
            filter.price.$lte = Number(filters.maxPrice);
    }

    // Sale / Stock
    if (filters.discountOnly) filter.isOnSale = true;

    if (filters.inStock === true) filter.stock = { $gt: 0 };
    if (filters.inStock === false) filter.stock = { $lte: 0 };

    // Array filters
    if (Array.isArray(filters.brands) && filters.brands.length > 0) {
        filter.brand = { $in: filters.brands };
    }
    if (Array.isArray(filters.colors) && filters.colors.length > 0) {
        filter.colors = { $in: filters.colors };
    }
    if (Array.isArray(filters.sizes) && filters.sizes.length > 0) {
        filter.sizes = { $in: filters.sizes };
    }
    if (Array.isArray(filters.tags) && filters.tags.length > 0) {
        filter.tags = { $in: filters.tags };
    }

    // Created within X days
    if (filters.createdWithinDays) {
        const days = Number(filters.createdWithinDays);
        const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        filter.createdAt = { $gte: date };
    }

    // Sorting
    const sortOption: Record<string, SortOrder> = {};
    switch (sort) {
        case "price_asc":
            sortOption.price = 1;
            break;
        case "price_desc":
            sortOption.price = -1;
            break;
        case "discount":
            sortOption.isOnSale = -1;
            break;
        case "newest":
        default:
            sortOption.createdAt = -1;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
        Product.countDocuments(filter),
    ]);

    const result: any = {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
        items,
    };

    if (includeFacets) {
        const facets = await Product.aggregate([
            { $match: filter },
            {
                $facet: {
                    brands: [{ $sortByCount: "$brand" }],
                    colors: [
                        {
                            $unwind: {
                                path: "$colors",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        { $sortByCount: "$colors" },
                    ],
                    sizes: [
                        {
                            $unwind: {
                                path: "$sizes",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        { $sortByCount: "$sizes" },
                    ],
                },
            },
        ]);
        result.facets = facets[0] || { brands: [], colors: [], sizes: [] };
    }

    return result;
}

export async function createProduct(payload: Partial<IProduct>) {
    const p = new Product(payload);
    await p.save();
    return p.toObject();
}

export async function updateProduct(id: string, updates: Partial<IProduct>) {
    const doc = await Product.findByIdAndUpdate(id, updates, {
        new: true,
    }).lean();
    return doc;
}

export async function deleteProduct(id: string) {
    return Product.findByIdAndDelete(id).lean();
}

export async function getProductById(id: string) {
    return Product.findById(id).lean();
}

export async function checkStock(items: { productId: string; qty: number }[]) {
    const ids = items.map((i) => new Types.ObjectId(i.productId));
    const products = await Product.find({ _id: { $in: ids } }).lean();
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));
    return items.map((it) => {
        const prod = productMap.get(it.productId);
        return {
            productId: it.productId,
            requested: it.qty,
            available: prod?.stock ?? 0,
            ok: prod ? prod.stock >= it.qty : false,
            notFound: !prod,
        };
    });
}
