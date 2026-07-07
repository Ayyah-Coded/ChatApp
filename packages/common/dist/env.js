export const createEnv = (schema, options = {}) => {
    const { source = process.env, serviceName = "service" } = options;
    const parsed = schema.safeParse(source);
    if (!parsed.success) {
        throw new Error(`[${serviceName}] Environment variable validation failed:\n${JSON.stringify(parsed.error)}`);
    }
    return parsed.data;
};
//# sourceMappingURL=env.js.map