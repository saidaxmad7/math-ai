import { prisma } from "@/lib/prisma";
import type { Bookmark, Prisma } from "@prisma/client";

type BookmarkWithLessonAndTopic = Prisma.BookmarkGetPayload<{
    include: {
        lesson: {
            include: {
                topic: true;
            };
        };
    };
}>;

export async function getBookmarks(
    userId: string,
): Promise<BookmarkWithLessonAndTopic[]> {
    return prisma.bookmark.findMany({
        where: {
            userId,
        },
        include: {
            lesson: {
                include: {
                    topic: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getBookmark(
    userId: string,
    lessonId: string,
): Promise<BookmarkWithLessonAndTopic | null> {
    return prisma.bookmark.findUnique({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
        include: {
            lesson: {
                include: {
                    topic: true,
                },
            },
        },
    });
}

export async function createBookmark(
    userId: string,
    lessonId: string,
): Promise<Bookmark> {
    return prisma.bookmark.create({
        data: {
            userId,
            lessonId,
        },
    });
}

export async function deleteBookmark(
    userId: string,
    lessonId: string,
): Promise<Bookmark> {
    return prisma.bookmark.delete({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
    });
}
