import type { Conversation } from '@/types/conversation';

import { getRedisClient } from '@/clients/redis.client';

const CACHE_PREFIX = 'conversation:';
const CACHE_TTL_SECONDS = 60;

const serialize = (conversation: Conversation): string => {
  return JSON.stringify({
    ...conversation,
    createdAt: conversation.createdAt.toISOString(),
    updatedAt: conversation.updatedAt.toISOString(),
  });
};

const deserialize = (raw: string): Conversation => {
  const parsed = JSON.parse(raw) as Conversation & {
    createdAt: string;
    updatedAt: string;
  };
  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt),
    updatedAt: new Date(parsed.updatedAt),
    lastMessageAt: parsed.lastMessageAt ? new Date(parsed.lastMessageAt as unknown as string) : null,
  };
};
export const conversationCache = {
  async get(conversationId: string): Promise<Conversation | null> {
    try {
      const redis = getRedisClient();
      const payload = await redis.get(`${CACHE_PREFIX}${conversationId}`);
      return payload ? deserialize(payload) : null;
    } catch {
      return null;
    }
  },

  async set(conversation: Conversation): Promise<void> {
    try {
      const redis = getRedisClient();
      await redis.setex(
        `${CACHE_PREFIX}${conversation.id}`,
        CACHE_TTL_SECONDS,
        serialize(conversation),
      );
    } catch {
      // Ignore Redis cache write failures and fall back to the repository path.
    }
  },

  async delete(conversationId: string): Promise<void> {
    try {
      const redis = getRedisClient();
      await redis.del(`${CACHE_PREFIX}${conversationId}`);
    } catch {
      // Ignore Redis cache deletion failures.
    }
  },
};