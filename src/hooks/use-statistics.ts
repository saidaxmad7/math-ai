'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { StatisticsResponse } from '@/mappers/statistics.mapper';

type StatisticsApiResponse = {
    success: boolean;
    message: string;
    data: StatisticsResponse;
};

async function fetchStatistics(): Promise<StatisticsResponse> {
    const { data } = await axios.get<StatisticsApiResponse>('/api/statistics');

    if (!data.success) {
        throw new Error(data.message ?? 'Statistics fetch failed');
    }

    return data.data;
}

export function useStatistics() {
    return useQuery<StatisticsResponse>({
        queryKey: ['statistics'],
        queryFn: fetchStatistics,
    });
}
