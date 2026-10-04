'use client';

import { useState } from 'react';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    HelpCircle,
    Lightbulb,
    Sparkles,
} from 'lucide-react';

import { MathView } from '@/components/math/math-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResolveMistake, useTopicMistakes } from '@/hooks/use-quiz';

type RemedialReviewProps = {
    topicId?: string;
    onBack: () => void;
};

export function RemedialReview({ topicId, onBack }: RemedialReviewProps) {
    const { data: mistakes = [], isLoading, isError } = useTopicMistakes(topicId);
    const resolveMistake = useResolveMistake();
    const [activeTab, setActiveTab] = useState<number>(0);

    if (isLoading) {
        return (
            <Card>
                <CardContent className='py-12 text-center text-sm text-muted-foreground'>
                    Xatolar tahlili yuklanmoqda...
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card>
                <CardContent className='py-8 text-sm text-destructive'>
                    Xatoliklarni yuklab bo&apos;lmadi.
                </CardContent>
            </Card>
        );
    }

    if (mistakes.length === 0) {
        return (
            <Card className='border-emerald-500/20 bg-emerald-50/10'>
                <CardHeader className='text-center'>
                    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950'>
                        <CheckCircle2 className='h-6 w-6' />
                    </div>
                    <CardTitle className='mt-2 text-xl font-bold text-emerald-700 dark:text-emerald-300'>
                        Ajoyib natija!
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-center'>
                    <p className='text-sm text-muted-foreground'>
                        Hozirda sizda o&apos;zlashtirilmagan xatolar yo&apos;q. Barcha misollarni muvaffaqiyatli bajargansiz!
                    </p>
                    <Button onClick={onBack} variant='outline' className='gap-2'>
                        <ArrowLeft className='h-4 w-4' />
                        Mavzularga qaytish
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const currentMistake = mistakes[activeTab] || mistakes[0];

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <Button variant='outline' size='sm' onClick={onBack} className='gap-2'>
                    <ArrowLeft className='h-4 w-4' />
                    Ortga qaytish
                </Button>
                <Badge variant='outline' className='border-amber-500 text-amber-700 dark:text-amber-300'>
                    O&apos;rganilishi kerak bo&apos;lgan xatolar: {mistakes.length} ta
                </Badge>
            </div>

            {/* Mistake selector tabs */}
            <div className='flex flex-wrap gap-2 border-b pb-3'>
                {mistakes.map((m, idx) => (
                    <button
                        key={m.id}
                        type='button'
                        onClick={() => setActiveTab(idx)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            activeTab === idx
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'bg-muted hover:bg-muted/80 text-foreground'
                        }`}
                    >
                        Xato #{idx + 1} ({m.topicTitle})
                    </button>
                ))}
            </div>

            {/* Mistake details */}
            <div className='grid gap-6 lg:grid-cols-2'>
                {/* Left Column: Original Mistake & Explanation */}
                <div className='space-y-4'>
                    <Card className='border-rose-500/30'>
                        <CardHeader className='pb-3'>
                            <div className='flex items-center gap-2 text-rose-600'>
                                <HelpCircle className='h-5 w-5' />
                                <CardTitle className='text-base font-bold'>
                                    Xato qilingan savol
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='rounded-lg bg-muted/30 p-3'>
                                <MathView content={currentMistake.question} />
                            </div>

                            <p className='text-xs font-semibold text-muted-foreground'>
                                To&apos;g&apos;ri javob: <span className='text-emerald-600 font-bold'>{currentMistake.correctAnswer}</span>
                                {currentMistake.correctCustomAnswer ? ` (${currentMistake.correctCustomAnswer})` : ''}
                            </p>

                            <div className='rounded-lg border border-rose-200 bg-rose-50/50 p-3 dark:border-rose-900/50 dark:bg-rose-950/20'>
                                <p className='text-xs font-bold text-rose-700 dark:text-rose-300'>
                                    To&apos;liq yechim va tushuntirish:
                                </p>
                                <div className='mt-2 text-sm'>
                                    <MathView content={currentMistake.explanation} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Button to mark as resolved */}
                    <Card className='border-primary/20'>
                        <CardContent className='flex items-center justify-between p-4'>
                            <div>
                                <p className='text-sm font-semibold'>Mavzuni tushundingizmi?</p>
                                <p className='text-xs text-muted-foreground'>
                                    Ushbu xatoni bartaraf etilgan deb belgilang.
                                </p>
                            </div>
                            <Button
                                onClick={() =>
                                    resolveMistake.mutate(currentMistake.id, {
                                        onSuccess: () => {
                                            if (activeTab > 0) setActiveTab(activeTab - 1);
                                        },
                                    })
                                }
                                disabled={resolveMistake.isPending}
                                className='gap-2 bg-emerald-600 text-white hover:bg-emerald-700'
                            >
                                <CheckCircle2 className='h-4 w-4' />
                                O&apos;zlashtirdim
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Similar Worked Example + Practice */}
                <div className='space-y-4'>
                    {/* Worked Example */}
                    {currentMistake.remedialExample ? (
                        <Card className='border-primary/30 shadow-sm'>
                            <CardHeader className='pb-3'>
                                <div className='flex items-center gap-2 text-primary'>
                                    <Lightbulb className='h-5 w-5 text-amber-500' />
                                    <CardTitle className='text-base font-bold'>
                                        Namunaviy o&apos;xshash misol (Yechimi bilan)
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='rounded-lg border bg-card p-3'>
                                    <p className='text-xs font-semibold uppercase text-muted-foreground'>
                                        {currentMistake.remedialExample.title}
                                    </p>
                                    <div className='mt-1 font-medium'>
                                        <MathView content={currentMistake.remedialExample.question} />
                                    </div>
                                </div>

                                {currentMistake.remedialExample.ruleSummary && (
                                    <div className='rounded-lg border-l-4 border-amber-500 bg-amber-50/50 p-3 text-xs dark:bg-amber-950/20'>
                                        <p className='font-bold text-amber-800 dark:text-amber-200'>Qoida:</p>
                                        <MathView content={currentMistake.remedialExample.ruleSummary} />
                                    </div>
                                )}

                                <div>
                                    <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                        Qadamma-qadam yechim:
                                    </p>
                                    <div className='mt-1 rounded-lg border bg-muted/20 p-3 text-sm'>
                                        <MathView content={currentMistake.remedialExample.solution} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className='py-8 text-center text-sm text-muted-foreground'>
                                Ushbu mavzuga oid namunaviy misol tayyorlanmoqda.
                            </CardContent>
                        </Card>
                    )}

                    {/* Remedial practice question */}
                    {currentMistake.remedialQuestion && (
                        <Card className='border-emerald-500/30'>
                            <CardHeader className='pb-3'>
                                <div className='flex items-center gap-2 text-emerald-600'>
                                    <Sparkles className='h-5 w-5' />
                                    <CardTitle className='text-base font-bold'>
                                        Bilimni sinash uchun yangi masala
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                <div className='rounded-lg bg-muted/30 p-3'>
                                    <MathView content={currentMistake.remedialQuestion.question} />
                                </div>

                                <div className='grid grid-cols-2 gap-2'>
                                    {currentMistake.remedialQuestion.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className='rounded-md border p-2 text-xs font-medium'
                                        >
                                            <MathView content={opt} />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
