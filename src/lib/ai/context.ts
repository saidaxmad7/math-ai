import { AI_MAX_CONTEXT_DESCRIPTION_LENGTH } from '@/constants/ai';

export type AILessonContext = {
    grade: string;
    subject: string;
    topic: string;
    lessonTitle: string;
    description?: string | null;
};

export function buildLessonAIContext(context: AILessonContext) {
    const description = context.description
        ?.trim()
        .slice(0, AI_MAX_CONTEXT_DESCRIPTION_LENGTH);

    return [
        `Grade: ${context.grade}`,
        `Subject: ${context.subject}`,
        `Topic: ${context.topic}`,
        `Lesson: ${context.lessonTitle}`,
        description ? `Description: ${description}` : '',
    ]
        .filter(Boolean)
        .join('\n');
}
