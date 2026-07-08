import { MongoClient } from 'mongodb';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
let clientPromise = null;
export const getMongoClient = async () => {
    if (!clientPromise) {
        const newClient = new MongoClient(env.MONGO_URL);
        clientPromise = newClient
            .connect()
            .then(() => {
            logger.info('MongoDB connection established');
            return newClient;
        })
            .catch((error) => {
            clientPromise = null;
            throw error;
        });
    }
    return clientPromise;
};
export const closeMongoClient = async () => {
    if (!clientPromise) {
        return;
    }
    const mongoClient = await clientPromise;
    await mongoClient.close();
    logger.info('MongoDB connection closed');
    clientPromise = null;
};
//# sourceMappingURL=mongo.client.js.map