'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ProgressResponse } from '@/mappers/progress.mapper';

type ProgressApiResponse = {
    success: boolean;
    message: string;
    data: ProgressResponse[];
};

type CompleteLessonApiResponse = {
    success: boolean;
    message: string;
    data: ProgressResponse;
};

type CompleteLessonPayload = {
    lessonId: string;
};

async function fetchProgress(): Promise<ProgressResponse[]> {
    const { data } = await axios.get<ProgressApiResponse>('/api/progress');

    if (!data.success) {
        throw new Error(data.message ?? 'Progress fetch failed');
    }

    return data.data;
}

async function completeLesson(
    payload: CompleteLessonPayload,
): Promise<ProgressResponse> {
    const { data } = await axios.post<CompleteLessonApiResponse>(
        '/api/progress',
        payload,
    );

    if (!data.success) {
        throw new Error(data.message ?? 'Lesson completion failed');
    }

    return data.data;
}

export function useProgress() {
    return useQuery<ProgressResponse[]>({
        queryKey: ['progress'],
        queryFn: fetchProgress,
    });
}

export function useCompleteLesson() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeLesson,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['progress'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}
