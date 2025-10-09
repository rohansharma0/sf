import z from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const baseProductSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["active", "draft", "archived"]).optional(),
    images: z.array(z.string()).optional(),
    imagePublicIds: z.array(z.string()).optional(),
    price: z.coerce.number(),
    compareAtPrice: z.coerce.number().optional(),
    isTaxable: z.boolean().optional(),
    purchaseCost: z.coerce.number().optional(),
    barcode: z.string().optional(),
    weight: z.coerce.number().optional(),
    weightUnit: z.string().optional(),
    stock: z.coerce.number().optional(),
    isStockTrackable: z.boolean().optional(),
    isOnSale: z.boolean().optional(),
    brand: z.string().optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    inStock: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    categoryId: objectId.optional(),
    subcategoryId: objectId.optional(),
});

export const createProductSchema = z.object({
    body: baseProductSchema,
});

export const updateProductSchema = z.object({
    body: baseProductSchema.partial(),
});
