'use client';

import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/hooks/use-dashboard';
import { useLanguage } from '@/i18n/language-context';

export function LearningProgress() {
    const { data: dashboard, isLoading } = useDashboard();
    const { translations } = useLanguage();
    const progressPercentage = dashboard?.progressPercentage ?? 0;

    return (
        <div className='rounded-2xl border bg-card p-6 shadow-xs'>
            <div className='mb-6'>
                <h2 className='font-heading text-xl font-semibold'>
                    {translations.dashboard.learningProgressTitle}
                </h2>

                <p className='text-sm text-muted-foreground'>
                    {translations.dashboard.learningProgressSubtitle}
                </p>
            </div>

            <div className='space-y-6'>
                <div>
                    <div className='mb-2 flex items-center justify-between'>
                        <span className='font-medium text-sm'>
                            {translations.dashboard.completedLessons}
                        </span>

                        <span className='text-sm text-muted-foreground font-semibold'>
                            {isLoading
                                ? '...'
                                : (dashboard?.completedLessons ?? 0)}
                            {dashboard && ` / ${dashboard.totalLessons}`}
                        </span>
                    </div>

                    <Progress value={progressPercentage} className='h-2.5' />
                </div>
            </div>
        </div>
    );
}
