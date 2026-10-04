import { Prisma } from '@prisma/client';

export type PracticeLessonResponse = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    topic: {
        id: string;
        title: string;
        subject: {
            id: string;
            name: string;
            grade: {
                id: string;
                name: string;
            };
        };
    };
    completed: boolean;
    completedAt: Date | null;
};

export type PracticeFilterOption = {
    id: string;
    name: string;
    gradeId?: string;
    gradeName?: string;
};

export type PracticeResponse = {
    lessons: PracticeLessonResponse[];
    grades: PracticeFilterOption[];
    subjects: PracticeFilterOption[];
};

type PracticeLessonRecord = Prisma.LessonGetPayload<{
    select: {
        id: true;
        title: true;
        slug: true;
        description: true;
        createdAt: true;
        topic: {
            select: {
                id: true;
                title: true;
                subject: {
                    select: {
                        id: true;
                        name: true;
                        grade: {
                            select: {
                                id: true;
                                name: true;
                            };
                        };
                    };
                };
            };
        };
        progresses: {
            select: {
                completed: true;
                completedAt: true;
            };
        };
    };
}>;

export function toPracticeLessonResponse(
    lesson: PracticeLessonRecord,
): PracticeLessonResponse {
    const progress = lesson.progresses[0];

    return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        topic: lesson.topic,
        createdAt: lesson.createdAt,
        completed: progress?.completed ?? false,
        completedAt: progress?.completedAt ?? null,
    };
}

export function toPracticeLessonsResponse(
    lessons: PracticeLessonRecord[],
): PracticeLessonResponse[] {
    return lessons.map(toPracticeLessonResponse);
}

export function toPracticeResponse(data: {
    lessons: PracticeLessonRecord[];
    grades: PracticeFilterOption[];
    subjects: PracticeFilterOption[];
}): PracticeResponse {
    return {
        lessons: toPracticeLessonsResponse(data.lessons),
        grades: data.grades,
        subjects: data.subjects,
    };
}
