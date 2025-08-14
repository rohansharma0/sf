import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";

import * as CartService from "../services/cart.service";

export const getCart = async (req: Request, res: Response) => {
    try {
        const result = await CartService.getCart(req.user.id);
        res.status(200).json(
            successResponse(200, "Cart fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const result = await CartService.addToCart(
            req.body.productId,
            req.body.quantity,
            req.user.id
        );
        res.status(200).json(
            successResponse(200, "Product added in cart successfully.", result)
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const removeProductFromCart = async (req: Request, res: Response) => {
    try {
        const result = await CartService.removeProductFromCart(
            req.params.productId,
            req.user.id
        );
        res.status(200).json(
            successResponse(
                200,
                "Product removed from cart successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Not found", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
