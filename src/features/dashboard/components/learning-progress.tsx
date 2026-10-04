'use client';

import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/hooks/use-dashboard';

export function LearningProgress() {
    const { data: dashboard, isLoading } = useDashboard();
    const progressPercentage = dashboard?.progressPercentage ?? 0;

    return (
        <div className='rounded-2xl border bg-card p-6'>
            <div className='mb-6'>
                <h2 className='font-heading text-xl font-semibold'>
                    Learning Progress
                </h2>

                <p className='text-sm text-muted-foreground'>
                    Your progress across mathematics topics.
                </p>
            </div>

            <div className='space-y-6'>
                <div>
                    <div className='mb-2 flex items-center justify-between'>
                        <span className='font-medium'>Completed lessons</span>

                        <span className='text-sm text-muted-foreground'>
                            {isLoading
                                ? '...'
                                : (dashboard?.completedLessons ?? 0)}
                            {dashboard && ` / ${dashboard.totalLessons}`}
                        </span>
                    </div>

                    <Progress value={progressPercentage} />
                </div>
            </div>
        </div>
    );
}
