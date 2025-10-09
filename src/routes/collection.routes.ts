import { Router } from "express";
import * as CollectionController from "../controllers/collection.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import { createCollectionSchema } from "../schemas/collection.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(createCollectionSchema),
    CollectionController.createCollection
);
router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    CollectionController.updateCollection
);
router.get(
    "/:id/products",
    CollectionController.getCollectionProductsController
);

export default router;
