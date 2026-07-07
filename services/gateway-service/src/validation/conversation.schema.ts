import { z } from 'common';

export const createConversationBodySchema = z.object({
  title: z.string().min(1).max(200).optional(),
  participantIds: z.array(z.string()).min(1),
});

export const listConversationsQuerySchema = z.object({
  participantId: z.string().optional(),
});

export const conversationIdParamsSchema = z.object({
  id: z.string(),
});