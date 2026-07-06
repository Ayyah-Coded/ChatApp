// packages/common/src/load-env.ts

import dotenv from "dotenv";
import path from "node:path";

export function loadEnv(service: string) {
  dotenv.config({
    path: path.resolve(process.cwd(), `services/${service}/.env`),
  });
}