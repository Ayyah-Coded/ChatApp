import { getRedisClient } from '../clients/redis.client.js';
const CACHE_PREFIX = 'conversation:';
const CACHE_TTL_SECONDS = 60;
const serialize = (conversation) => {
    return JSON.stringify({
        ...conversation,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
    });
};
const deserialize = (raw) => {
    const parsed = JSON.parse(raw);
    return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
        lastMessageAt: parsed.lastMessageAt ? new Date(parsed.lastMessageAt) : null,
    };
};
export const conversationCache = {
    async get(conversationId) {
        try {
            const redis = getRedisClient();
            const payload = await redis.get(`${CACHE_PREFIX}${conversationId}`);
            return payload ? deserialize(payload) : null;
        }
        catch {
            return null;
        }
    },
    async set(conversation) {
        try {
            const redis = getRedisClient();
            await redis.setex(`${CACHE_PREFIX}${conversation.id}`, CACHE_TTL_SECONDS, serialize(conversation));
        }
        catch {
            // Ignore Redis cache write failures and fall back to the repository path.
        }
    },
    async delete(conversationId) {
        try {
            const redis = getRedisClient();
            await redis.del(`${CACHE_PREFIX}${conversationId}`);
        }
        catch {
            // Ignore Redis cache deletion failures.
        }
    },
};
//# sourceMappingURL=conversation.cache.js.map