'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
import { Markdown } from '@/components/math/markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/language-context';

export type WorkedExampleItem = {
    id: string;
    title: string;
    question: string;
    solution: string;
    ruleSummary?: string | null;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    order: number;
};

type WorkedExamplesSectionProps = {
    examples: WorkedExampleItem[];
};

export function WorkedExamplesSection({ examples }: WorkedExamplesSectionProps) {
    const { language } = useLanguage();
    const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
        if (examples.length > 0) {
            return { [examples[0].id]: true };
        }
        return {};
    });

    if (!examples || examples.length === 0) {
        return null;
    }

    const toggleExample = (id: string) => {
        setExpandedIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getDifficultyBadge = (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => {
        switch (difficulty) {
            case 'EASY':
                return (
                    <Badge variant='outline' className='border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-xs'>
                        {language === 'uz' ? '🟢 Oson daraja' : '🟢 Easy'}
                    </Badge>
                );
            case 'HARD':
                return (
                    <Badge variant='outline' className='border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium text-xs'>
                        {language === 'uz' ? '🔴 Murakkab daraja' : '🔴 Advanced'}
                    </Badge>
                );
            case 'MEDIUM':
            default:
                return (
                    <Badge variant='outline' className='border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-xs'>
                        {language === 'uz' ? '🟡 O‘rtacha daraja' : '🟡 Intermediate'}
                    </Badge>
                );
        }
    };

    return (
        <section className='space-y-6 pt-4'>
            <div className='flex items-center gap-3 border-b pb-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                    <Sparkles className='h-5 w-5' />
                </div>
                <div>
                    <h2 className='font-heading text-2xl font-bold tracking-tight text-foreground'>
                        {language === 'uz' ? 'Namunaviy yechilgan misollar' : 'Step-by-step Worked Examples'}
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        {language === 'uz'
                            ? 'Darslikdagi masalalar va ularning qadam-baqadam yechish algoritmi'
                            : 'Textbook problems and their complete step-by-step solution algorithms'}
                    </p>
                </div>
            </div>

            <div className='grid gap-4'>
                {examples.map((ex, index) => {
                    const isExpanded = Boolean(expandedIds[ex.id]);

                    return (
                        <div
                            key={ex.id}
                            className={cn(
                                'overflow-hidden rounded-2xl border bg-card transition-all duration-200',
                                isExpanded ? 'border-primary/40 shadow-sm' : 'hover:border-border/80'
                            )}
                        >
                            {/* Card Header */}
                            <div
                                onClick={() => toggleExample(ex.id)}
                                className='flex cursor-pointer items-start justify-between gap-4 p-5 hover:bg-muted/30 transition-colors'
                            >
                                <div className='flex items-start gap-3.5'>
                                    <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-foreground/80 mt-0.5'>
                                        {index + 1}
                                    </span>
                                    <div>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <h3 className='font-heading text-base font-semibold text-foreground'>
                                                {ex.title}
                                            </h3>
                                            {getDifficultyBadge(ex.difficulty)}
                                        </div>
                                        <div className='mt-2 text-foreground/90'>
                                            <Markdown content={ex.question} />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='shrink-0 gap-1.5 text-xs font-medium'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExample(ex.id);
                                    }}
                                >
                                    <span>
                                        {isExpanded
                                            ? (language === 'uz' ? 'Yashirish' : 'Hide')
                                            : (language === 'uz' ? 'Yechimni ko‘rish' : 'View Solution')}
                                    </span>
                                    {isExpanded ? (
                                        <ChevronUp className='h-4 w-4 text-muted-foreground' />
                                    ) : (
                                        <ChevronDown className='h-4 w-4 text-muted-foreground' />
                                    )}
                                </Button>
                            </div>

                            {/* Card Solution Body */}
                            {isExpanded && (
                                <div className='border-t bg-muted/20 p-5 space-y-4 animate-in fade-in-50 duration-200'>
                                    <div className='flex items-center gap-2 text-sm font-semibold text-primary'>
                                        <CheckCircle2 className='h-4 w-4' />
                                        <span>
                                            {language === 'uz' ? 'Bosqichma-bosqich yechim:' : 'Step-by-step solution:'}
                                        </span>
                                    </div>

                                    <div className='rounded-xl border bg-card p-4'>
                                        <Markdown content={ex.solution} />
                                    </div>

                                    {ex.ruleSummary && (
                                        <div className='flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground/90'>
                                            <Lightbulb className='h-4 w-4 shrink-0 text-amber-500 mt-0.5' />
                                            <div>
                                                <span className='font-semibold text-amber-800 dark:text-amber-200 block mb-1'>
                                                    {language === 'uz' ? 'Qo‘llanilgan asosiy qoida:' : 'Key rule applied:'}
                                                </span>
                                                <Markdown content={ex.ruleSummary} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
