import { z } from "zod";

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

export const createEnv = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  options: EnvOptions = {}
): z.infer<TSchema> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);

  if (!parsed.success) {
    throw new Error(
      `[${serviceName}] Environment variable validation failed:\n${JSON.stringify(parsed.error)}`
    );
  }

  return parsed.data;
};

export type EnvSchema<TSchema extends z.ZodTypeAny> = TSchema;