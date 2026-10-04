export type AdminUserResponse = {
    id: string;
    name: string | null;
    email: string;
    role: 'USER' | 'ADMIN';
    image: string | null;
    createdAt: Date;
    completedLessonsCount: number;
    quizSessionsCount: number;
    mistakesCount: number;
};

export type AdminUsersListResponse = {
    users: AdminUserResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type AdminStatsResponse = {
    totalUsers: number;
    totalStudents: number;
    totalAdmins: number;
    totalBooks: number;
    completedBooks: number;
    totalTopics: number;
    totalLessons: number;
    totalWorkedExamples: number;
    totalQuestions: number;
    totalQuizSessions: number;
    totalMistakes: number;
    resolvedMistakes: number;
    mistakeResolutionRate: number;
};

export type HardestTopicResponse = {
    id: string;
    title: string;
    gradeName: string;
    subjectName: string;
    mistakesCount: number;
    practiceQuestionsCount: number;
};

type DbUser = {
    id: string;
    name: string | null;
    email: string;
    role: 'USER' | 'ADMIN';
    image: string | null;
    createdAt: Date;
    _count: {
        progresses: number;
        quizSessions: number;
        mistakes: number;
    };
};

export function toAdminUserResponse(user: DbUser): AdminUserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        createdAt: user.createdAt,
        completedLessonsCount: user._count.progresses,
        quizSessionsCount: user._count.quizSessions,
        mistakesCount: user._count.mistakes,
    };
}

export function toAdminUsersListResponse(data: {
    users: DbUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}): AdminUsersListResponse {
    return {
        users: data.users.map(toAdminUserResponse),
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
    };
}

export function toAdminStatsResponse(data: {
    totalUsers: number;
    totalStudents: number;
    totalAdmins: number;
    totalBooks: number;
    completedBooks: number;
    totalTopics: number;
    totalLessons: number;
    totalWorkedExamples: number;
    totalQuestions: number;
    totalQuizSessions: number;
    totalMistakes: number;
    resolvedMistakes: number;
}): AdminStatsResponse {
    const mistakeResolutionRate =
        data.totalMistakes === 0
            ? 100
            : Math.round((data.resolvedMistakes / data.totalMistakes) * 100);

    return {
        ...data,
        mistakeResolutionRate,
    };
}

type DbHardestTopic = {
    id: string;
    title: string;
    subject: {
        name: string;
        grade: {
            name: string;
        };
    };
    _count: {
        mistakes: number;
        practiceQuestions: number;
    };
};

export function toHardestTopicResponse(
    topic: DbHardestTopic,
): HardestTopicResponse {
    return {
        id: topic.id,
        title: topic.title,
        gradeName: topic.subject.grade.name,
        subjectName: topic.subject.name,
        mistakesCount: topic._count.mistakes,
        practiceQuestionsCount: topic._count.practiceQuestions,
    };
}

export function toHardestTopicsResponse(
    topics: DbHardestTopic[],
): HardestTopicResponse[] {
    return topics.map(toHardestTopicResponse);
}
