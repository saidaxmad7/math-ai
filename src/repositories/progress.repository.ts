import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const progressInclude = {
    lesson: {
        select: {
            id: true,
            title: true,
        },
    },
} satisfies Prisma.ProgressInclude;

export async function findProgress(userId: string, lessonId: string) {
    return prisma.progress.findUnique({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
    });
}

export async function createProgress(userId: string, lessonId: string) {
    return prisma.progress.create({
        data: {
            userId,
            lessonId,
            completed: true,
            completedAt: new Date(),
        },
        include: progressInclude,
    });
}

export async function updateProgress(id: string) {
    return prisma.progress.update({
        where: {
            id,
        },
        data: {
            completed: true,
            completedAt: new Date(),
        },
        include: progressInclude,
    });
}

export async function getUserProgress(userId: string) {
    return prisma.progress.findMany({
        where: {
            userId,
        },
        orderBy: {
            completedAt: 'desc',
        },
        include: progressInclude,
    });
}
