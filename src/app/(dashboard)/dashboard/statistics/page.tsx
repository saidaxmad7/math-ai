'use client';

import { BookMarked, CheckCircle2, FileText, Library, ChartColumn } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useStatistics } from '@/hooks/use-statistics';
import { useLanguage } from '@/i18n/language-context';

function formatDate(date: Date | string | null | undefined, locale: string) {
    if (!date) {
        return locale === 'uz' ? 'Sana mavjud emas' : 'No date';
    }

    const parsed = typeof date === 'object' && date instanceof Date ? date : new Date(date);
    if (isNaN(parsed.getTime())) {
        return locale === 'uz' ? 'Sana mavjud emas' : 'No date';
    }

    try {
        return new Intl.DateTimeFormat(locale === 'uz' ? 'uz-UZ' : 'en-US', {
            dateStyle: 'medium',
        }).format(parsed);
    } catch {
        return locale === 'uz' ? 'Sana mavjud emas' : 'No date';
    }
}

export default function StatisticsPage() {
    const { data: statistics, isLoading, isError } = useStatistics();
    const { translations, language } = useLanguage();

    if (isLoading) {
        return (
            <div className='space-y-8'>
                <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                        <ChartColumn className='size-4' />
                        {translations.navigation.statistics}
                    </div>
                    <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                        {translations.statistics.title}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        {translations.statistics.loading}
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !statistics) {
        return (
            <div className='space-y-8'>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    {translations.statistics.title}
                </h1>
                <Card className='border-destructive/30 bg-destructive/5'>
                    <CardContent className='py-8 text-sm text-destructive text-center'>
                        {translations.statistics.loadError}
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = [
        {
            label: translations.statistics.totalLessons,
            value: statistics.totalLessons,
            icon: Library,
        },
        {
            label: translations.statistics.completedLessons,
            value: statistics.completedLessons,
            icon: CheckCircle2,
        },
        {
            label: translations.statistics.savedLessons,
            value: statistics.totalBookmarks,
            icon: BookMarked,
        },
        {
            label: translations.statistics.notesCount,
            value: statistics.totalNotes,
            icon: FileText,
        },
    ];

    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <ChartColumn className='size-4' />
                    {translations.navigation.statistics}
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    {translations.statistics.title}
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    {translations.statistics.subtitle}
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.label} className='shadow-xs'>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                    {stat.label}
                                </CardTitle>
                                <Icon className='h-5 w-5 text-muted-foreground' />
                            </CardHeader>
                            <CardContent>
                                <p className='text-3xl font-bold'>
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
                <Card className='shadow-xs'>
                    <CardHeader>
                        <CardTitle>{translations.statistics.overallResult}</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-muted-foreground'>
                                {language === 'uz'
                                    ? `${statistics.totalLessons} ta darsdan ${statistics.completedLessons} tasi tugatilgan`
                                    : `${statistics.completedLessons} of ${statistics.totalLessons} lessons completed`}
                            </span>
                            <span className='font-semibold'>
                                {statistics.progressPercentage}%
                            </span>
                        </div>
                        <Progress value={statistics.progressPercentage} className='h-2.5' />
                        <p className='text-xs text-muted-foreground'>
                            {translations.statistics.recentActivity}{' '}
                            {statistics.recentActivityCount}
                        </p>
                    </CardContent>
                </Card>

                <Card className='shadow-xs'>
                    <CardHeader>
                        <CardTitle>{translations.statistics.recentlyCompleted}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statistics.recentCompletedLessons.length === 0 ? (
                            <p className='text-sm text-muted-foreground'>
                                {translations.statistics.noCompletedYet}
                            </p>
                        ) : (
                            <div className='space-y-4'>
                                {statistics.recentCompletedLessons.map(
                                    (lesson) => (
                                        <div
                                            key={lesson.id}
                                            className='flex items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0'
                                        >
                                            <p className='font-medium text-sm'>
                                                {lesson.lesson.title}
                                            </p>
                                            <p className='shrink-0 text-xs text-muted-foreground'>
                                                {formatDate(lesson.completedAt, language)}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
