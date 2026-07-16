import dotenv from "dotenv";
import { join } from "node:path";
let loaded = false;
export function loadEnv() {
    if (loaded)
        return;
    const envPath = join(process.cwd(), ".env");
    dotenv.config({
        path: envPath,
        override: true,
    });
    loaded = true;
}
//# sourceMappingURL=load-env.js.map