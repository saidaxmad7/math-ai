'use client';

import { CircleCheckBig } from 'lucide-react';

import { useProgress } from '@/hooks/use-progress';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/i18n/language-context';

export function RecentActivity() {
    const { data: progresses = [], isLoading } = useProgress();
    const { translations, language } = useLanguage();

    const recentProgress = progresses
        .filter((progress) => progress.completed)
        .slice(0, 3);

    return (
        <div className='rounded-2xl border bg-card p-6 shadow-xs'>
            <h2 className='font-heading text-xl font-semibold'>
                {translations.dashboard.recentActivityTitle}
            </h2>

            <div className='mt-6 space-y-5'>
                {isLoading ? (
                    <p className='text-sm text-muted-foreground'>
                        {translations.dashboard.loadingProgress}
                    </p>
                ) : recentProgress.length === 0 ? (
                    <p className='text-sm text-muted-foreground'>
                        {translations.dashboard.noCompletedLessons}
                    </p>
                ) : (
                    recentProgress.map((progress) => (
                        <div
                            key={progress.id}
                            className='flex items-start gap-4'
                        >
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                                <CircleCheckBig className='h-5 w-5 text-primary' />
                            </div>

                            <div>
                                <h3 className='font-medium text-sm'>
                                    {language === 'uz'
                                        ? `${progress.lesson.title} ${translations.dashboard.lessonCompletedSuffix}`
                                        : `${progress.lesson.title} (${translations.dashboard.lessonCompletedSuffix})`}
                                </h3>

                                <p className='text-xs text-muted-foreground mt-0.5'>
                                    {formatDate(progress.completedAt)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
