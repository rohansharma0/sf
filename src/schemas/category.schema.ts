import { z } from "zod";

export const createCategorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    isBanner: z.boolean().optional(),
    parentId: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
