import { prisma } from "@/lib/prisma";

export async function findLessonBySlug(slug: string) {
    return prisma.lesson.findUnique({
        where: {
            slug,
        },
        include: {
            topic: {
                include: {
                    subject: {
                        include: {
                            grade: true,
                        },
                    },
                    workedExamples: {
                        orderBy: {
                            order: 'asc',
                        },
                    },
                    practiceQuestions: {
                        orderBy: {
                            order: 'asc',
                        },
                    },
                },
            },
        },
    });
}

export async function findLessonNavigation(
    topicId: string,
    order: number,
    subjectId?: string,
    topicOrder?: number,
) {
    // First try within the same topic
    const [previousInTopic, nextInTopic] = await Promise.all([
        prisma.lesson.findFirst({
            where: {
                topicId,
                order: {
                    lt: order,
                },
            },
            orderBy: {
                order: "desc",
            },
            select: {
                id: true,
                title: true,
                slug: true,
            },
        }),
        prisma.lesson.findFirst({
            where: {
                topicId,
                order: {
                    gt: order,
                },
            },
            orderBy: {
                order: "asc",
            },
            select: {
                id: true,
                title: true,
                slug: true,
            },
        }),
    ]);

    let previousLesson = previousInTopic;
    let nextLesson = nextInTopic;

    // If no previous lesson in same topic, search across topics in same subject
    if (!previousLesson && subjectId && typeof topicOrder === "number") {
        previousLesson = await prisma.lesson.findFirst({
            where: {
                topic: {
                    subjectId,
                    order: { lt: topicOrder },
                },
            },
            orderBy: [
                { topic: { order: "desc" } },
                { order: "desc" },
            ],
            select: {
                id: true,
                title: true,
                slug: true,
            },
        });
    }

    // If no next lesson in same topic, search across topics in same subject
    if (!nextLesson && subjectId && typeof topicOrder === "number") {
        nextLesson = await prisma.lesson.findFirst({
            where: {
                topic: {
                    subjectId,
                    order: { gt: topicOrder },
                },
            },
            orderBy: [
                { topic: { order: "asc" } },
                { order: "asc" },
            ],
            select: {
                id: true,
                title: true,
                slug: true,
            },
        });
    }

    return {
        previousLesson,
        nextLesson,
    };
}
