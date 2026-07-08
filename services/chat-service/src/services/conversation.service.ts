import { HttpError } from 'common';

import type { Conversation, ConversationFilter, ConversationSummary, CreateConversationInput,
} from '@/types/conversation';

import { conversationCache } from '@/cache/conversation.cache';
import { conversationRepository } from '@/repositories/conversation.repository';


export const conversationService = {
  async createConversation(input: CreateConversationInput): Promise<Conversation> {
    const conversation = await conversationRepository.create(input);
    await conversationCache.set(conversation);
    return conversation;
  },

  async getConversationById(id: string, requesterId?: string): Promise<Conversation> {
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
  async listConversation(filter: ConversationFilter): Promise<ConversationSummary[]> {
    return conversationRepository.findSummaries(filter);
  },

  async touchConversation(conversationId: string, preview: string): Promise<void> {
    await conversationRepository.touchConversation(conversationId, preview);
    await conversationCache.delete(conversationId);
  },
};