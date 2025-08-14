import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import subCategoryRoutes from "./routes/subcategory.routes";
import addressRoutes from "./routes/address.routes";
import systemPreferenceRoutes from "./routes/systempreference.routes";
import cartRoutes from "./routes/cart.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URLS?.split(","),
    })
);

app.use(express.json());
app.use(errorHandler);
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/system-preferences", systemPreferenceRoutes);
app.use("/api/cart", cartRoutes);

export default app;
