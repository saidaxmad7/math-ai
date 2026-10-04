import {
    findLessonBySlug,
    findLessonNavigation,
} from "@/repositories/lesson.repository";

export async function getLessonBySlug(slug: string) {
    return findLessonBySlug(slug);
}

export async function getLessonNavigation(
    topicId: string,
    order: number,
    subjectId?: string,
    topicOrder?: number,
) {
    return findLessonNavigation(topicId, order, subjectId, topicOrder);
}
