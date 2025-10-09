import { Router } from "express";
import * as ProductController from "../controllers/product.controller";
import {
    authenticateUser,
    authorizeRoles,
} from "../middlewares/auth.middleware";
import {
    createProductSchema,
    updateProductSchema,
} from "../schemas/product.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
    "/c/:cId/s/:sId",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(createProductSchema),
    ProductController.createProduct
);

router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    validateRequest(updateProductSchema),
    ProductController.updateProduct
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    ProductController.deleteProduct
);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

router.post("/stock", authenticateUser, ProductController.checkStock);

export default router;
