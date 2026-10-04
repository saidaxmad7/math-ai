import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type { AdminUsersQuery } from '@/validations/admin.validation';

export async function getAdminUsers(query: AdminUsersQuery) {
    const where: Prisma.UserWhereInput = {};

    if (query.search && query.search.trim()) {
        const searchTerm = query.search.trim();
        where.OR = [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
        ];
    }

    if (query.role && query.role !== 'ALL') {
        where.role = query.role;
    }

    const [total, users] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        progresses: {
                            where: { completed: true },
                        },
                        quizSessions: true,
                        mistakes: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        }),
    ]);

    return {
        users,
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
    };
}

export async function updateUserRoleInDb(
    userId: string,
    role: 'USER' | 'ADMIN',
) {
    return prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            updatedAt: true,
        },
    });
}

export async function getAdminOverviewStats() {
    const [
        totalUsers,
        totalStudents,
        totalAdmins,
        totalBooks,
        completedBooks,
        totalTopics,
        totalLessons,
        totalWorkedExamples,
        totalQuestions,
        totalQuizSessions,
        totalMistakes,
        resolvedMistakes,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: 'USER' } }),
        prisma.user.count({ where: { role: 'ADMIN' } }),
        prisma.book.count(),
        prisma.book.count({ where: { status: 'COMPLETED' } }),
        prisma.topic.count(),
        prisma.lesson.count(),
        prisma.workedExample.count(),
        prisma.practiceQuestion.count(),
        prisma.quizSession.count(),
        prisma.topicMistake.count(),
        prisma.topicMistake.count({ where: { resolved: true } }),
    ]);

    return {
        totalUsers,
        totalStudents,
        totalAdmins,
        totalBooks,
        completedBooks,
        totalTopics,
        totalLessons,
        totalWorkedExamples,
        totalQuestions,
        totalQuizSessions,
        totalMistakes,
        resolvedMistakes,
    };
}

export async function getHardestTopicsFromDb(limit = 6) {
    return prisma.topic.findMany({
        where: {
            mistakes: {
                some: {},
            },
        },
        select: {
            id: true,
            title: true,
            subject: {
                select: {
                    name: true,
                    grade: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    mistakes: true,
                    practiceQuestions: true,
                },
            },
        },
        orderBy: {
            mistakes: {
                _count: 'desc',
            },
        },
        take: limit,
    });
}
