'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    AdminStatsResponse,
    AdminUsersListResponse,
    HardestTopicResponse,
} from '@/mappers/admin.mapper';

type AdminStatsApiResponse = {
    success: boolean;
    data: AdminStatsResponse;
    message: string;
};

type AdminUsersApiResponse = {
    success: boolean;
    data: AdminUsersListResponse;
    message: string;
};

type HardestTopicsApiResponse = {
    success: boolean;
    data: HardestTopicResponse[];
    message: string;
};

type UseAdminUsersParams = {
    search?: string;
    role?: 'ALL' | 'USER' | 'ADMIN';
    page?: number;
    limit?: number;
};

async function fetchAdminStats(): Promise<AdminStatsResponse> {
    const { data } = await axios.get<AdminStatsApiResponse>('/api/admin/stats');
    if (!data.success) {
        throw new Error(data.message || 'Statistika olishda xatolik yuz berdi');
    }
    return data.data;
}

async function fetchAdminUsers(
    params: UseAdminUsersParams,
): Promise<AdminUsersListResponse> {
    const { data } = await axios.get<AdminUsersApiResponse>('/api/admin/users', {
        params,
    });
    if (!data.success) {
        throw new Error(data.message || 'Foydalanuvchilarni olishda xatolik yuz berdi');
    }
    return data.data;
}

async function fetchHardestTopics(): Promise<HardestTopicResponse[]> {
    const { data } = await axios.get<HardestTopicsApiResponse>(
        '/api/admin/hardest-topics',
    );
    if (!data.success) {
        throw new Error(data.message || "Qiyin mavzularni olishda xatolik yuz berdi");
    }
    return data.data;
}

async function updateUserRoleApi(payload: {
    userId: string;
    role: 'USER' | 'ADMIN';
}) {
    const { data } = await axios.patch(
        `/api/admin/users/${payload.userId}/role`,
        { role: payload.role },
    );
    if (!data.success) {
        throw new Error(data.message || "Rolni o'zgartirishda xatolik");
    }
    return data.data;
}

export function useAdminStats() {
    return useQuery<AdminStatsResponse>({
        queryKey: ['admin-stats'],
        queryFn: fetchAdminStats,
    });
}

export function useAdminUsers(params: UseAdminUsersParams = {}) {
    return useQuery<AdminUsersListResponse>({
        queryKey: ['admin-users', params.search, params.role, params.page],
        queryFn: () => fetchAdminUsers(params),
    });
}

export function useAdminHardestTopics() {
    return useQuery<HardestTopicResponse[]>({
        queryKey: ['admin-hardest-topics'],
        queryFn: fetchHardestTopics,
    });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserRoleApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
        },
    });
}

type PinStatusResponse = {
    success: boolean;
    data: { isUnlocked: boolean };
    message: string;
};

async function fetchPinStatus(): Promise<boolean> {
    const { data } = await axios.get<PinStatusResponse>('/api/admin/pin-status');
    return Boolean(data?.data?.isUnlocked);
}

async function verifyPinApi(pin: string) {
    const { data } = await axios.post('/api/admin/verify-pin', { pin });
    if (!data.success) {
        throw new Error(data.message || "Kod noto'g'ri");
    }
    return data;
}

async function lockAdminApi() {
    const { data } = await axios.post('/api/admin/lock');
    return data;
}

export function useAdminPinStatus() {
    return useQuery<boolean>({
        queryKey: ['admin-pin-status'],
        queryFn: fetchPinStatus,
        staleTime: 1000 * 60, // 1 minute
    });
}

export function useVerifyAdminPin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyPinApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pin-status'] });
            queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    });
}

export function useLockAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: lockAdminApi,
        onSuccess: () => {
            queryClient.setQueryData(['admin-pin-status'], false);
            queryClient.invalidateQueries({ queryKey: ['admin-pin-status'] });
        },
    });
}

