import { Router } from "express";
import * as SubCategoryController from "../controllers/subCategory.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import {
    createSubCategorySchema,
    updateSubCategorySchema,
} from "../schemas/subCategory.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(updateSubCategorySchema),
    SubCategoryController.updateSubCategory
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    SubCategoryController.deleteSubCategory
);

router.post(
    "/c/:cId",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(createSubCategorySchema),
    // upload.single("image"),
    SubCategoryController.createSubCategory
);

router.get("/", SubCategoryController.getAllSubCategories);
router.get("/:id", SubCategoryController.getSubCategoryById);

export default router;
