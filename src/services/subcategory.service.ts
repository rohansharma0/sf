import slugify from "slugify";
import { ISubCategory, SubCategory } from "../models/subCategory.model";
import { Category, ICategory } from "../models/category.model";

interface SubCategoryQueryParams {
    page: number;
    limit: number;
    search: string;
}
export const createSubCategory = async (
    data: {
        title: string;
        description?: string;
        isBanner?: boolean;
    },
    cId: string,
    image: string | null,
    imagePublicId: string | null
) => {
    const category: ICategory | null = await Category.findById(cId);

    if (!category) {
        throw new Error("Category not found");
    }

    const subCategory: ISubCategory = new SubCategory({
        title: data.title,
        description: data.description,
        image,
        isBanner: data.isBanner ?? false,
        imagePublicId,
        slug: slugify(data.title, { lower: true }),
        parentCategoryId: category._id,
    });

    await subCategory.save();

    if (category.subCategories) {
        category.subCategories.push(subCategory._id as any);
        await category.save();
    }

    return subCategory;
};

export const getAllSubCategories = async ({
    page,
    limit,
    search,
}: SubCategoryQueryParams) => {
    const filter: any = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const total = await SubCategory.countDocuments(filter);
    const subcategories = await SubCategory.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        subcategories,
    };
};
export const getSubCategoryById = async (id: string) => {
    return await SubCategory.findById(id).populate("products");
};

export const updateSubCategoryById = async (id: string, data: any) => {
    if (data.title && !data.slug) {
        data.slug = slugify(data.title, { lower: true });
    }
    return SubCategory.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSubCategoryById = async (id: string) => {
    return await SubCategory.findByIdAndDelete(id);
};
