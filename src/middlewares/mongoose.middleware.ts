import { Document, Query, Schema } from "mongoose";
import { logger } from "../utils/logger";

export const mongoosePlugin = (schema: Schema) => {
    // Pre hooks for queries
    schema.pre<Query<any, any>>(/^find/, function (next) {
        const query = this.getQuery();
        logger.debug("MongoDB Query", {
            query,
            collection: this.model.collection.name,
        });
        next();
    });

    schema.pre<Document>("save", function (next) {
        logger.debug("MongoDB Save", {
            document: this.toObject(),
            collection: this.collection.name,
        });
        next();
    });

    schema.pre<Query<any, any>>(/^update|findOneAndUpdate/, function (next) {
        logger.debug("MongoDB Update Query", {
            query: this.getQuery(),
            update: this.getUpdate(),
        });
        next();
    });

    // Post hooks for query results
    schema.post<Query<any, any>>(/^find/, function (result) {
        logger.debug("MongoDB Result", {
            result,
            collection: this.model.collection.name,
        });
    });

    schema.post<Document>("save", function (doc) {
        logger.debug("MongoDB Saved", {
            doc,
            collection: this.collection.name,
        });
    });

    schema.post<Query<any, any>>(/^update|findOneAndUpdate/, function (res) {
        logger.debug("MongoDB Update Result", {
            res,
            collection: this.model.collection.name,
        });
    });
};
