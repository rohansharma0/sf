import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("4000"),
    MONGODB_URI: z.string().url(),
    JWT_SECRET: z.string().min(1, "JWT_SECRET must be at least 1 character"),
    FRONTEND_URLS: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
