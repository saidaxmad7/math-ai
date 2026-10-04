type TopicResponse = {
    id: string;
    title: string;
    description: string | null;
    order: number;
    subject: {
        id: string;
        name: string;
        grade: {
            id: string;
            name: string;
        };
    };
    lessons: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        order: number;
    }[];
};

type TopicWithLessons = {
    id: string;
    title: string;
    description: string | null;
    order: number;
    subject: {
        id: string;
        name: string;
        grade: {
            id: string;
            name: string;
        };
    };
    lessons: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        order: number;
    }[];
};

export function toTopicResponse(topic: TopicWithLessons): TopicResponse {
    return {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        order: topic.order,
        subject: {
            id: topic.subject.id,
            name: topic.subject.name,
            grade: {
                id: topic.subject.grade.id,
                name: topic.subject.grade.name,
            },
        },
        lessons: topic.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            description: lesson.description,
            order: lesson.order,
        })),
    };
}
