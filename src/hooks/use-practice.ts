'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { PracticeResponse } from '@/mappers/practice.mapper';
import type { PracticeQuery } from '@/validations/practice.validation';

type PracticeApiResponse = {
    success: boolean;
    message: string;
    data: PracticeResponse;
};

async function fetchPracticeLessons(
    filters: PracticeQuery,
): Promise<PracticeResponse> {
    const { data } = await axios.get<PracticeApiResponse>('/api/practice', {
        params: filters,
    });

    if (!data.success) {
        throw new Error(data.message ?? 'Practice lessons fetch failed');
    }

    return data.data;
}

export function usePractice(filters: PracticeQuery) {
    return useQuery<PracticeResponse>({
        queryKey: ['practice', filters],
        queryFn: () => fetchPracticeLessons(filters),
    });
}
