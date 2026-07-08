import { createApp } from './app.js';
import { createServer } from 'http';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { closeMongoClient, getMongoClient } from './clients/mongo.client.js';
import { closeRedis, connectRedis } from './clients/redis.client.js';
import { startConsumers, stopConsumers } from './messaging/rabbitmq.consumer.js';
const main = async () => {
    try {
        await Promise.all([getMongoClient(), connectRedis(), startConsumers()]);
        const app = createApp();
        const server = createServer(app);
        const port = env.CHAT_SERVICE_PORT;
        server.listen(port, () => {
            logger.info({ port }, 'Chat service is running');
        });
        const shutdown = () => {
            logger.info('Shutting down chat service...');
            Promise.all([closeRedis(), closeMongoClient(), stopConsumers()])
                .catch((error) => {
                logger.error({ error }, 'Error during shutdown tasks');
            })
                .finally(() => {
                server.close(() => process.exit(0));
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (error) {
        logger.error({ error }, 'Failed to start chat service');
        process.exit(1);
    }
};
void main();
//# sourceMappingURL=index.js.map