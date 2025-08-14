import { Router } from "express";
import * as SubcategoryController from "../controllers/subcategory.controller";

import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { createSubCategorySchema } from "../schemas/subcategory.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

// router.put(
//     "/:id",
//     authenticateUser,
//     authorizeRoles("admin"),
//     SubcategoryController.updateSubCategory
// );

router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    SubcategoryController.deleteSubCategory
);

router.post(
    "/c/:cId",
    authenticateUser,
    authorizeRoles("admin"),
    upload.single("image"),
    validateRequest(createSubCategorySchema),
    SubcategoryController.createSubCategory
);

router.get("/", SubcategoryController.getAllSubCategories);
router.get("/:id", SubcategoryController.getSubCategoryById);

export default router;
