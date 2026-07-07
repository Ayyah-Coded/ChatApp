import { loadEnv } from "common";
loadEnv();

import { createEnv, z } from 'common';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CHAT_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(9504),
  INTERNAL_API_TOKEN: z.string().min(32),
  MONGO_URL:z.string(),
  REDIS_URL:z.string(),
  RABBITMQ_URL:z.string().optional(),
  JWT_SECRET: z.string().min(32),
  ALLOWED_ORIGINS: z
    .string()
    .transform(value =>
      value
        .split(",")
        .map(origin => origin.trim())
        .filter(Boolean)
    )
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, { serviceName: 'chat-service' });

export type Env = typeof env;