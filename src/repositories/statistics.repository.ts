import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const recentProgressInclude = {
    lesson: {
        select: {
            id: true,
            title: true,
        },
    },
} satisfies Prisma.ProgressInclude;

export async function getStatisticsData(userId: string) {
    const [
        totalLessons,
        completedLessons,
        totalBookmarks,
        totalNotes,
        recentCompletedLessons,
    ] = await Promise.all([
        prisma.lesson.count(),
        prisma.progress.count({
            where: {
                userId,
                completed: true,
            },
        }),
        prisma.bookmark.count({
            where: { userId },
        }),
        prisma.note.count({
            where: { userId },
        }),
        prisma.progress.findMany({
            where: {
                userId,
                completed: true,
            },
            orderBy: {
                completedAt: 'desc',
            },
            take: 5,
            include: recentProgressInclude,
        }),
    ]);

    return {
        totalLessons,
        completedLessons,
        totalBookmarks,
        totalNotes,
        recentActivityCount: completedLessons,
        recentCompletedLessons,
    };
}
