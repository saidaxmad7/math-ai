import {
    createBookmark,
    deleteBookmark,
    getBookmark,
    getBookmarks,
} from "@/repositories/bookmark.repository";

export async function getBookmarksForUser(userId: string) {
    return getBookmarks(userId);
}

export async function toggleBookmark(userId: string, lessonId: string) {
    const bookmark = await getBookmark(userId, lessonId);

    if (bookmark) {
        await deleteBookmark(userId, lessonId);

        return {
            bookmarked: false,
        };
    }

    await createBookmark(userId, lessonId);

    return {
        bookmarked: true,
    };
}
