import type { Conversation } from '../types/conversation.js';
export declare const conversationCache: {
    get(conversationId: string): Promise<Conversation | null>;
    set(conversation: Conversation): Promise<void>;
    delete(conversationId: string): Promise<void>;
};
//# sourceMappingURL=conversation.cache.d.ts.map