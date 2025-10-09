import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .max(50, "Name must be at most 50 characters long."),
    email: z
        .string()
        .email("Invalid email address.")
        .min(5, "Email must be at least 5 characters long."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .max(100, "Password must be at most 100 characters long.")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one letter and one number."
        ),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address.")
        .min(5, "Email must be at least 5 characters long."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .max(100, "Password must be at most 100 characters long."),
});
