import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";
import * as UserService from "../services/user.service";
import * as ProductService from "../services/product.service";

export const updateUser = async (req: Request, res: Response) => {
    try {
        await UserService.updateUser(req.body, req.user?.id);
        res.status(200).json(
            successResponse(200, "User updated successfully.", true)
        );
    } catch (err: any) {
        logger.error("Login error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getUserById(req.user?.id);
        res.status(200).json(
            successResponse(200, "User fetched successfully.", result)
        );
    } catch (err: any) {
        logger.error("Fetch user error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        await UserService.changePassword(req.body, req.user?.id);
        res.status(200).json(
            successResponse(200, "Password changed successfully.", true)
        );
    } catch (err: any) {
        logger.error("Password change error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getWishlist = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getWishlist(req.user?.id);

        res.status(200).json(
            successResponse(
                200,
                "User's wishlist fetched successfully.",
                user?.wishlist
            )
        );
    } catch (err: any) {
        logger.error("Fetch user wishlist error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const toggleWishlist = async (req: Request, res: Response) => {
    try {
        const result = await UserService.toggleWishlist(
            req.user?.id,
            req.body.productId
        );
        res.status(200).json(
            successResponse(200, "Product toggle successfully.", result)
        );
    } catch (err: any) {
        logger.error("add to wishlist error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
