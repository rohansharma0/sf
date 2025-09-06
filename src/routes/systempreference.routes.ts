import { Router } from "express";
import * as SystemPreferenceController from "../controllers/systempreference.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", SystemPreferenceController.getAll);
router.get("/:key", SystemPreferenceController.getByKey);
router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    SystemPreferenceController.set
);

export default router;
