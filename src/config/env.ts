import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    MONGODB_URI: z
        .string()
        .url("MONGODB_URI must be a valid URL")
        .min(1, "MONGODB_URI is required"),
    JWT_ACCESS_SECRET: z
        .string()
        .min(10, "JWT_ACCESS_SECRET must be at least 10 characters long"),
    JWT_REFRESH_SECRET: z
        .string()
        .min(10, "JWT_REFRESH_SECRET must be at least 10 characters long"),
    FRONTEND_URLS: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
