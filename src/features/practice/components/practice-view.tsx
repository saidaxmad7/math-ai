'use client';

import { Brain } from 'lucide-react';
import { PracticeList } from './practice-list';
import { useLanguage } from '@/i18n/language-context';

export function PracticeView() {
    const { translations } = useLanguage();

    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <Brain className='size-4' />
                    {translations.navigation.practice}
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    {translations.practice.title}
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    {translations.practice.subtitle}
                </p>
            </div>

            <PracticeList />
        </div>
    );
}
