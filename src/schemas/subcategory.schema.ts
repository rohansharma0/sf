import { z } from "zod";

export const createSubCategorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    isBanner: z.boolean().optional(),
});

export const updateSubCategorySchema = createSubCategorySchema.partial();
