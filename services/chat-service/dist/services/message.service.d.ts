import type { Message, MessageListOptions } from '../types/message.js';
export declare const messageService: {
    createMessage(conversationId: string, senderId: string, body: string): Promise<Message>;
    listMessages(conversationId: string, requesterId: string, options?: MessageListOptions): Promise<Message[]>;
};
//# sourceMappingURL=message.service.d.ts.map