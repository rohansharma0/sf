import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
    createCategorySchema,
    updateCategorySchema,
} from "../schemas/category.schema";
import upload from "../middlewares/upload.middleware";

const router = Router();

// router.put(
//     "/:id",
//     validateRequest(updateCategorySchema),
//     authenticateUser,
//     authorizeRoles("admin"),
//     categoryController.updateCategory
// );
router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    categoryController.deleteCategory
);

router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    upload.single("image"),
    validateRequest(createCategorySchema),
    categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;
