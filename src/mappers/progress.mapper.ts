import { Prisma } from '@prisma/client';

export type ProgressResponse = {
    id: string;
    lessonId: string;
    completed: boolean;
    completedAt: Date | null;
    lesson: {
        id: string;
        title: string;
    };
};

type ProgressWithLesson = Prisma.ProgressGetPayload<{
    include: {
        lesson: {
            select: {
                id: true;
                title: true;
            };
        };
    };
}>;

export function toProgressResponse(
    progress: ProgressWithLesson,
): ProgressResponse {
    return {
        id: progress.id,
        lessonId: progress.lessonId,
        completed: progress.completed,
        completedAt: progress.completedAt,
        lesson: progress.lesson,
    };
}

export function toProgressesResponse(
    progresses: ProgressWithLesson[],
): ProgressResponse[] {
    return progresses.map(toProgressResponse);
}
