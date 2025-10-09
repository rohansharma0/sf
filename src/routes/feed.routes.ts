import { Router } from "express";
import * as FeedController from "../controllers/feed.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
    createFeedSectionSchema,
    updateFeedSectionSchema,
} from "../schemas/feed.schema";

const router = Router();

router.get("/homepage", FeedController.homepage);
router.get("/", authenticateUser, FeedController.list);
router.post(
    "/",
    authenticateUser,
    validateRequest(createFeedSectionSchema),
    FeedController.create
);
router.put(
    "/:id",
    authenticateUser,
    validateRequest(updateFeedSectionSchema),
    FeedController.update
);
router.delete("/:id", authenticateUser, FeedController.remove);

export default router;
