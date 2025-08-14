import { z } from "zod";

export const createCategorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const updateCategorySchema = createCategorySchema.partial();
