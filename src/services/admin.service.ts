import {
    getAdminOverviewStats,
    getAdminUsers,
    getHardestTopicsFromDb,
    updateUserRoleInDb,
} from '@/repositories/admin.repository';
import {
    toAdminStatsResponse,
    toAdminUsersListResponse,
    toHardestTopicsResponse,
    type AdminStatsResponse,
    type AdminUsersListResponse,
    type HardestTopicResponse,
} from '@/mappers/admin.mapper';
import type { AdminUsersQuery } from '@/validations/admin.validation';

export async function getAdminUsersList(
    query: AdminUsersQuery,
): Promise<AdminUsersListResponse> {
    const data = await getAdminUsers(query);
    return toAdminUsersListResponse(data);
}

export async function changeUserRole(
    targetUserId: string,
    role: 'USER' | 'ADMIN',
    currentAdminId: string,
) {
    if (targetUserId === currentAdminId && role !== 'ADMIN') {
        throw new Error("Administrator o'zining adminlik huquqini bekor qila olmaydi.");
    }

    return updateUserRoleInDb(targetUserId, role);
}

export async function getAdminDashboardStats(): Promise<AdminStatsResponse> {
    const rawStats = await getAdminOverviewStats();
    return toAdminStatsResponse(rawStats);
}

export async function getAdminHardestTopics(
    limit = 6,
): Promise<HardestTopicResponse[]> {
    const topics = await getHardestTopicsFromDb(limit);
    return toHardestTopicsResponse(topics);
}
