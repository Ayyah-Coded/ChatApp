import type { Conversation, ConversationFilter, ConversationSummary, CreateConversationInput } from '../types/conversation.js';
export declare const conversationService: {
    createConversation(input: CreateConversationInput): Promise<Conversation>;
    getConversationById(id: string, requesterId?: string): Promise<Conversation>;
    listConversation(filter: ConversationFilter): Promise<ConversationSummary[]>;
    touchConversation(conversationId: string, preview: string): Promise<void>;
};
//# sourceMappingURL=conversation.service.d.ts.map