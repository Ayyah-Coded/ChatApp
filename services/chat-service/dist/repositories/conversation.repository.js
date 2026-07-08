import { randomUUID } from 'node:crypto';
import { getMongoClient } from '../clients/mongo.client.js';
const CONVERSATIONS_COLLECTION = 'conversations';
const MESSAGES_COLLECTION = 'messages';
const isRemoveAllAllowed = () => {
    const explicitOverride = process.env.ALLOW_CONVERSATION_WIPE === 'true';
    return process.env.NODE_ENV === 'test' || explicitOverride;
};
const toConversation = (doc) => ({
    id: String(doc._id),
    title: typeof doc.title === 'string' ? doc.title : null,
    participantIds: Array.isArray(doc.participantIds) ? doc.participantIds : [],
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
    lastMessageAt: doc.lastMessageAt ? new Date(doc.lastMessageAt) : null,
    lastMessagePreview: typeof doc.lastMessagePreview === 'string' ? doc.lastMessagePreview : null,
});
const toConversationSummary = (doc) => toConversation(doc);
export const conversationRepository = {
    async create(input) {
        const client = await getMongoClient();
        const db = client.db();
        const collection = db.collection(CONVERSATIONS_COLLECTION);
        const now = new Date();
        const document = {
            _id: randomUUID(),
            title: input.title ?? null,
            participantIds: input.participantIds,
            createdAt: now,
            updatedAt: now,
            lastMessageAt: null,
            lastMessagePreview: null,
        };
        await collection.insertOne(document);
        return toConversation(document);
    },
    async findById(id) {
        const client = await getMongoClient();
        const db = client.db();
        const doc = await db
            .collection(CONVERSATIONS_COLLECTION)
            .findOne({ _id: id });
        return doc ? toConversation(doc) : null;
    },
    async findSummaries(filter) {
        const client = await getMongoClient();
        const db = client.db();
        if (!filter.participantId) {
            return [];
        }
        const cursor = db
            .collection(CONVERSATIONS_COLLECTION)
            .find({ participantIds: filter.participantId })
            .sort({ lastMessageAt: -1, updatedAt: -1 });
        const results = await cursor.toArray();
        return results.map((doc) => toConversationSummary(doc));
    },
    async touchConversation(conversationId, preview) {
        const client = await getMongoClient();
        const db = client.db();
        await db.collection(CONVERSATIONS_COLLECTION).updateOne({ _id: conversationId }, {
            $set: {
                lastMessageAt: new Date(),
                lastMessagePreview: preview,
                updatedAt: new Date(),
            },
        });
    },
    async removeAll() {
        if (!isRemoveAllAllowed()) {
            throw new Error('ConversationRepository.removeAll is disabled outside a test-safe context. Set NODE_ENV=test or ALLOW_CONVERSATION_WIPE=true to enable it.');
        }
        const client = await getMongoClient();
        const db = client.db();
        await Promise.all([
            db.collection(CONVERSATIONS_COLLECTION).deleteMany({}),
            db.collection(MESSAGES_COLLECTION).deleteMany({}),
        ]);
    },
};
//# sourceMappingURL=conversation.repository.js.map