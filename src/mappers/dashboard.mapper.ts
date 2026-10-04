export type DashboardResponse = {
    totalGrades: number;
    totalSubjects: number;
    totalTopics: number;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
};

export function toDashboardResponse(data: {
    totalGrades: number;
    totalSubjects: number;
    totalTopics: number;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
}): DashboardResponse {
    return {
        totalGrades: data.totalGrades,
        totalSubjects: data.totalSubjects,
        totalTopics: data.totalTopics,
        totalLessons: data.totalLessons,
        completedLessons: data.completedLessons,
        progressPercentage: data.progressPercentage,
    };
}
