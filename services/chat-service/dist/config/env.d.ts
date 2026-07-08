import { z } from 'common';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    CHAT_SERVICE_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    INTERNAL_API_TOKEN: z.ZodString;
    MONGO_URL: z.ZodString;
    REDIS_URL: z.ZodString;
    RABBITMQ_URL: z.ZodOptional<z.ZodString>;
    JWT_SECRET: z.ZodString;
    ALLOWED_ORIGINS: z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>;
}, z.core.$strip>;
type EnvType = z.infer<typeof envSchema>;
export declare const env: EnvType;
export type Env = typeof env;
export {};
//# sourceMappingURL=env.d.ts.map