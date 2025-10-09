import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import subCategoryRoutes from "./routes/subCategory.routes";
import systemPreferenceRoutes from "./routes/systempreference.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import collectionRoutes from "./routes/collection.routes";
import feedRoutes from "./routes/feed.routes";

import { errorHandler, notFoundHandler } from "./middlewares/error.minddleware";
import { env } from "./config/env";
import { requestResponseLogger } from "./middlewares/requestResponseLogger.middleware";

const app = express();

app.use(
    cors({
        origin: env.FRONTEND_URLS.split(","),
        credentials: true,
    })
);

app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(errorHandler);
app.use(requestResponseLogger);

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/preferences", systemPreferenceRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
