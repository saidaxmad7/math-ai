export type SearchTopicResponse = {
    id: string;
    title: string;
    description: string | null;
    subjectId: string;
    lessonSlug: string | null;
    subject: {
        id: string;
        name: string;
        gradeId: string;
        grade: {
            id: string;
            name: string;
        };
    };
};

export type SearchLessonResponse = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
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

export type SearchResponse = {
    topics: SearchTopicResponse[];
    lessons: SearchLessonResponse[];
};

type SearchResultsInput = {
    topics: {
        id: string;
        title: string;
        description: string | null;
        subjectId: string;
        lessons?: { slug: string }[];
        subject: {
            id: string;
            name: string;
            gradeId: string;
            grade: {
                id: string;
                name: string;
            };
        };
    }[];
    lessons: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
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
    }[];
};

export function toSearchResponse(results: SearchResultsInput): SearchResponse {
    return {
        topics: (results.topics || []).map((topic) => ({
            id: topic.id,
            title: topic.title,
            description: topic.description,
            subjectId: topic.subjectId,
            lessonSlug: topic.lessons?.[0]?.slug || null,
            subject: {
                id: topic.subject.id,
                name: topic.subject.name,
                gradeId: topic.subject.gradeId,
                grade: {
                    id: topic.subject.grade.id,
                    name: topic.subject.grade.name,
                },
            },
        })),
        lessons: (results.lessons || []).map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            description: lesson.description,
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
        })),
    };
}
