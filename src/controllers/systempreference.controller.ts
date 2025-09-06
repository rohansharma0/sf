import { Request, Response } from "express";
import * as SystemPreferenceService from "../services/systempreference.service";
import { handle } from "../middlewares/requestHandler";

const transformPreferences = (prefs: { key: string; value: string }[]) => {
    return prefs.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
};

export const getAll = handle(async (req: Request, res: Response) => {
    const result = await SystemPreferenceService.getAll();
    res.status(200).json(transformPreferences(result));
});

export const getByKey = handle(async (req: Request, res: Response) => {
    const result = await SystemPreferenceService.getByKey(req.params.key);
    if (!result) return res.status(404).json({ error: "Not Found." });
    res.status(200).json(result.value);
});

export const set = handle(async (req: Request, res: Response) => {
    const { key, value } = req.body;
    if (!key) {
        return res.status(400).json({ error: "Key is required." });
    }
    const result = await SystemPreferenceService.set(key, value);
    res.status(204).json({ [result.key]: result.value });
});
