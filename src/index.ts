import app from "./app";
import { connectDB } from "./config/db";
import { createServer } from "http";
import { logger } from "./utils/logger";
import { env } from "./config/env";

const server = createServer(app);

connectDB().then(() => {
    server.listen(env.PORT, () => {
        logger.debug(`Server running on PORT :${env.PORT}`);
    });
});
