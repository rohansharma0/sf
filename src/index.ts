import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { createServer } from "http";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

connectDB().then(() => {
    server.listen(PORT, () => {
        logger.debug(`Server running on PORT :${PORT}`);
    });
});
