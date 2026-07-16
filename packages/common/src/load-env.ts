import dotenv from "dotenv";
import { join } from "node:path";

let loaded = false;

export function loadEnv (): void {
   if (loaded) return;

  const envPath = join(process.cwd(), ".env");

  dotenv.config({
    path: envPath,
    override: true,
  });

  loaded = true;
}