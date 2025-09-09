import { Router } from "express";
import * as SystemPreferenceController from "../controllers/systempreference.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", SystemPreferenceController.getAll);
router.get("/:key", SystemPreferenceController.getByKey);
router.get("/group/:groupId", SystemPreferenceController.getByGroup);

router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    SystemPreferenceController.set
);

router.delete(
    "/:key",
    authenticateUser,
    authorizeRoles("admin"),
    SystemPreferenceController.deleteByKey
);

router.delete(
    "/group/:groupId",
    authenticateUser,
    authorizeRoles("admin"),
    SystemPreferenceController.deleteByGroup
);

export default router;
