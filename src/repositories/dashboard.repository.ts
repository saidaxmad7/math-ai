import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId: string) {
    const [
        totalGrades,
        totalSubjects,
        totalTopics,
        totalLessons,
        completedLessons,
    ] = await Promise.all([
        prisma.grade.count(),
        prisma.subject.count(),
        prisma.topic.count(),
        prisma.lesson.count(),
        prisma.progress.count({
            where: {
                userId,
                completed: true,
            },
        }),
    ]);

    return {
        totalGrades,
        totalSubjects,
        totalTopics,
        totalLessons,
        completedLessons,
    };
}
