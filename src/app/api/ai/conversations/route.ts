import { ZodError } from 'zod';

import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import {
    toAIConversationResponse,
    toAIConversationsResponse,
} from '@/mappers/ai.mapper';
import { prisma } from '@/lib/prisma';
import {
    getAIConversations,
    sendAIMessage,
    streamAIMessage,
} from '@/services/ai.service';
import { sendAIMessageSchema } from '@/validations/ai.validation';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const conversations = await getAIConversations(session.user.id);

        return successResponse(
            toAIConversationsResponse(conversations),
            'AI conversations fetched successfully.',
        );
    } catch {
        return errorResponse();
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const headerApiKey = request.headers.get('x-gemini-api-key')?.trim();
        const input = sendAIMessageSchema.parse(await request.json());

        let resolvedApiKey = headerApiKey || input.customApiKey?.trim() || undefined;

        if (!resolvedApiKey) {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: session.user.id },
                    select: { geminiApiKey: true },
                });
                if (user?.geminiApiKey) {
                    resolvedApiKey = user.geminiApiKey;
                }
            } catch {
                // Fallback gracefully
            }
        }

        const serverKey = process.env.GEMINI_API_KEY?.trim() || process.env.AI_API_KEY?.trim();
        const finalKey = resolvedApiKey || (serverKey && serverKey.length > 0 ? serverKey : undefined);

        if (!finalKey) {
            return errorResponse(
                input.language === 'en'
                    ? 'No Gemini API key found. Please connect your free Google Gemini API key in Settings.'
                    : "Gemini API kaliti topilmadi. Iltimos, Sozlamalar sahifasida o'zingizning bepul Gemini API kalitingizni ulang.",
                400,
            );
        }

        if (input.stream) {
            const encoder = new TextEncoder();
            const stream = new ReadableStream<Uint8Array>({
                async start(controller) {
                    try {
                        for await (const event of streamAIMessage(
                            session.user.id,
                            input,
                            finalKey,
                        )) {
                            controller.enqueue(
                                encoder.encode(
                                    `data: ${JSON.stringify(event)}\n\n`,
                                ),
                            );
                        }

                        controller.close();
                    } catch (error) {
                        controller.error(error);
                    }
                },
            });

            return new Response(stream, {
                headers: {
                    'Cache-Control': 'no-cache, no-transform',
                    Connection: 'keep-alive',
                    'Content-Type': 'text/event-stream',
                },
            });
        }

        const conversation = await sendAIMessage(session.user.id, input, finalKey);

        return successResponse(
            toAIConversationResponse(conversation),
            'AI response generated successfully.',
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return errorResponse('Validation failed.', 400, error.flatten());
        }

        if (
            error instanceof Error &&
            error.message === 'Conversation not found.'
        ) {
            return errorResponse(error.message, 404);
        }

        return errorResponse(
            error instanceof Error ? error.message : undefined,
        );
    }
}
