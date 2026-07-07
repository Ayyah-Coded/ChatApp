import { loadEnv } from "common";
console.log("cwd =", process.cwd());
loadEnv();

import { createEnv, z } from 'common';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  USER_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(9503),
  USER_DB_URL: z.string(),
  RABBITMQ_URL: z.string().optional(),
  INTERNAL_API_TOKEN: z.string().min(32)
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, { serviceName: 'user-service' });

export type Env = typeof env;