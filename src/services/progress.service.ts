import {
    createProgress,
    findProgress,
    updateProgress,
    getUserProgress,
} from "@/repositories/progress.repository";

export async function completeLesson(userId: string, lessonId: string) {
    const progress = await findProgress(userId, lessonId);

    if (!progress) {
        return createProgress(userId, lessonId);
    }

    return updateProgress(progress.id);
}

export async function getProgress(userId: string) {
    return getUserProgress(userId);
}
