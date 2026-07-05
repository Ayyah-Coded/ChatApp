import "dotenv/config";

import { createEnv, z } from "common";

const envSchema = z.object({
  NODE_ENV: z.enum([ "development", "production", "test" ]).default("development"),
  AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65535).default(9501)
});

type EnvType = z.infer<typeof envSchema>

export const env: EnvType = createEnv(envSchema, { serviceName: "auth-service" });

export type Env = typeof env;