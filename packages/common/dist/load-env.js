import dotenv from "dotenv";
import { join } from "node:path";
let loaded = false;
export function loadEnv() {
    if (loaded)
        return;
    const envPath = join(process.cwd(), ".env");
    const result = dotenv.config({
        path: envPath,
        override: true,
    });
    if (result.error) {
        throw new Error(`Unable to load .env file: ${envPath}`);
    }
    loaded = true;
}
//# sourceMappingURL=load-env.js.map