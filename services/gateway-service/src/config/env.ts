import { loadEnv } from "common";

loadEnv();

import { createEnv, z } from 'common';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GATEWAY_PORT: z.coerce.number().int().min(0).max(65_535).default(9502),
  AUTH_SERVICE_URL: z.string(),
  USER_SERVICE_URL: z.string(),
  RABBITMQ_URL: z.string().optional(),
  INTERNAL_API_TOKEN: z.string().min(32),
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

export const env: EnvType = createEnv(envSchema, {
  serviceName: 'gateway-service',
});

export type Env = typeof env;