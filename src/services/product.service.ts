import SubCategory, { ISubCategory } from "../models/subcategory.model";
import Category, { ICategory } from "../models/category.model";
import Product, { IProduct } from "../models/product.model";

interface ProductQueryParams {
    page: number;
    limit: number;
    search: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export const createProduct = async (data: any, cId: string, sId: string) => {
    const category: ICategory | null = await Category.findById(cId);

    if (!category) {
        throw new Error("Category not found");
    }

    const subCategory: ISubCategory | null = await SubCategory.findById(sId);

    if (!subCategory) {
        throw new Error("SubCategory not found");
    }

    const product = new Product(data);

    await product.save();

    category.products.push(product._id);
    await category.save();

    subCategory.products.push(product._id);
    await subCategory.save();

    return product;
};

export const getAllProducts = async ({
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
}: ProductQueryParams) => {
    const filter: any = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
        filter.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        products,
    };
};

export const getProductById = async (id: string) => {
    return await Product.findById(id);
};

export const getProducts = async (ids: string[]) => {
    return await Product.find({ _id: { $in: ids } }).exec();
};

export const updateProductById = async (id: string, data: any) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductById = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};

export const checkStock = async (productId: string, stock: number) => {
    const product: IProduct | null = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return stock <= product.stock;
};
