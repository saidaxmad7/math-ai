type LessonResponse = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    order: number;
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
};

type LessonWithTopic = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    order: number;
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
};

export function toLessonResponse(lesson: LessonWithTopic): LessonResponse {
    return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        content: lesson.content,
        order: lesson.order,
        topic: {
            id: lesson.topic.id,
            title: lesson.topic.title,
            subject: {
                id: lesson.topic.subject.id,
                name: lesson.topic.subject.name,
                grade: {
                    id: lesson.topic.subject.grade.id,
                    name: lesson.topic.subject.grade.name,
                },
            },
        },
    };
}
