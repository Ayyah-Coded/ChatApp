import { Router } from 'express';
import { validateRequest } from 'common';


import { attachAuthenticatedUser } from '@/middleware/authenticated-user';

import { createConversationHandler, createMessageHandler, getConversationHandler,
  listConversationHandler, listMessageHandler } from '@/controllers/conversation.controller';

import { createConversationSchema, listConversationsQuerySchema } from '@/validation/conversation.schema';
import { createMessageBodySchema, listMessagesQuerySchema } from '@/validation/message.schema';
import { conversationIdParamsSchema } from '@/validation/shared.schema';



export const conversationRouter: Router = Router();

conversationRouter.use(attachAuthenticatedUser);

conversationRouter.post('/', validateRequest({ body: createConversationSchema }), createConversationHandler );

conversationRouter.get('/', validateRequest({ query: listConversationsQuerySchema }), listConversationHandler );

conversationRouter.get('/:id', validateRequest({ params: conversationIdParamsSchema }), getConversationHandler );

conversationRouter.post('/:id/messages', validateRequest({ 
  params: conversationIdParamsSchema, body: createMessageBodySchema 
  }), createMessageHandler );

conversationRouter.get('/:id/messages', validateRequest({ 
  params: conversationIdParamsSchema, query: listMessagesQuerySchema 
  }), listMessageHandler );