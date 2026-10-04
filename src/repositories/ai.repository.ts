import { Prisma, type AIContextType, type AIMessageRole } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const conversationSelect = {
    id: true,
    title: true,
    contextType: true,
    contextId: true,
    createdAt: true,
    updatedAt: true,
    messages: {
        orderBy: {
            createdAt: 'asc',
        },
        select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
        },
    },
} satisfies Prisma.AIConversationSelect;

export async function findConversations(userId: string) {
    return prisma.aIConversation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        select: conversationSelect,
    });
}

export async function findConversation(userId: string, conversationId: string) {
    return prisma.aIConversation.findFirst({
        where: {
            id: conversationId,
            userId,
        },
        select: conversationSelect,
    });
}

export async function createConversation(input: {
    userId: string;
    title?: string;
    contextType?: AIContextType;
    contextId?: string;
}) {
    return prisma.aIConversation.create({
        data: input,
        select: conversationSelect,
    });
}

export async function createMessage(input: {
    conversationId: string;
    role: AIMessageRole;
    content: string;
}) {
    return prisma.aIMessage.create({
        data: input,
    });
}

export async function touchConversation(conversationId: string) {
    return prisma.aIConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
    });
}

export async function findLessonAIContext(lessonId: string) {
    return prisma.lesson.findUnique({
        where: { id: lessonId },
        select: {
            title: true,
            description: true,
            topic: {
                select: {
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
                },
            },
        },
    });
}
