import { USER_CREATED_ROUTING_KEY, USER_EVENTS_EXCHANGE } from 'common';
import type { UserCreatedEvent, UserCreatedPayload } from 'common';

import amqplib from 'amqplib';
import type { Channel, Connection } from 'amqplib';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';


type RabbitMQConnection = Awaited<ReturnType<typeof amqplib.connect>>;


let connection: RabbitMQConnection | null = null;
let channel: Channel | null = null;

const messagingEnabled = Boolean(env.RABBITMQ_URL);

const ensureChannel = async (): Promise<Channel | null> => {
  if (!messagingEnabled || !env.RABBITMQ_URL) return null;  

  if (channel) return channel;  

  const amqpConnection = await amqplib.connect(env.RABBITMQ_URL);
  connection = amqpConnection;
  amqpConnection.on('close', () => {
    logger.warn('RabbitMQ connection closed');
    connection = null;
    channel = null;
  });

  amqpConnection.on('error', (error: unknown) => {
    logger.error({ err: error }, 'RabbitMQ connection error');
  });

  const amqpChannel = await amqpConnection.createChannel();
  channel = amqpChannel;
  await amqpChannel.assertExchange(USER_EVENTS_EXCHANGE, 'topic', { durable: true });

  return amqpChannel;
};

export const initMessaging = async () => {
  if (!messagingEnabled) {
    logger.info('RabbitMQ URL is not configured; messaging disabled');
    return;
  }

  await ensureChannel();
  logger.info('User service RabbitMQ publisher initialized');
};

export const closeMessaging = async (): Promise<void> => {
  const currentChannel = channel;
  const currentConnection = connection;

  channel = null;
  connection = null;

  try {
    await currentChannel?.close();
    await currentConnection?.close();

    logger.info("User service RabbitMQ publisher closed");
  } catch (error) {
    logger.error(
      { err: error },
      "Error closing RabbitMQ connection/channel"
    );
  }
};

export const publishUserCreatedEvent = async (payload: UserCreatedPayload) => {
  const ch = await ensureChannel();

  if (!ch) {
    logger.debug({ payload }, 'Skipping user.created event publish; messaging disabled');
    return;
  }

  const event: UserCreatedEvent = {
    type: USER_CREATED_ROUTING_KEY,
    payload,
    occurredAt: new Date().toISOString(),
    metadata: { version: 1 },
  };

  try {
    const sucess = ch.publish(
      USER_EVENTS_EXCHANGE,
      USER_CREATED_ROUTING_KEY,
      Buffer.from(JSON.stringify(event)),
      { contentType: 'application/json', persistent: true },
    );

    if (!sucess) {
      logger.warn({ event }, 'Failed to publish user.created event');
    }
  } catch (error) {
    logger.error({ err: error }, 'Error publishing user.created event');
  }
};