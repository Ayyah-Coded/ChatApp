import { z } from 'common';
export declare const createConversationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    participantIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const listConversationsQuerySchema: z.ZodObject<{
    participantId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=conversation.schema.d.ts.map