'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { AIConversationResponse } from '@/mappers/ai.mapper';
import type { SendAIMessageInput } from '@/validations/ai.validation';

type AIConversationsApiResponse = {
    success: boolean;
    message: string;
    data: AIConversationResponse[];
};

type AIConversationApiResponse = {
    success: boolean;
    message: string;
    data: AIConversationResponse;
};

async function fetchAIConversations(): Promise<AIConversationResponse[]> {
    const { data } = await axios.get<AIConversationsApiResponse>(
        '/api/ai/conversations',
    );

    if (!data.success) {
        throw new Error(data.message ?? 'AI conversations fetch failed');
    }

    return data.data;
}

async function fetchAIConversation(
    conversationId: string,
): Promise<AIConversationResponse> {
    const { data } = await axios.get<AIConversationApiResponse>(
        `/api/ai/conversations/${conversationId}`,
    );

    if (!data.success) {
        throw new Error(data.message ?? 'AI conversation fetch failed');
    }

    return data.data;
}

async function sendAIMessage(
    input: SendAIMessageInput,
): Promise<AIConversationResponse> {
    const { data } = await axios.post<AIConversationApiResponse>(
        '/api/ai/conversations',
        { ...input, stream: false },
    );

    if (!data.success) {
        throw new Error(data.message ?? 'AI response failed');
    }

    return data.data;
}

export function useAIConversations() {
    return useQuery<AIConversationResponse[]>({
        queryKey: ['ai', 'conversations'],
        queryFn: fetchAIConversations,
    });
}

export function useAIConversation(conversationId?: string) {
    return useQuery<AIConversationResponse>({
        queryKey: ['ai', 'conversation', conversationId],
        queryFn: () => fetchAIConversation(conversationId ?? ''),
        enabled: Boolean(conversationId),
    });
}

export function useSendAIMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendAIMessage,
        onSuccess: (conversation) => {
            queryClient.setQueryData(
                ['ai', 'conversation', conversation.id],
                conversation,
            );
            queryClient.invalidateQueries({
                queryKey: ['ai', 'conversations'],
            });
        },
    });
}
