import { Request, Response } from "express";
import * as FeedService from "../services/feed.service";
import { handle } from "../middlewares/requestHandler";

export const create = handle(async (req: Request, res: Response) => {
    const section = await FeedService.createFeedSection(req.body);
    res.status(201).json(section);
});

export const list = handle(async (req: Request, res: Response) => {
    const sections = await FeedService.getFeedSections();
    res.status(200).json(sections);
});

export const homepage = handle(async (req: Request, res: Response) => {
    const data = await FeedService.getHomepageFeed();
    res.status(200).json(data);
});

export const update = handle(async (req: Request, res: Response) => {
    const updated = await FeedService.updateFeedSection(
        req.params.id,
        req.body
    );
    res.status(200).json(updated);
});

export const remove = handle(async (req: Request, res: Response) => {
    await FeedService.deleteFeedSection(req.params.id);
    res.status(204).json();
});
