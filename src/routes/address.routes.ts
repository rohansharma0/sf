import { Router } from "express";
import * as addressController from "../controllers/address.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
    createAddressSchema,
    updateAddressSchema,
} from "../schemas/address.schema";

const router = Router();

router.post(
    "/",
    authenticateUser,
    validateRequest(createAddressSchema),
    addressController.createAddress
);
router.get("/", authenticateUser, addressController.getUserAddresses);
router.put(
    "/:id",
    authenticateUser,
    validateRequest(updateAddressSchema),
    addressController.updateAddress
);
router.delete("/:id", authenticateUser, addressController.deleteAddress);

export default router;
