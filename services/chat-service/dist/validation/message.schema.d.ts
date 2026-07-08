import { z } from 'common';
export declare const createMessageBodySchema: z.ZodObject<{
    body: z.ZodString;
}, z.core.$strip>;
export declare const createMessageSchema: z.ZodObject<{
    body: z.ZodString;
    conversationId: z.ZodString;
}, z.core.$strip>;
export declare const listMessagesQuerySchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodNumber>>;
    after: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
}, z.core.$strip>;
//# sourceMappingURL=message.schema.d.ts.map