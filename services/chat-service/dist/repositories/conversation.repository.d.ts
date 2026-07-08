import type { Conversation, ConversationFilter, ConversationSummary, CreateConversationInput } from '../types/conversation.js';
export declare const conversationRepository: {
    create(input: CreateConversationInput): Promise<Conversation>;
    findById(id: string): Promise<Conversation | null>;
    findSummaries(filter: ConversationFilter): Promise<ConversationSummary[]>;
    touchConversation(conversationId: string, preview: string): Promise<void>;
    removeAll(): Promise<void>;
};
//# sourceMappingURL=conversation.repository.d.ts.map