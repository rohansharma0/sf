import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { handle } from "../middlewares/requestHandler";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
};

export const register = handle(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, csrfToken } = await AuthService.register(
        req.body
    );

    res.cookie("refresh_token", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("csrf_token", csrfToken, { sameSite: "strict" });
    res.status(201).json({ accessToken });
});

export const login = handle(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, csrfToken } = await AuthService.login(
        req.body
    );

    res.cookie("refresh_token", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("csrf_token", csrfToken, { sameSite: "strict" });
    res.status(200).json({ accessToken });
});

export const refreshToken = handle(async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies["refresh_token"];
        const {
            accessToken,
            refreshToken: newRefresh,
            csrfToken,
        } = await AuthService.refreshAccessToken(refreshToken);

        res.cookie("refresh_token", newRefresh, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("csrf_token", csrfToken, { sameSite: "strict" });
        res.status(200).json({ accessToken });
    } catch (err: any) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
});

export const logout = handle(async (req: Request, res: Response) => {
    res.clearCookie("refresh_token");
    res.clearCookie("csrf_token");
    res.status(204).json();
});
