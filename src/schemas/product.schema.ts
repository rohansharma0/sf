import { z } from "zod";

export const createProductSchema = z
    .object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters long.")
            .max(100, "Title must be at most 100 characters long."),

        description: z
            .string()
            .min(10, "Description must be at least 10 characters long.")
            .max(2000, "Description must be at most 2000 characters long."),

        status: z.enum(["active", "draft", "archived"]).default("draft"),

        price: z
            .number("Price is required.")
            .positive("Price must be greater than 0."),

        compareAtPrice: z
            .number("Price is required.")
            .positive("Compare at price must be greater than 0."),

        isTaxable: z.boolean().default(false),

        purchaseCost: z
            .number()
            .nonnegative("Purchase cost must be 0 or greater.")
            .optional(),

        weight: z
            .number()
            .positive("Weight must be greater than 0.")
            .optional(),

        weightUnit: z.enum(["lb", "kg", "oz", "g"]).optional(),

        // If you add variants later
        // variants: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")).optional()
    })
    .refine(
        (data) => !data.compareAtPrice || data.compareAtPrice >= data.price,
        {
            message: "Compare at price must be greater than or equal to price.",
            path: ["compareAtPrice"],
        }
    );

export const updateProductSchema = createProductSchema.partial();
