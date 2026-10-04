import { getAIEnvironment, type AIEnvironment } from '@/lib/env';

export type AIProviderRole = 'system' | 'user' | 'assistant';

export type AIProviderMessage = {
    role: AIProviderRole;
    content: string;
};

export type AICompletionRequest = {
    messages: AIProviderMessage[];
};

export interface AIProvider {
    generateResponse(request: AICompletionRequest): Promise<string>;
    streamResponse(request: AICompletionRequest): AsyncIterable<string>;
    generateEmbedding(input: string): Promise<number[]>;
}

type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

type JSONRecord = { [key: string]: JSONValue };

function isRecord(value: JSONValue): value is JSONRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getCompletionText(payload: JSONValue): string {
    if (!isRecord(payload)) {
        return '';
    }

    const choices = payload.choices;

    if (!Array.isArray(choices) || !isRecord(choices[0])) {
        return '';
    }

    const message = choices[0].message;

    if (!isRecord(message) || typeof message.content !== 'string') {
        return '';
    }

    return message.content;
}

function getStreamText(payload: JSONValue): string {
    if (!isRecord(payload) || !Array.isArray(payload.choices)) {
        return '';
    }

    const choice = payload.choices[0];

    if (!isRecord(choice) || !isRecord(choice.delta)) {
        return '';
    }

    return typeof choice.delta.content === 'string' ? choice.delta.content : '';
}

export class OpenAICompatibleProvider implements AIProvider {
    private readonly environment: AIEnvironment;

    public constructor(environment: AIEnvironment) {
        this.environment = environment;
    }

    async generateResponse(request: AICompletionRequest): Promise<string> {
        const response = await this.request(
            '/chat/completions',
            request,
            false,
        );
        const payload: JSONValue = await response.json();
        const text = getCompletionText(payload);

        if (!text) {
            throw new Error('AI provider returned an empty response.');
        }

        return text;
    }

    async *streamResponse(request: AICompletionRequest): AsyncIterable<string> {
        const response = await this.request('/chat/completions', request, true);
        const reader = response.body?.getReader();

        if (!reader) {
            throw new Error(
                'AI provider does not support streaming responses.',
            );
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            buffer += decoder.decode(value ?? new Uint8Array(), {
                stream: !done,
            });

            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
                const data = line.trim();

                if (!data.startsWith('data:')) {
                    continue;
                }

                const payload = data.slice(5).trim();

                if (payload === '[DONE]') {
                    return;
                }

                const parsed: JSONValue = JSON.parse(payload);
                const text = getStreamText(parsed);

                if (text) {
                    yield text;
                }
            }

            if (done) {
                return;
            }
        }
    }

    async generateEmbedding(input: string): Promise<number[]> {
        const response = await this.request(
            '/embeddings',
            {
                input,
            },
            false,
        );
        const payload: JSONValue = await response.json();

        if (!isRecord(payload) || !Array.isArray(payload.data)) {
            throw new Error(
                'AI provider returned an invalid embedding response.',
            );
        }

        const embedding = payload.data[0];

        if (!isRecord(embedding) || !Array.isArray(embedding.embedding)) {
            throw new Error(
                'AI provider returned an invalid embedding response.',
            );
        }

        const values = embedding.embedding.filter(
            (value): value is number => typeof value === 'number',
        );

        if (values.length === 0) {
            throw new Error('AI provider returned an empty embedding.');
        }

        return values;
    }

    private async request(
        path: string,
        body: AICompletionRequest | { input: string },
        stream: boolean,
    ): Promise<Response> {
        if (!this.environment.AI_API_KEY) {
            throw new Error(
                'Google Gemini API kaliti kiritilmagan. Iltimos, .env faylida GEMINI_API_KEY yoki AI_API_KEY ni sozlang.',
            );
        }

        const baseUrl = this.environment.AI_API_URL.endsWith(
            '/chat/completions',
        )
            ? this.environment.AI_API_URL.slice(0, -'/chat/completions'.length)
            : this.environment.AI_API_URL.replace(/\/$/, '');
        const endpoint = `${baseUrl}${path}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.environment.AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model:
                    path === '/embeddings'
                        ? this.environment.AI_EMBEDDING_MODEL
                        : this.environment.AI_MODEL,
                ...body,
                ...(path === '/chat/completions' ? { stream } : {}),
            }),
        });

        if (!response.ok) {
            throw new Error(
                `AI provider request failed with status ${response.status}.`,
            );
        }

        return response;
    }
}

export class GoogleGeminiNativeProvider implements AIProvider {
    private readonly environment: AIEnvironment;

    public constructor(environment: AIEnvironment) {
        this.environment = environment;
    }

    async generateResponse(request: AICompletionRequest): Promise<string> {
        if (!this.environment.AI_API_KEY) {
            throw new Error(
                'Google Gemini API kaliti kiritilmagan. Iltimos, .env faylida GEMINI_API_KEY ni sozlang.',
            );
        }

        const preferredModel = this.environment.AI_MODEL || 'gemini-3.8-flash';
        const modelsToTry = Array.from(
            new Set([preferredModel, 'gemini-3.8-flash', 'gemini-2.5-flash-lite', 'gemini-flash-latest', 'gemini-3.5-flash-lite']),
        );

        const systemMessages = request.messages.filter((m) => m.role === 'system');
        const contentMessages = request.messages.filter((m) => m.role !== 'system');

        const body: Record<string, unknown> = {};

        if (systemMessages.length > 0) {
            body.systemInstruction = {
                parts: systemMessages.map((m) => ({ text: m.content })),
            };
        }

        body.contents = contentMessages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        let lastError: Error | null = null;

        for (const model of modelsToTry) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.environment.AI_API_KEY}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        return text;
                    }
                } else {
                    const errText = await response.text();
                    lastError = new Error(`Model ${model} failed (${response.status}): ${errText}`);
                }
            } catch (err) {
                lastError = err instanceof Error ? err : new Error(String(err));
            }
        }

        throw lastError || new Error("Google Gemini barcha modellardan javob bera olmadi.");
    }


    async *streamResponse(request: AICompletionRequest): AsyncIterable<string> {
        const text = await this.generateResponse(request);
        yield text;
    }

    async generateEmbedding(input: string): Promise<number[]> {
        if (!this.environment.AI_API_KEY) {
            throw new Error(
                'Google Gemini API kaliti kiritilmagan. Iltimos, .env faylida GEMINI_API_KEY ni sozlang.',
            );
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${this.environment.AI_API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: { parts: [{ text: input }] },
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini embedding failed with status ${response.status}`);
        }

        const data = await response.json();
        return data?.embedding?.values || [];
    }
}

export function createAIProvider(environment = getAIEnvironment()): AIProvider {
    switch (environment.AI_PROVIDER) {
        case 'openai-compatible':
            return new OpenAICompatibleProvider(environment);
        case 'google-gemini':
        default:
            return new GoogleGeminiNativeProvider(environment);
    }
}

export const aiProvider: AIProvider = createAIProvider();

