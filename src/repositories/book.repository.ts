import { BookStatus, DifficultyLevel, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function findAllBooks() {
    return prisma.book.findMany({
        include: {
            grade: {
                select: { name: true },
            },
            subject: {
                select: { name: true },
            },
            _count: {
                select: { topics: true },
            },
        },
        orderBy: [
            { grade: { order: 'asc' } },
            { subject: { name: 'asc' } },
        ],
    });
}

export async function findBookById(id: string) {
    return prisma.book.findUnique({
        where: { id },
        include: {
            grade: {
                select: { name: true },
            },
            subject: {
                select: { name: true },
            },
            topics: {
                include: {
                    _count: {
                        select: {
                            workedExamples: true,
                            practiceQuestions: true,
                        },
                    },
                },
                orderBy: { order: 'asc' },
            },
        },
    });
}

export async function upsertBookRecord(data: {
    gradeId: string;
    subjectId: string;
    title: string;
    filePath: string;
    fileName: string;
    fileSize: number;
    totalPages?: number;
}) {
    return prisma.book.upsert({
        where: {
            gradeId_subjectId: {
                gradeId: data.gradeId,
                subjectId: data.subjectId,
            },
        },
        create: {
            gradeId: data.gradeId,
            subjectId: data.subjectId,
            title: data.title,
            filePath: data.filePath,
            fileName: data.fileName,
            fileSize: data.fileSize,
            totalPages: data.totalPages,
            status: BookStatus.PENDING,
        },
        update: {
            title: data.title,
            filePath: data.filePath,
            fileName: data.fileName,
            fileSize: data.fileSize,
            totalPages: data.totalPages,
            status: BookStatus.PENDING,
            errorMessage: null,
        },
        include: {
            grade: { select: { name: true } },
            subject: { select: { name: true } },
        },
    });
}

export async function updateBookStatus(
    id: string,
    status: BookStatus,
    errorMessage?: string | null,
) {
    return prisma.book.update({
        where: { id },
        data: {
            status,
            errorMessage,
            ...(status === BookStatus.COMPLETED ? { parsedAt: new Date() } : {}),
        },
    });
}

export type ParsedTopicInput = {
    title: string;
    description?: string;
    theoryContent: string;
    order: number;
    workedExamples: {
        title: string;
        question: string;
        solution: string;
        ruleSummary?: string;
        difficulty: DifficultyLevel;
        order: number;
    }[];
    practiceQuestions: {
        question: string;
        options: string[];
        correctAnswer: string;
        correctCustomAnswer?: string;
        explanation: string;
        hint?: string;
        difficulty: DifficultyLevel;
        order: number;
    }[];
};

export async function saveParsedBookData(
    bookId: string,
    subjectId: string,
    gradeOrder: number,
    topicsData: ParsedTopicInput[],
) {
    for (const topicData of topicsData) {
        // 1. Create or update Topic
        let topic = await prisma.topic.findFirst({
            where: {
                subjectId,
                title: topicData.title,
            },
        });

        if (!topic) {
            topic = await prisma.topic.create({
                data: {
                    subjectId,
                    bookId,
                    title: topicData.title,
                    description: topicData.description,
                    order: topicData.order,
                },
            });
        } else {
            topic = await prisma.topic.update({
                where: { id: topic.id },
                data: {
                    bookId,
                    description: topicData.description,
                    order: topicData.order,
                },
            });
        }

        // 2. Create or update Lesson (theory)
        const slug = `${gradeOrder}-${topic.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')}`;

        await prisma.lesson.upsert({
            where: { slug },
            create: {
                title: topic.title,
                slug,
                description: topicData.description,
                content: topicData.theoryContent,
                order: topicData.order,
                topicId: topic.id,
            },
            update: {
                description: topicData.description,
                content: topicData.theoryContent,
                order: topicData.order,
            },
        });

        // 3. Delete existing workedExamples and practiceQuestions for clean overwrite
        await prisma.workedExample.deleteMany({
            where: { topicId: topic.id },
        });
        await prisma.practiceQuestion.deleteMany({
            where: { topicId: topic.id },
        });

        // 4. Insert worked examples
        if (topicData.workedExamples.length > 0) {
            await prisma.workedExample.createMany({
                data: topicData.workedExamples.map((ex) => ({
                    topicId: topic.id,
                    title: ex.title,
                    question: ex.question,
                    solution: ex.solution,
                    ruleSummary: ex.ruleSummary,
                    difficulty: ex.difficulty,
                    order: ex.order,
                })),
            });
        }

        // 5. Insert practice questions
        if (topicData.practiceQuestions.length > 0) {
            await prisma.practiceQuestion.createMany({
                data: topicData.practiceQuestions.map((q) => ({
                    topicId: topic.id,
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    correctCustomAnswer: q.correctCustomAnswer,
                    explanation: q.explanation,
                    hint: q.hint,
                    difficulty: q.difficulty,
                    order: q.order,
                })),
            });
        }
    }

    // Mark book as completed
    return prisma.book.update({
        where: { id: bookId },
        data: {
            status: BookStatus.COMPLETED,
            parsedAt: new Date(),
            errorMessage: null,
        },
    });
}
