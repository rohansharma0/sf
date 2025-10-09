import express from "express";
import * as UserController from "../controllers/user.controller";
import * as AddressController from "../controllers/address.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
    createAddressSchema,
    updateAddressSchema,
} from "../schemas/address.schema";

const router = express.Router();

router.put("/", authenticateUser, UserController.updateUser);
router.post("/password", authenticateUser, UserController.changePassword);
router.get("/", authenticateUser, UserController.getUserById);

router.get("/wishlist", authenticateUser, UserController.getWishlist);
router.post("/wishlist", authenticateUser, UserController.toggleWishlist);

router.post(
    "/address",
    authenticateUser,
    validateRequest(createAddressSchema),
    AddressController.createAddress
);
router.get("/address", authenticateUser, AddressController.getUserAddresses);
router.get(
    "/address/:id",
    authenticateUser,
    AddressController.getUserAddressById
);
router.put(
    "/address/:id",
    authenticateUser,
    validateRequest(updateAddressSchema),
    AddressController.updateAddress
);
router.delete(
    "/address/:id",
    authenticateUser,
    AddressController.deleteAddress
);

export default router;
