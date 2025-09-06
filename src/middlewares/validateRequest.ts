import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error:
                    "Validation error: " +
                    JSON.stringify(result.error.flatten().fieldErrors),
            });
        }
        req.body = result.data;
        next();
    };
