'use client';

import { Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCompleteLesson, useProgress } from '@/hooks/use-progress';
import { useLanguage } from '@/i18n/language-context';

type CompleteLessonButtonProps = {
    lessonId: string;
};

export function CompleteLessonButton({ lessonId }: CompleteLessonButtonProps) {
    const { data: progresses = [] } = useProgress();
    const { mutate, isPending } = useCompleteLesson();
    const { translations } = useLanguage();

    const completed = progresses.some(
        (progress) => progress.lessonId === lessonId && progress.completed,
    );

    return (
        <Button
            disabled={completed || isPending}
            onClick={() => mutate({ lessonId })}
        >
            {isPending ? (
                <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {translations.common.loading}
                </>
            ) : completed ? (
                <>
                    <Check className='mr-2 h-4 w-4' />
                    {translations.lesson.completedBadge}
                </>
            ) : (
                translations.lesson.completeLesson
            )}
        </Button>
    );
}
