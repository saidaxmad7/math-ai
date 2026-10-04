"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { BookmarkResponse } from "@/mappers/bookmark.mapper";

export const bookmarksQueryKey = ["bookmarks"] as const;

type BookmarksApiResponse = {
    success: boolean;
    message: string;
    data: BookmarkResponse[];
};

type ToggleBookmarkApiResponse = {
    success: boolean;
    message: string;
    data: {
        bookmarked: boolean;
    };
};

type ToggleBookmarkResult = {
    bookmarked: boolean;
};

async function fetchBookmarks(): Promise<BookmarkResponse[]> {
    const response = await fetch("/api/bookmarks", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookmarks.");
    }

    const payload = (await response.json()) as BookmarksApiResponse;

    if (!payload.success) {
        throw new Error(payload.message || "Failed to fetch bookmarks.");
    }

    return payload.data;
}

async function toggleBookmark(lessonId: string): Promise<ToggleBookmarkResult> {
    const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lessonId }),
    });

    if (!response.ok) {
        throw new Error("Failed to toggle bookmark.");
    }

    const payload = (await response.json()) as ToggleBookmarkApiResponse;

    if (!payload.success) {
        throw new Error(payload.message || "Failed to toggle bookmark.");
    }

    return payload.data;
}

export function useBookmarks() {
    return useQuery<BookmarkResponse[], Error>({
        queryKey: bookmarksQueryKey,
        queryFn: fetchBookmarks,
    });
}

export function useToggleBookmark() {
    const queryClient = useQueryClient();

    return useMutation<ToggleBookmarkResult, Error, string>({
        mutationFn: toggleBookmark,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: bookmarksQueryKey,
            });
        },
    });
}
