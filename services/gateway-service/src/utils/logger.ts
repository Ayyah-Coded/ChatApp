import { createLogger } from "common";
import type { Logger } from "common";

export const logger: Logger = createLogger({ name: "gateway-service" });