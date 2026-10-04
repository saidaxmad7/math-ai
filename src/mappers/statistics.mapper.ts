import { Prisma } from '@prisma/client';

export type StatisticsResponse = {
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalBookmarks: number;
    totalNotes: number;
    recentActivityCount: number;
    recentCompletedLessons: {
        id: string;
        completedAt: Date | null;
        lesson: {
            id: string;
            title: string;
        };
    }[];
};

type StatisticsData = {
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalBookmarks: number;
    totalNotes: number;
    recentActivityCount: number;
    recentCompletedLessons: Prisma.ProgressGetPayload<{
        include: {
            lesson: {
                select: {
                    id: true;
                    title: true;
                };
            };
        };
    }>[];
};

export function toStatisticsResponse(data: StatisticsData): StatisticsResponse {
    return {
        totalLessons: data.totalLessons,
        completedLessons: data.completedLessons,
        progressPercentage: data.progressPercentage,
        totalBookmarks: data.totalBookmarks,
        totalNotes: data.totalNotes,
        recentActivityCount: data.recentActivityCount,
        recentCompletedLessons: data.recentCompletedLessons.map((progress) => ({
            id: progress.id,
            completedAt: progress.completedAt,
            lesson: progress.lesson,
        })),
    };
}
