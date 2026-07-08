import type { Message, MessageListOptions } from '../types/message.js';
export declare const messageRepository: {
    create(conversationId: string, senderId: string, body: string): Promise<Message>;
    findByConversation(conversationId: string, options?: MessageListOptions): Promise<Message[]>;
    findById(messageId: string): Promise<Message | null>;
};
//# sourceMappingURL=message.repository.d.ts.map