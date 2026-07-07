import { z } from 'common';


export const createMessageBodySchema = z.object({
  body: z.string().min(1).max(2000),
});

export const createMessageSchema = createMessageBodySchema.extend({
  conversationId: z.string(),
});

export const listMessagesQuerySchema = z.object({
  limit: z
    .preprocess(
      (value) => (value === undefined ? undefined : Number(value)),
      z.number().int().min(1).max(200),
    )
    .optional(),
  after: z.string().optional(),
});