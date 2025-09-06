import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        logger.debug("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
