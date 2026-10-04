import { z } from 'zod';

const envSchema = z.object({
    AI_PROVIDER: z
        .enum(['openai-compatible', 'google-gemini'])
        .default('google-gemini'),
    AI_API_KEY: z
        .string()
        .trim()
        .default(() => process.env.GEMINI_API_KEY ?? process.env.AI_API_KEY ?? ''),
    AI_API_URL: z
        .string()
        .url('AI_API_URL must be a valid URL.')
        .default('https://generativelanguage.googleapis.com/v1beta/openai'),
    AI_MODEL: z
        .string()
        .trim()
        .default('gemini-3.8-flash'),
    AI_EMBEDDING_MODEL: z
        .string()
        .trim()
        .default('text-embedding-004'),
});

export type AIEnvironment = z.infer<typeof envSchema>;

export function getAIEnvironment(): AIEnvironment {
    const rawApiKey =
        process.env.AI_API_KEY || process.env.GEMINI_API_KEY || '';

    const result = envSchema.safeParse({
        AI_PROVIDER: process.env.AI_PROVIDER || 'google-gemini',
        AI_API_KEY: rawApiKey,
        AI_API_URL:
            process.env.AI_API_URL ||
            'https://generativelanguage.googleapis.com/v1beta/openai',
        AI_MODEL: process.env.AI_MODEL || 'gemini-3.8-flash',
        AI_EMBEDDING_MODEL: process.env.AI_EMBEDDING_MODEL || 'text-embedding-004',
    });

    if (!result.success) {
        throw new Error(
            `Invalid AI configuration: ${result.error.issues
                .map((issue) => issue.message)
                .join(' ')}`,
        );
    }

    return result.data;
}
