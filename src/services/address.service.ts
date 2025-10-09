import { Address, IAddress } from "../models/address.model";
import { Types } from "mongoose";

export const createAddress = async (
    userId: Types.ObjectId,
    data: Partial<IAddress>
) => {
    if (data.isPrimary) {
        await Address.updateMany(
            { user: userId },
            { $set: { isPrimary: false } }
        );
    }
    return await Address.create({ ...data, user: userId });
};

export const getUserAddresses = async (userId: Types.ObjectId) => {
    return await Address.find({ user: userId });
};

export const getUserAddressById = async (
    userId: Types.ObjectId,
    addressId: string
) => {
    return await Address.findOne({ _id: addressId, user: userId });
};

export const updateAddress = async (
    userId: Types.ObjectId,
    addressId: string,
    data: Partial<IAddress>
) => {
    if (data.isPrimary) {
        await Address.updateMany(
            { user: userId },
            { $set: { isPrimary: false } }
        );
    }
    return await Address.findOneAndUpdate(
        { _id: addressId, user: userId },
        { $set: data },
        { new: true }
    );
};

export const deleteAddress = async (
    userId: Types.ObjectId,
    addressId: string
) => {
    return await Address.findOneAndDelete({ _id: addressId, user: userId });
};
