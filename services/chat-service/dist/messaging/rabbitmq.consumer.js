import { env } from '../config/env.js';
import { userRepository } from '../repositories/user.repository.js';
import { logger } from '../utils/logger.js';
import { USER_CREATED_ROUTING_KEY, USER_EVENTS_EXCHANGE, } from 'common';
import { connect } from 'amqplib';
let connection = null;
let channel = null;
let consumerTag = null;
const EVENT_QUEUE = 'chat-service.user-events';
const closeAmqpConnection = async (conn) => {
    await conn.close();
};
const handleUserCreated = async (event) => {
    await userRepository.upsertUser(event.payload);
};
export const startConsumers = async () => {
    if (!env.RABBITMQ_URL) {
        logger.info('RabbitMQ URL not configured; consumers disabled');
        return;
    }
    const conn = await connect(env.RABBITMQ_URL);
    connection = conn;
    conn.on('error', (err) => logger.error({ err }, 'RabbitMQ connection error'));
    conn.on('close', () => logger.error('RabbitMQ connection closed unexpectedly'));
    const ch = await conn.createChannel();
    channel = ch;
    ch.on('error', (err) => logger.error({ err }, 'RabbitMQ channel error'));
    await ch.assertExchange(USER_EVENTS_EXCHANGE, 'topic', { durable: true });
    const queue = await ch.assertQueue(EVENT_QUEUE, { durable: true });
    await ch.bindQueue(queue.queue, USER_EVENTS_EXCHANGE, USER_CREATED_ROUTING_KEY);
    const consumeHandler = (message) => {
        if (!message) {
            return;
        }
        void (async () => {
            const payload = message.content.toString('utf-8');
            const event = JSON.parse(payload);
            await handleUserCreated(event);
            ch.ack(message);
        })().catch((error) => {
            logger.error({ err: error }, 'Failed to process event');
            ch.nack(message, false, true);
        });
    };
    const result = await ch.consume(queue.queue, consumeHandler);
    consumerTag = result.consumerTag;
    logger.info('RabbitMQ consumer started');
};
export const stopConsumers = async () => {
    try {
        const ch = channel;
        if (ch && consumerTag) {
            await ch.cancel(consumerTag);
            consumerTag = null;
        }
        if (ch) {
            await ch.close();
            channel = null;
        }
        const conn = connection;
        if (conn) {
            await closeAmqpConnection(conn);
            connection = null;
        }
    }
    catch (error) {
        logger.error({ err: error }, 'Error stopping RabbitMQ consumer');
    }
};
//# sourceMappingURL=rabbitmq.consumer.js.map