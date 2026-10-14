'use client';

import Link from 'next/link';
import { GraduationCap, Brain, ArrowRight, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/i18n/language-context';

type Grade = {
    id: string;
    order: number;
    name: string;
    subjects: {
        id: string;
        name: string;
        color?: string | null;
        _count?: { topics: number };
    }[];
};

interface ClassesViewProps {
    grades: Grade[];
}

export function ClassesView({ grades }: ClassesViewProps) {
    const { translations } = useLanguage();

    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <GraduationCap className='size-4' />
                    {translations.classes.badge}
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold tracking-tight'>
                    {translations.classes.title}
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    {translations.classes.description}
                </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {grades.map((grade) => {
                    const totalTopics = grade.subjects.reduce(
                        (sum, s) => sum + (s._count?.topics ?? 0),
                        0,
                    );

                    return (
                        <Card
                            key={grade.id}
                            className='group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg'
                        >
                            <CardHeader className='pb-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xl transition-transform group-hover:scale-105'>
                                        {grade.order}
                                    </div>
                                    <Badge variant='secondary' className='font-semibold px-3 py-1'>
                                        {totalTopics} {translations.classes.topicsCount}
                                    </Badge>
                                </div>
                                <CardTitle className='mt-4 text-2xl font-bold tracking-tight'>
                                    {grade.name}
                                </CardTitle>
                                <CardDescription className='text-xs sm:text-sm text-muted-foreground'>
                                    {translations.classes.fullCurriculum}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className='space-y-6 pt-2'>
                                <div className='space-y-2.5'>
                                    <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                                        {translations.classes.subjectsAndParts}
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                        {grade.subjects.map((subject) => (
                                            <span
                                                key={subject.id}
                                                className='inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium'
                                            >
                                                <span
                                                    className='size-2.5 rounded-full shrink-0'
                                                    style={{ backgroundColor: subject.color || '#3b82f6' }}
                                                />
                                                <span>{subject.name}</span>
                                                <span className='rounded-md bg-background px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground shadow-2xs'>
                                                    {subject._count?.topics ?? 0}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2.5 pt-4 border-t border-border/60'>
                                    <Link
                                        href={`/dashboard/grades/${grade.id}`}
                                        className='group/btn flex h-10 w-full items-center justify-between rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.99]'
                                    >
                                        <span>{translations.classes.exploreTopics}</span>
                                        <ArrowRight className='size-4 shrink-0 transition-transform group-hover/btn:translate-x-1' />
                                    </Link>

                                    <Link
                                        href={`/dashboard/practice?gradeId=${grade.id}`}
                                        className='group/btn flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 text-xs font-medium text-foreground transition-all hover:border-border hover:bg-muted/50'
                                    >
                                        <span className='flex items-center gap-2'>
                                            <Brain className='size-3.5 shrink-0 text-primary' />
                                            {translations.classes.interactiveQuizzes}
                                        </span>
                                        <span className='flex items-center gap-1 text-muted-foreground group-hover/btn:text-foreground'>
                                            {translations.classes.start}
                                            <ChevronRight className='size-3 shrink-0' />
                                        </span>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
