import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const practiceLessonSelect = {
    id: true,
    title: true,
    slug: true,
    description: true,
    order: true,
    createdAt: true,
    topic: {
        select: {
            id: true,
            title: true,
            order: true,
            subject: {
                select: {
                    id: true,
                    name: true,
                    grade: {
                        select: {
                            id: true,
                            name: true,
                            order: true,
                        },
                    },
                },
            },
        },
    },
    progresses: {
        select: {
            completed: true,
            completedAt: true,
        },
    },
} satisfies Prisma.LessonSelect;

export async function findPracticeLessons(userId: string) {
    return prisma.lesson.findMany({
        select: {
            ...practiceLessonSelect,
            progresses: {
                where: { userId },
                select: practiceLessonSelect.progresses.select,
            },
        },
        orderBy: [
            { topic: { subject: { grade: { order: 'asc' } } } },
            { topic: { subject: { name: 'asc' } } },
            { topic: { order: 'asc' } },
            { order: 'asc' },
        ],
    });
}
