import { z } from "zod";

export const createSubCategorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const updateSubCategorySchema = createSubCategorySchema.partial();
