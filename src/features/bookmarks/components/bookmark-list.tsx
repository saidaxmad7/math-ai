"use client";

import Link from "next/link";
import { BookmarkIcon, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarks } from "@/features/bookmarks/hooks/use-bookmarks";

import { BookmarkCard } from "./bookmark-card";

export function BookmarksList() {
    const { data, isPending, isRefetching, error, refetch } = useBookmarks();

    const isLoading = isPending || isRefetching;

    if (isLoading) {
        return (
            <div
                className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'
                aria-busy='true'
            >
                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        key={index}
                        className='rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm'
                    >
                        <div className='space-y-3'>
                            <Skeleton className='h-6 w-3/4' />
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-5/6' />
                            <div className='flex items-center justify-between gap-3 pt-2'>
                                <Skeleton className='h-7 w-24' />
                                <Skeleton className='h-7 w-24' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <section
                aria-labelledby='bookmarks-error-title'
                className='rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center shadow-sm'
            >
                <h3
                    id='bookmarks-error-title'
                    className='text-lg font-semibold'
                >
                    We could not load your bookmarks
                </h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                    {error instanceof Error
                        ? error.message
                        : "Please try again in a moment."}
                </p>
                <Button
                    type='button'
                    variant='outline'
                    className='mt-5'
                    onClick={() => void refetch()}
                >
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Retry
                </Button>
            </section>
        );
    }

    if (!data?.length) {
        return (
            <section
                aria-labelledby='bookmarks-empty-title'
                className='rounded-2xl border border-dashed border-border/70 bg-card/50 p-8 text-center shadow-sm'
            >
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <BookmarkIcon className='h-6 w-6' />
                </div>
                <h3
                    id='bookmarks-empty-title'
                    className='mt-5 text-xl font-semibold'
                >
                    No bookmarks yet
                </h3>
                <p className='mx-auto mt-2 max-w-md text-sm text-muted-foreground'>
                    Save lessons you want to revisit later and they will appear
                    here.
                </p>
                <Link
                    href='/dashboard/subjects'
                    className={buttonVariants({
                        variant: "default",
                        size: "default",
                        className: "mt-6",
                    })}
                >
                    Browse Lessons
                </Link>
            </section>
        );
    }

    return (
        <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {data.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
}
