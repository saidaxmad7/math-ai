import { getStatisticsData } from '@/repositories/statistics.repository';

export async function getStatistics(userId: string) {
    const statistics = await getStatisticsData(userId);

    const progressPercentage =
        statistics.totalLessons === 0
            ? 0
            : Math.round(
                  (statistics.completedLessons / statistics.totalLessons) * 100,
              );

    return {
        ...statistics,
        progressPercentage,
    };
}
