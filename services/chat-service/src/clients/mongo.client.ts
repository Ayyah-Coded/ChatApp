import { MongoClient } from 'mongodb';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';

let clientPromise: Promise<MongoClient> | null = null;

export const getMongoClient = async (): Promise<MongoClient> => {
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