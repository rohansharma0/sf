import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { handle } from "../middlewares/requestHandler";

export const register = handle(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
});

export const login = handle(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
});
