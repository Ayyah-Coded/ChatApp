import { HttpError } from 'common';
import { conversationCache } from '../cache/conversation.cache.js';
import { conversationRepository } from '../repositories/conversation.repository.js';
export const conversationService = {
    async createConversation(input) {
        const conversation = await conversationRepository.create(input);
        await conversationCache.set(conversation);
        return conversation;
    },
    async getConversationById(id, requesterId) {
        const cached = await conversationCache.get(id);
        const conversation = cached ?? (await conversationRepository.findById(id));
        if (!conversation) {
            throw new HttpError(404, 'Conversation not found');
        }
        if (requesterId && !conversation.participantIds.includes(requesterId)) {
            throw new HttpError(403, 'Requester is not part of this conversation');
        }
        if (!cached) {
            await conversationCache.set(conversation);
        }
        return conversation;
    },
    async listConversation(filter) {
        return conversationRepository.findSummaries(filter);
    },
    async touchConversation(conversationId, preview) {
        await conversationRepository.touchConversation(conversationId, preview);
        await conversationCache.delete(conversationId);
    },
};
//# sourceMappingURL=conversation.service.js.map