import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../../../.env') });

import { createEnv, z } from "common";

const envSchema = z.object({
  NODE_ENV: z.enum([ "development", "production", "test" ]).default("development"),
  AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65535).default(9501),
  AUTH_DB_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d")
});

type EnvType = z.infer<typeof envSchema>

export const env: EnvType = createEnv(envSchema, { serviceName: "auth-service" });

export type Env = typeof env;