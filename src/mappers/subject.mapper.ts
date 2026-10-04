type SubjectResponse = {
    id: string;
    name: string;
    icon: string;
    color: string;
    grade: {
        id: string;
        name: string;
    };
    topics: {
        id: string;
        title: string;
        description: string | null;
        order: number;
    }[];
};

type SubjectWithTopics = {
    id: string;
    name: string;
    icon: string;
    color: string;
    grade: {
        id: string;
        name: string;
    };
    topics: {
        id: string;
        title: string;
        description: string | null;
        order: number;
    }[];
};

export function toSubjectResponse(subject: SubjectWithTopics): SubjectResponse {
    return {
        id: subject.id,
        name: subject.name,
        icon: subject.icon,
        color: subject.color,
        grade: {
            id: subject.grade.id,
            name: subject.grade.name,
        },
        topics: subject.topics.map((topic) => ({
            id: topic.id,
            title: topic.title,
            description: topic.description,
            order: topic.order,
        })),
    };
}
