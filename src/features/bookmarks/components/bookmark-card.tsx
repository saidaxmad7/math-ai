import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";

import type { BookmarkResponse } from "@/mappers/bookmark.mapper";

type BookmarkCardProps = {
    bookmark: BookmarkResponse;
};

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
    return (
        <Link
            href={`/dashboard/lessons/${bookmark.lesson.slug}`}
            aria-label={`Open lesson ${bookmark.lesson.title}`}
            className='group block rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
            <div className='space-y-4'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
                        <BookOpenText className='h-3.5 w-3.5' />
                        Saved lesson
                    </div>
                    <span className='rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary'>
                        Lesson {bookmark.lesson.order}
                    </span>
                </div>

                <div>
                    <h3 className='text-lg font-semibold transition-colors group-hover:text-primary'>
                        {bookmark.lesson.title}
                    </h3>
                    <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>
                        {bookmark.lesson.description ??
                            "No description available."}
                    </p>
                </div>

                <div className='flex items-center justify-between gap-3'>
                    <span className='inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'>
                        {bookmark.lesson.topic.title}
                    </span>

                    <span className='flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1'>
                        Open
                        <ArrowRight className='h-4 w-4' />
                    </span>
                </div>
            </div>
        </Link>
    );
}
