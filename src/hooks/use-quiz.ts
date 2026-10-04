'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
    AnswerEvaluationResponse,
    QuizSessionResponse,
    TopicMistakeResponse,
} from '@/mappers/quiz.mapper';
import type { SubmitAnswerInput } from '@/validations/quiz.validation';

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export function useStartQuiz() {
    return useMutation({
        mutationFn: async (topicId: string) => {
            const { data } = await axios.post<ApiResponse<QuizSessionResponse>>(
                '/api/quiz/start',
                { topicId },
            );
            if (!data.success) {
                throw new Error(data.message || 'Testni boshlashda xatolik');
            }
            return data.data;
        },
    });
}

export function useSubmitAnswer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: SubmitAnswerInput) => {
            const { data } = await axios.post<
                ApiResponse<AnswerEvaluationResponse>
            >('/api/quiz/submit-answer', input);
            if (!data.success) {
                throw new Error(data.message || 'Javobni tekshirishda xatolik');
            }
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mistakes'] });
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
        },
    });
}

export function useTopicMistakes(topicId?: string) {
    return useQuery<TopicMistakeResponse[]>({
        queryKey: ['mistakes', topicId],
        queryFn: async () => {
            const { data } = await axios.get<
                ApiResponse<TopicMistakeResponse[]>
            >('/api/quiz/mistakes', {
                params: topicId ? { topicId } : {},
            });
            if (!data.success) {
                throw new Error(data.message || 'Xatoliklarni yuklab bo\'lmadi');
            }
            return data.data;
        },
    });
}

export function useResolveMistake() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (mistakeId: string) => {
            const { data } = await axios.post<ApiResponse<{ resolved: boolean }>>(
                `/api/quiz/mistakes/${mistakeId}/resolve`,
            );
            if (!data.success) {
                throw new Error(data.message || 'Xatolikni belgilashda muammo');
            }
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mistakes'] });
        },
    });
}
