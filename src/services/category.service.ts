import { Category } from "../models/category.model";

export const createCategory = async (data: any) => {
    return await Category.create(data);
};
export const getAllCategories = async () => {
    return await Category.find({}, "_id title slug subCategories")
        .populate({
            path: "subCategories",
            select: "_id title slug image",
            options: { lean: true },
        })
        .lean();
};

export const getCategoryById = async (id: string) => {
    return await Category.findById(id).populate("products");
};

export const updateCategoryById = async (id: string, data: any) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategoryById = async (id: string) => {
    return await Category.findByIdAndDelete(id);
};
