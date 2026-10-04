import { DifficultyLevel, QuizStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function getOrCreateDefaultUser(providedId?: string): Promise<string> {
    if (providedId) {
        const existing = await prisma.user.findUnique({ where: { id: providedId } });
        if (existing) return existing.id;
    }

    const firstUser = await prisma.user.findFirst();
    if (firstUser) {
        return firstUser.id;
    }

    const created = await prisma.user.create({
        data: {
            name: "O'quvchi",
            email: 'student@example.com',
            role: 'USER',
        },
    });

    return created.id;
}

export async function findQuizSessionById(id: string) {
    return prisma.quizSession.findUnique({
        where: { id },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                },
            },
            attempts: {
                include: {
                    question: true,
                },
                orderBy: { createdAt: 'asc' },
            },
        },
    });
}

export async function findActiveQuizSession(userId: string, topicId: string) {
    return prisma.quizSession.findFirst({
        where: {
            userId,
            topicId,
            status: QuizStatus.IN_PROGRESS,
        },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                },
            },
            attempts: {
                select: {
                    questionId: true,
                },
            },
        },
        orderBy: { startedAt: 'desc' },
    });
}

export async function createQuizSession(userId: string, topicId: string) {
    return prisma.quizSession.create({
        data: {
            userId,
            topicId,
            status: QuizStatus.IN_PROGRESS,
            currentDifficulty: DifficultyLevel.EASY,
            consecutiveCorrect: 0,
            totalAnswered: 0,
            correctAnswers: 0,
        },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                },
            },
            attempts: {
                select: {
                    questionId: true,
                },
            },
        },
    });
}

export async function updateQuizSessionProgress(
    sessionId: string,
    data: {
        currentDifficulty?: DifficultyLevel;
        consecutiveCorrect?: number;
        totalAnswered?: number;
        correctAnswers?: number;
        status?: QuizStatus;
        completedAt?: Date;
    },
) {
    return prisma.quizSession.update({
        where: { id: sessionId },
        data,
    });
}

export async function findQuestionsForTopic(
    topicId: string,
    difficulty?: DifficultyLevel,
    excludeIds: string[] = [],
) {
    return prisma.practiceQuestion.findMany({
        where: {
            topicId,
            ...(difficulty ? { difficulty } : {}),
            id: { notIn: excludeIds },
        },
        orderBy: { order: 'asc' },
    });
}

export async function findQuestionById(id: string) {
    return prisma.practiceQuestion.findUnique({
        where: { id },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
}

export async function createQuestionAttempt(data: {
    sessionId: string;
    questionId: string;
    userAnswer: string;
    isCustomAnswer: boolean;
    isCorrect: boolean;
    timeSpentSeconds: number;
}) {
    return prisma.questionAttempt.create({
        data,
    });
}

export async function upsertTopicMistake(data: {
    userId: string;
    topicId: string;
    questionId: string;
}) {
    return prisma.topicMistake.upsert({
        where: {
            userId_questionId: {
                userId: data.userId,
                questionId: data.questionId,
            },
        },
        create: {
            userId: data.userId,
            topicId: data.topicId,
            questionId: data.questionId,
            resolved: false,
        },
        update: {
            resolved: false,
            updatedAt: new Date(),
        },
    });
}

export async function findWorkedExampleForTopic(
    topicId: string,
    difficulty?: DifficultyLevel,
) {
    return prisma.workedExample.findFirst({
        where: {
            topicId,
            ...(difficulty ? { difficulty } : {}),
        },
        orderBy: { order: 'asc' },
    });
}

export async function findUserMistakes(userId: string, topicId?: string) {
    return prisma.topicMistake.findMany({
        where: {
            userId,
            resolved: false,
            ...(topicId ? { topicId } : {}),
        },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                },
            },
            question: true,
        },
        orderBy: { createdAt: 'desc' },
    });
}

export async function resolveTopicMistake(mistakeId: string, userId: string) {
    return prisma.topicMistake.updateMany({
        where: {
            id: mistakeId,
            userId,
        },
        data: {
            resolved: true,
            remedialSolved: true,
        },
    });
}
