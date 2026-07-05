import { z, type ZodTypeAny } from "zod";

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

export const createEnv = <TSchema extends ZodTypeAny>(
  schema: TSchema,
  options: EnvOptions = {}
): z.infer<TSchema> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);

  if (!parsed.success) {
    const formatedErrors = parsed.error.format();
    throw new Error(
      `[${serviceName}] Environment variable validation failed: ${JSON.stringify(formatedErrors)}`
    );
  }

  return parsed.data;
};

export type EnvSchema<TShape extends ZodTypeAny> = TShape;