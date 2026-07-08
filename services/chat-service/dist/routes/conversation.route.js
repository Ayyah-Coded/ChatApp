import { Router } from 'express';
import { validateRequest } from 'common';
import { attachAuthenticatedUser } from '../middleware/authenticated-user.js';
import { createConversationHandler, createMessageHandler, getConversationHandler, listConversationHandler, listMessageHandler } from '../controllers/conversation.controller.js';
import { createConversationSchema, listConversationsQuerySchema } from '../validation/conversation.schema.js';
import { createMessageBodySchema, listMessagesQuerySchema } from '../validation/message.schema.js';
import { conversationIdParamsSchema } from '../validation/shared.schema.js';
export const conversationRouter = Router();
conversationRouter.use(attachAuthenticatedUser);
conversationRouter.post('/', validateRequest({ body: createConversationSchema }), createConversationHandler);
conversationRouter.get('/', validateRequest({ query: listConversationsQuerySchema }), listConversationHandler);
conversationRouter.get('/:id', validateRequest({ params: conversationIdParamsSchema }), getConversationHandler);
conversationRouter.post('/:id/messages', validateRequest({
    params: conversationIdParamsSchema, body: createMessageBodySchema
}), createMessageHandler);
conversationRouter.get('/:id/messages', validateRequest({
    params: conversationIdParamsSchema, query: listMessagesQuerySchema
}), listMessageHandler);
//# sourceMappingURL=conversation.route.js.map