import { z, type ZodTypeAny } from "zod";
interface EnvOptions {
    source?: NodeJS.ProcessEnv;
    serviceName?: string;
}
export declare const createEnv: <TSchema extends ZodTypeAny>(schema: TSchema, options?: EnvOptions) => z.infer<TSchema>;
export type EnvSchema<TShape extends ZodTypeAny> = TShape;
export {};
//# sourceMappingURL=env.d.ts.map