import { Prisma, type AIContextType, type AIMessageRole } from '@prisma/client';

export type AIMessageResponse = {
    id: string;
    role: AIMessageRole;
    content: string;
    createdAt: Date;
};

export type AIConversationResponse = {
    id: string;
    title: string | null;
    contextType: AIContextType | null;
    contextId: string | null;
    createdAt: Date;
    updatedAt: Date;
    messages: AIMessageResponse[];
};

type AIConversationRecord = Prisma.AIConversationGetPayload<{
    select: {
        id: true;
        title: true;
        contextType: true;
        contextId: true;
        createdAt: true;
        updatedAt: true;
        messages: {
            orderBy: {
                createdAt: 'asc';
            };
            select: {
                id: true;
                role: true;
                content: true;
                createdAt: true;
            };
        };
    };
}>;

export function toAIConversationResponse(
    conversation: AIConversationRecord,
): AIConversationResponse {
    return {
        id: conversation.id,
        title: conversation.title,
        contextType: conversation.contextType,
        contextId: conversation.contextId,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        messages: conversation.messages,
    };
}

export function toAIConversationsResponse(
    conversations: AIConversationRecord[],
): AIConversationResponse[] {
    return conversations.map(toAIConversationResponse);
}
