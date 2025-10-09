import { Request, Response } from "express";
import * as AddressService from "../services/address.service";
import { handle } from "../middlewares/requestHandler";

export const createAddress = handle(async (req: Request, res: Response) => {
    const result = await AddressService.createAddress(req.user?.id!, req.body);
    return res.status(201).json(result);
});

export const getUserAddresses = handle(async (req: Request, res: Response) => {
    const result = await AddressService.getUserAddresses(req.user?.id!);
    res.status(200).json(result);
});

export const getUserAddressById = handle(
    async (req: Request, res: Response) => {
        const result = await AddressService.getUserAddressById(
            req.user?.id!,
            req.params.id
        );
        res.status(200).json(result);
    }
);

export const updateAddress = handle(async (req: Request, res: Response) => {
    const result = await AddressService.updateAddress(
        req.user?.id!,
        req.params.id,
        req.body
    );
    res.status(200).json(result);
});

export const deleteAddress = handle(async (req: Request, res: Response) => {
    await AddressService.deleteAddress(req.user?.id!, req.params.id);
    res.status(204).send();
});
