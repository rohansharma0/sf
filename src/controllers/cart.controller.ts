import { Request, Response } from "express";
import * as CartService from "../services/cart.service";
import { handle } from "../middlewares/requestHandler";

export const getCart = handle(async (req: Request, res: Response) => {
    const result = await CartService.getCart(req.user.id);
    res.status(200).json(result);
});

export const addToCart = handle(async (req: Request, res: Response) => {
    const result = await CartService.addToCart(
        req.body.productId,
        req.body.quantity,
        req.user.id
    );
    res.status(200).json(result);
});

export const removeProductFromCart = handle(
    async (req: Request, res: Response) => {
        const result = await CartService.removeProductFromCart(
            req.params.productId,
            req.user.id
        );
        res.status(200).json(result);
    }
);
