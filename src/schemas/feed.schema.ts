import { z } from "zod";
import { Types } from "mongoose";

export const objectIdSchema = z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    });

export const createFeedSectionSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().optional(),
    collectionId: objectIdSchema,
    layout: z.enum(["grid", "carousel", "banner"]).default("grid"),
    position: z.number().default(0),
    limit: z.number().min(1).max(100).default(20),
    isActive: z.boolean().default(true),
    categoryId: objectIdSchema.optional().nullable(),
    subcategoryId: objectIdSchema.optional().nullable(),
});

export const updateFeedSectionSchema = createFeedSectionSchema.partial();
