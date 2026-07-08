import { randomUUID } from 'node:crypto';
import { getMongoClient } from '../clients/mongo.client.js';
const MESSAGES_COLLECTION = 'messages';
const toMessage = (doc) => ({
    id: String(doc._id),
    conversationId: String(doc.conversationId),
    senderId: String(doc.senderId),
    body: String(doc.body),
    createdAt: new Date(doc.createdAt),
    reactions: Array.isArray(doc.reactions)
        ? doc.reactions.map((r) => ({
            emoji: String(r.emoji),
            userId: String(r.userId),
            createdAt: new Date(r.createdAt),
        }))
        : [],
});
export const messageRepository = {
    async create(conversationId, senderId, body) {
        const client = await getMongoClient();
        const db = client.db();
        const collection = db.collection(MESSAGES_COLLECTION);
        const now = new Date();
        const document = {
            _id: randomUUID(),
            conversationId,
            senderId,
            body,
            createdAt: now,
        };
        await collection.insertOne(document);
        return toMessage(document);
    },
    async findByConversation(conversationId, options = {}) {
        const client = await getMongoClient();
        const db = client.db();
        const query = {
            conversationId,
        };
        if (options.after) {
            query.createdAt = { $gt: new Date(options.after) };
        }
        const cursor = db
            .collection(MESSAGES_COLLECTION)
            .find(query)
            .sort({ createdAt: -1 })
            .limit(options.limit ?? 50);
        const messages = await cursor.toArray();
        return messages.map((doc) => toMessage(doc));
    },
    async findById(messageId) {
        const client = await getMongoClient();
        const db = client.db();
        const doc = await db
            .collection(MESSAGES_COLLECTION)
            .findOne({ _id: messageId });
        return doc ? toMessage(doc) : null;
    },
};
//# sourceMappingURL=message.repository.js.map