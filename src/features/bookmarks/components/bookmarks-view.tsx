'use client';

import { Bookmark } from 'lucide-react';
import { BookmarksList } from './bookmark-list';
import { useLanguage } from '@/i18n/language-context';

export function BookmarksView() {
    const { translations } = useLanguage();

    return (
        <div className='space-y-6'>
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <Bookmark className='size-4' />
                    {translations.navigation.bookmarks}
                </div>
                <h1 className='font-heading text-3xl font-bold'>
                    {translations.bookmarks.title}
                </h1>
                <p className='text-sm text-muted-foreground'>
                    {translations.bookmarks.description}
                </p>
            </div>

            <BookmarksList />
        </div>
    );
}
