import { z } from "zod";
interface EnvOptions {
    source?: NodeJS.ProcessEnv;
    serviceName?: string;
}
export declare const createEnv: <TSchema extends z.ZodTypeAny>(schema: TSchema, options?: EnvOptions) => z.infer<TSchema>;
export type EnvSchema<TSchema extends z.ZodTypeAny> = TSchema;
export {};
//# sourceMappingURL=env.d.ts.map