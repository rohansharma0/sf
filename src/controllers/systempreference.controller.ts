import { Request, Response } from "express";
import * as SystemPreferenceService from "../services/systempreference.service";
import { handle } from "../middlewares/requestHandler";

// const transformPreferences = (prefs: { key: string; value: string }[]) => {
//     return prefs.reduce((acc, curr) => {
//         acc[curr.key] = curr.value;
//         return acc;
//     }, {} as Record<string, string>);
// };

export const getAll = handle(async (req: Request, res: Response) => {
    const result = await SystemPreferenceService.getAll();
    res.status(200).json(result);
});

export const getByKey = handle(async (req: Request, res: Response) => {
    const result = await SystemPreferenceService.getByKey(req.params.key, true);
    if (!result) return res.status(404).json({ error: "Not Found" });
    res.status(200).json(result.value);
});

export const set = handle(async (req: Request, res: Response) => {
    const { key, value, isPublic, groupId } = req.body;
    if (!key) return res.status(400).json({ error: "Key is required." });

    const result = await SystemPreferenceService.set({
        key,
        value,
        isPublic,
        groupId,
    });
    res.status(200).json(result);
});

export const getByGroup = handle(async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const result = await SystemPreferenceService.getByGroup(groupId, true);
    res.status(200).json(result);
});

export const deleteByKey = handle(async (req: Request, res: Response) => {
    const result = await SystemPreferenceService.deleteByKey(req.params.key);
    if (!result) return res.status(404).json({ error: "Not Found" });
    res.status(204).json();
});

export const deleteByGroup = handle(async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const result = await SystemPreferenceService.deleteByGroup(groupId);
    if (result.deletedCount === 0) {
        return res.status(404).json({
            error: "No preferences found in this group",
        });
    }
    res.status(204).json();
});
