import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { toAIConversationResponse } from '@/mappers/ai.mapper';
import { getAIConversation, removeAIConversation } from '@/services/ai.service';

type ConversationRouteContext = {
    params: Promise<{
        conversationId: string;
    }>;
};

export async function GET(
    _request: Request,
    { params }: ConversationRouteContext,
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const { conversationId } = await params;
        const conversation = await getAIConversation(
            session.user.id,
            conversationId,
        );

        return successResponse(
            toAIConversationResponse(conversation),
            'AI conversation fetched successfully.',
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === 'Conversation not found.'
        ) {
            return errorResponse(error.message, 404);
        }

        return errorResponse();
    }
}

export async function DELETE(
    _request: Request,
    { params }: ConversationRouteContext,
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const { conversationId } = await params;
        await removeAIConversation(session.user.id, conversationId);

        return successResponse(null, 'Conversation deleted successfully.');
    } catch (error) {
        return errorResponse(error instanceof Error ? error.message : undefined);
    }
}
