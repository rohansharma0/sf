import { Router } from "express";
import * as CategoryController from "../controllers/category.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
    createCategorySchema,
    updateCategorySchema,
} from "../schemas/category.schema";

const router = Router();

// Admin routes
router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(createCategorySchema),
    CategoryController.createCategory
);
router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(updateCategorySchema),
    CategoryController.updateCategory
);
router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    CategoryController.deleteCategory
);

// Public routes
router.get("/", CategoryController.getAllCategories);
router.get("/:id/products", CategoryController.getCategoryProducts);

export default router;
