export type BookmarkResponse = {
    id: string;
    createdAt: Date;
    lesson: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        order: number;
        topic: {
            id: string;
            title: string;
        };
    };
};

type BookmarkWithLessonAndTopic = {
    id: string;
    createdAt: Date;
    lesson: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        order: number;
        topic: {
            id: string;
            title: string;
        };
    };
};

export function mapBookmark(
    bookmark: BookmarkWithLessonAndTopic,
): BookmarkResponse {
    return {
        id: bookmark.id,
        createdAt: bookmark.createdAt,
        lesson: {
            id: bookmark.lesson.id,
            title: bookmark.lesson.title,
            slug: bookmark.lesson.slug,
            description: bookmark.lesson.description,
            order: bookmark.lesson.order,
            topic: {
                id: bookmark.lesson.topic.id,
                title: bookmark.lesson.topic.title,
            },
        },
    };
}

export function mapBookmarks(
    bookmarks: BookmarkWithLessonAndTopic[],
): BookmarkResponse[] {
    return bookmarks.map(mapBookmark);
}
