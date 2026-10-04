"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { BookmarkResponse } from "@/mappers/bookmark.mapper";

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

async function fetchBookmarks(): Promise<BookmarkResponse[]> {
    const response = await fetch("/api/bookmarks");

    if (!response.ok) {
        throw new Error("Bookmarks fetch failed");
    }

    const json = (await response.json()) as BookmarksApiResponse;

    if (!json.success) {
        throw new Error(json.message ?? "Bookmarks fetch failed");
    }

    return json.data;
}

async function toggleBookmark(lessonId: string): Promise<{ bookmarked: boolean }> {
    const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lessonId }),
    });

    if (!response.ok) {
        throw new Error("Toggle bookmark failed");
    }

    const json = (await response.json()) as ToggleBookmarkApiResponse;

    if (!json.success) {
        throw new Error(json.message ?? "Toggle bookmark failed");
    }

    return json.data;
}

export function useBookmarks() {
    return useQuery<BookmarkResponse[]>({
        queryKey: ["bookmarks"],
        queryFn: fetchBookmarks,
    });
}

export function useToggleBookmark() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        },
    });
}
