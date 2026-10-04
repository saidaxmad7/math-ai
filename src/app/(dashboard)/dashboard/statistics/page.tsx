'use client';

import { BookMarked, CheckCircle2, FileText, Library } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useStatistics } from '@/hooks/use-statistics';

function formatDate(date: Date | string | null | undefined) {
    if (!date) {
        return 'Sana mavjud emas';
    }

    const parsed = typeof date === 'object' && date instanceof Date ? date : new Date(date);
    if (isNaN(parsed.getTime())) {
        return 'Sana mavjud emas';
    }

    try {
        return new Intl.DateTimeFormat('uz-UZ', {
            dateStyle: 'medium',
        }).format(parsed);
    } catch {
        return 'Sana mavjud emas';
    }
}


export default function StatisticsPage() {
    const { data: statistics, isLoading, isError } = useStatistics();

    if (isLoading) {
        return (
            <div className='space-y-8'>
                <div>
                    <h1 className='font-heading text-4xl font-bold'>
                        Statistika
                    </h1>
                    <p className='mt-2 text-muted-foreground'>
                        O&apos;quv statistikangiz yuklanmoqda...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !statistics) {
        return (
            <div className='space-y-8'>
                <h1 className='font-heading text-4xl font-bold'>Statistika</h1>
                <Card>
                    <CardContent className='py-8 text-sm text-destructive'>
                        Statistikani yuklab bo&apos;lmadi.
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = [
        {
            label: 'Jami darslar',
            value: statistics.totalLessons,
            icon: Library,
        },
        {
            label: 'Tugatilgan darslar',
            value: statistics.completedLessons,
            icon: CheckCircle2,
        },
        {
            label: 'Saqlangan darslar',
            value: statistics.totalBookmarks,
            icon: BookMarked,
        },
        {
            label: 'Eslatmalar',
            value: statistics.totalNotes,
            icon: FileText,
        },
    ];

    return (
        <div className='space-y-8'>
            <div>
                <h1 className='font-heading text-4xl font-bold'>Statistika</h1>
                <p className='mt-2 text-muted-foreground'>
                    O&apos;quv faoliyatingiz va natijalaringiz.
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.label}>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Umumiy natija</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-muted-foreground'>
                                {statistics.totalLessons} ta darsdan{' '}
                                {statistics.completedLessons} tasi tugatilgan
                            </span>
                            <span className='font-semibold'>
                                {statistics.progressPercentage}%
                            </span>
                        </div>
                        <Progress value={statistics.progressPercentage} />
                        <p className='text-sm text-muted-foreground'>
                            So&apos;nggi faollik:{' '}
                            {statistics.recentActivityCount}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Yaqinda tugatilgan darslar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statistics.recentCompletedLessons.length === 0 ? (
                            <p className='text-sm text-muted-foreground'>
                                Hali tugatilgan darslar yo&apos;q.
                            </p>
                        ) : (
                            <div className='space-y-4'>
                                {statistics.recentCompletedLessons.map(
                                    (lesson) => (
                                        <div
                                            key={lesson.id}
                                            className='flex items-center justify-between gap-4'
                                        >
                                            <p className='font-medium'>
                                                {lesson.lesson.title}
                                            </p>
                                            <p className='shrink-0 text-sm text-muted-foreground'>
                                                {formatDate(lesson.completedAt)}
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
