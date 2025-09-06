import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { handle } from "../middlewares/requestHandler";

export const getUserById = handle(async (req: Request, res: Response) => {
    const result = await UserService.getUserById(req.user?.id);
    return res.status(200).json(result);
});

export const updateUser = handle(async (req: Request, res: Response) => {
    await UserService.updateUser(req.body, req.user?.id);
    return res.status(204).json();
});

export const changePassword = handle(async (req: Request, res: Response) => {
    await UserService.changePassword(req.body, req.user?.id);
    return res.status(204).json();
});

export const getWishlist = handle(async (req: Request, res: Response) => {
    const user = await UserService.getWishlist(req.user?.id);
    return res.status(200).json(user?.wishlist);
});

export const toggleWishlist = handle(async (req: Request, res: Response) => {
    const result = await UserService.toggleWishlist(
        req.user?.id,
        req.body.productId
    );
    return res.status(200).json(result);
});
