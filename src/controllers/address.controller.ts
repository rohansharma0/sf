import { Request, Response } from "express";
import * as AddressService from "../services/address.service";
import { successResponse, errorResponse } from "../utils/ApiResponse";

export const createAddress = async (req: Request, res: Response) => {
    try {
        const result = await AddressService.createAddress(
            req.user.id,
            req.body
        );
        res.status(201).json(
            successResponse(201, "Address created successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const getUserAddresses = async (req: Request, res: Response) => {
    try {
        const result = await AddressService.getUserAddresses(req.user.id);
        res.status(200).json(
            successResponse(200, "Addresses fetched successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const result = await AddressService.updateAddress(
            req.user.id,
            req.params.id,
            req.body
        );
        if (!result)
            return res
                .status(404)
                .json(errorResponse(404, "Address not found"));
        res.status(200).json(
            successResponse(200, "Address updated successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const result = await AddressService.deleteAddress(
            req.user.id,
            req.params.id
        );
        if (!result)
            return res
                .status(404)
                .json(errorResponse(404, "Address not found"));
        res.status(200).json(
            successResponse(200, "Address deleted successfully", result)
        );
    } catch (err: any) {
        res.status(500).json(errorResponse(500, err.message));
    }
};
