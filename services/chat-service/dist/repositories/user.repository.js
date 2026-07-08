import { getMongoClient } from '../clients/mongo.client.js';
const COLLECTION_NAME = 'users';
const getCollection = async () => {
    const client = await getMongoClient();
    return client.db().collection(COLLECTION_NAME);
};
export const userRepository = {
    async upsertUser(payload) {
        const collection = await getCollection();
        await collection.updateOne({ _id: payload.id }, {
            $set: {
                _id: payload.id,
                email: payload.email,
                displayName: payload.displayName,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt,
            },
        }, { upsert: true });
    },
    async findUserById(id) {
        const collection = await getCollection();
        return collection.findOne({ _id: id });
    },
};
//# sourceMappingURL=user.repository.js.map