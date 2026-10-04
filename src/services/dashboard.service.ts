import { getDashboardStats as getDashboardStatsFromRepository } from "@/repositories/dashboard.repository";

export async function getDashboardStats(userId: string) {
    const stats = await getDashboardStatsFromRepository(userId);

    const progressPercentage =
        stats.totalLessons === 0
            ? 0
            : Math.round((stats.completedLessons / stats.totalLessons) * 100);

    return {
        ...stats,
        progressPercentage,
    };
}
