'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PracticeLessonResponse } from '@/mappers/practice.mapper';
import { useLanguage } from '@/i18n/language-context';

type PracticeCardProps = {
    lesson: PracticeLessonResponse;
    onStartQuiz?: (topicId: string, topicTitle: string) => void;
};

function formatCompletionDate(date: Date | string | null | undefined, locale: string) {
    if (!date) {
        return null;
    }

    const parsed = typeof date === 'object' && date instanceof Date ? date : new Date(date);
    if (isNaN(parsed.getTime())) {
        return null;
    }

    try {
        return new Intl.DateTimeFormat(locale === 'uz' ? 'uz-UZ' : 'en-US', {
            dateStyle: 'medium',
        }).format(parsed);
    } catch {
        return null;
    }
}

export function PracticeCard({ lesson, onStartQuiz }: PracticeCardProps) {
    const { translations, language } = useLanguage();

    return (
        <Card className='flex h-full flex-col justify-between transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md'>
            <CardHeader>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                            {lesson.topic.subject.grade.name} ·{' '}
                            {lesson.topic.subject.name}
                        </p>
                        <CardTitle className='mt-2 text-lg font-bold'>
                            {lesson.title}
                        </CardTitle>
                    </div>
                    <Badge variant={lesson.completed ? 'secondary' : 'outline'}>
                        {lesson.completed && <CheckCircle2 className='mr-1 h-3 w-3 text-emerald-500' />}
                        {lesson.completed
                            ? translations.practice.completedStatus
                            : translations.practice.incompleteStatus}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col justify-between gap-6'>
                <div className='space-y-2 text-sm text-muted-foreground'>
                    <p className='font-medium text-foreground'>
                        {language === 'uz' ? 'Mavzu:' : 'Topic:'} {lesson.topic.title}
                    </p>
                    {lesson.description && <p>{lesson.description}</p>}
                    {lesson.completedAt && (
                        <p className='text-xs'>
                            {language === 'uz' ? 'Tugatilgan sana:' : 'Completed on:'}{' '}
                            {formatCompletionDate(lesson.completedAt, language)}
                        </p>
                    )}
                </div>

                <div className='flex flex-wrap items-center gap-2 border-t pt-4'>
                    {onStartQuiz && (
                        <Button
                            size='sm'
                            onClick={() =>
                                onStartQuiz(lesson.topic.id, lesson.topic.title)
                            }
                            className='gap-1.5 bg-primary text-primary-foreground'
                        >
                            <Sparkles className='h-3.5 w-3.5' />
                            AI Test
                        </Button>
                    )}
                    <Link
                        href={`/dashboard/lessons/${lesson.slug}`}
                        className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground'
                    >
                        <BookOpen className='h-3.5 w-3.5' />
                        {language === 'uz' ? "Darsni o'qish" : "Read Lesson"}
                        <ArrowRight className='h-3 w-3' />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
