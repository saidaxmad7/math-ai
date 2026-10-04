'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { BookResponse } from '@/mappers/book.mapper';

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export function useBooks() {
    return useQuery<BookResponse[]>({
        queryKey: ['books'],
        queryFn: async () => {
            const { data } = await axios.get<ApiResponse<BookResponse[]>>(
                '/api/admin/books',
            );
            if (!data.success) {
                throw new Error(data.message || 'Kitoblarni yuklab bo\'lmadi');
            }
            return data.data;
        },
    });
}

export function useUploadBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.post<ApiResponse<BookResponse>>(
                '/api/admin/books',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            if (!data.success) {
                throw new Error(data.message || 'Kitobni yuklashda xatolik');
            }
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });
}

export function useParseBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookId: string) => {
            const { data } = await axios.post<ApiResponse<unknown>>(
                `/api/admin/books/${bookId}/parse`,
            );
            if (!data.success) {
                throw new Error(data.message || 'Kitobni tahlil qilishda xatolik');
            }
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['practice'] });
        },
    });
}
