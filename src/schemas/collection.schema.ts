import { z } from "zod";

const rulesSchema = z.object({
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    discountOnly: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    brands: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
    subcategoryId: z.string().optional(),
    createdWithinDays: z.number().optional(),
});

export const createCollectionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    type: z.enum(["manual", "rule"]),
    productIds: z.array(z.string()).optional(),
    rules: rulesSchema.optional(),
    isActive: z.boolean().optional(),
});

export const updateCollectionSchema = createCollectionSchema.partial();
