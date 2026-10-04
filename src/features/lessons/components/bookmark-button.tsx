"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    useBookmarks,
    useToggleBookmark,
} from "@/features/bookmarks/hooks/use-bookmarks";

type BookmarkButtonProps = {
    lessonId: string;
};

export function BookmarkButton({ lessonId }: BookmarkButtonProps) {
    const { data: bookmarks } = useBookmarks();
    const toggleBookmark = useToggleBookmark();

    const isBookmarked = bookmarks?.some(
        (bookmark) => bookmark.lesson.id === lessonId,
    );

    const handleToggle = () => {
        toggleBookmark.mutate(lessonId);
    };

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={handleToggle}
            disabled={toggleBookmark.isPending}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
            {isBookmarked ? (
                <BookmarkCheck className='h-5 w-5' />
            ) : (
                <Bookmark className='h-5 w-5' />
            )}
        </Button>
    );
}
