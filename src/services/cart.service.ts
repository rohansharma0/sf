import mongoose, { Types } from "mongoose";
import Cart from "../models/cart.model";
import { Product } from "../models/product.model";

export const getCart = async (id: Types.ObjectId) => {
    let cart = await Cart.findOne({ user: id });
    if (!cart) {
        cart = new Cart({
            user: id,
            items: [],
        });

        await cart.save();
    }
    return await cart.populate("items.product");
};

export const addToCart = async (
    productId: string,
    quantity: number,
    userId: Types.ObjectId
) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    if (product?.stock < quantity) {
        throw new Error("Not enough stock");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [{ product: productId, quantity }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            (i) => i.product.toString() === productId
        );
        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity + quantity > product.stock) {
                throw new Error("Not enough stock");
            }
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: new mongoose.Types.ObjectId(productId),
                quantity,
            });
        }
    }

    await cart.save();
    return cart;
};

// export const updateCartQuantity = async (req: Request, res: Response) => {
//     const { productId, quantity } = req.body;
//     const product = await Product.findById(productId);

//     if (!product) return res.status(404).json({ message: "Product not found" });
//     if (quantity > product.stock) {
//         return res.status(400).json({ message: "Exceeds available stock" });
//     }

//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const itemIndex = cart.items.findIndex(
//         (i) => i.product.toString() === productId
//     );
//     if (itemIndex > -1) {
//         if (quantity <= 0) {
//             cart.items.splice(itemIndex, 1);
//         } else {
//             cart.items[itemIndex].quantity = quantity;
//         }
//         await cart.save();
//         return res.json(await cart.populate("items.product"));
//     }

//     res.status(404).json({ message: "Item not in cart" });
// };

export const removeProductFromCart = async (
    productId: string,
    userId: Types.ObjectId
) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();
    return cart;
};
