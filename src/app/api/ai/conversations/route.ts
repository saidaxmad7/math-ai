import { ZodError } from 'zod';

import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import {
    toAIConversationResponse,
    toAIConversationsResponse,
} from '@/mappers/ai.mapper';
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

        const input = sendAIMessageSchema.parse(await request.json());

        if (input.stream) {
            const encoder = new TextEncoder();
            const stream = new ReadableStream<Uint8Array>({
                async start(controller) {
                    try {
                        for await (const event of streamAIMessage(
                            session.user.id,
                            input,
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

        const conversation = await sendAIMessage(session.user.id, input);

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
