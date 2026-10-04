'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Check, RotateCcw, Award } from 'lucide-react';
import { Markdown } from '@/components/math/markdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PracticeQuestionItem = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    correctCustomAnswer?: string | null;
    explanation: string;
    hint?: string | null;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    order: number;
};

type InLessonQuizProps = {
    questions: PracticeQuestionItem[];
};

export function InLessonQuiz({ questions }: InLessonQuizProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

    if (!questions || questions.length === 0) {
        return null;
    }

    const handleSelectOption = (questionId: string, optionChar: string) => {
        if (checkedQuestions[questionId]) return; // locked after check
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionChar,
        }));
    };

    const handleCheckAnswer = (questionId: string) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            [questionId]: true,
        }));
    };

    const handleResetQuestion = (questionId: string) => {
        setCheckedQuestions((prev) => {
            const next = { ...prev };
            delete next[questionId];
            return next;
        });
        setSelectedAnswers((prev) => {
            const next = { ...prev };
            delete next[questionId];
            return next;
        });
    };

    // Calculate score
    const checkedCount = Object.keys(checkedQuestions).length;
    const correctCount = questions.filter((q) => {
        if (!checkedQuestions[q.id]) return false;
        const selected = selectedAnswers[q.id];
        return selected === q.correctAnswer;
    }).length;

    return (
        <section className='space-y-6 pt-6'>
            <div className='flex items-center justify-between border-b pb-4'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                        <Award className='h-5 w-5' />
                    </div>
                    <div>
                        <h2 className='font-heading text-2xl font-bold tracking-tight text-foreground'>
                            Mini tekshiruv (Bilimingizni sinang)
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                            Darsni qay darajada o‘zlashtirganingizni aniqlovchi tezkor savollar
                        </p>
                    </div>
                </div>

                {checkedCount > 0 && (
                    <div className='flex items-center gap-2 rounded-xl border bg-muted/40 px-3.5 py-1.5 text-xs font-semibold'>
                        <span>Natija:</span>
                        <span className='text-emerald-600 dark:text-emerald-400 font-bold'>
                            {correctCount} / {questions.length} to‘g‘ri
                        </span>
                    </div>
                )}
            </div>

            <div className='space-y-6'>
                {questions.map((q, qIndex) => {
                    const isChecked = Boolean(checkedQuestions[q.id]);
                    const selected = selectedAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                        <div
                            key={q.id}
                            className={cn(
                                'rounded-2xl border bg-card p-6 transition-all duration-200',
                                isChecked
                                    ? isCorrect
                                        ? 'border-emerald-500/50 bg-emerald-500/[0.02]'
                                        : 'border-rose-500/50 bg-rose-500/[0.02]'
                                    : 'border-border'
                            )}
                        >
                            {/* Question Title */}
                            <div className='flex items-start gap-3'>
                                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary mt-0.5'>
                                    {qIndex + 1}
                                </span>
                                <div className='font-medium text-foreground text-base'>
                                    <Markdown content={q.question} />
                                </div>
                            </div>

                            {/* Options */}
                            <div className='mt-5 grid gap-2.5 sm:grid-cols-2'>
                                {q.options.map((opt, optIndex) => {
                                    // Extract letter: "A) ..." -> "A"
                                    const letterMatch = opt.match(/^([A-Da-d])[\)\.]/);
                                    const letter = letterMatch ? letterMatch[1].toUpperCase() : String.fromCharCode(65 + optIndex);
                                    const isSelected = selected === letter;
                                    const isThisCorrect = isChecked && letter === q.correctAnswer;
                                    const isThisWrong = isChecked && isSelected && !isCorrect;

                                    return (
                                        <button
                                            key={optIndex}
                                            type='button'
                                            disabled={isChecked}
                                            onClick={() => handleSelectOption(q.id, letter)}
                                            className={cn(
                                                'flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-medium transition-all duration-150',
                                                isChecked
                                                    ? isThisCorrect
                                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                                        : isThisWrong
                                                        ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                                                        : 'border-border/60 opacity-60'
                                                    : isSelected
                                                    ? 'border-primary bg-primary/10 text-primary shadow-xs'
                                                    : 'border-border bg-card/60 hover:border-primary/50 hover:bg-muted/40'
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold',
                                                    isChecked
                                                        ? isThisCorrect
                                                            ? 'bg-emerald-500 text-white'
                                                            : isThisWrong
                                                            ? 'bg-rose-500 text-white'
                                                            : 'bg-muted text-muted-foreground'
                                                        : isSelected
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted text-foreground'
                                                )}
                                            >
                                                {isChecked && isThisCorrect ? (
                                                    <Check className='h-3.5 w-3.5' />
                                                ) : isChecked && isThisWrong ? (
                                                    <XCircle className='h-3.5 w-3.5' />
                                                ) : (
                                                    letter
                                                )}
                                            </span>
                                            <span className='flex-1'>
                                                <Markdown content={opt.replace(/^[A-Da-d][\)\.]\s*/, '')} />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action Button */}
                            {!isChecked ? (
                                <div className='mt-4 flex justify-end'>
                                    <Button
                                        size='sm'
                                        disabled={!selected}
                                        onClick={() => handleCheckAnswer(q.id)}
                                        className='font-semibold'
                                    >
                                        Tekshirish
                                    </Button>
                                </div>
                            ) : (
                                <div className='mt-5 space-y-3 pt-4 border-t animate-in fade-in-50 duration-200'>
                                    {/* Feedback message */}
                                    <div
                                        className={cn(
                                            'flex items-center justify-between rounded-xl p-3.5 text-sm font-semibold',
                                            isCorrect
                                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                                : 'bg-rose-500/10 text-rose-700 dark:text-rose-300'
                                        )}
                                    >
                                        <div className='flex items-center gap-2'>
                                            {isCorrect ? (
                                                <>
                                                    <CheckCircle className='h-5 w-5 text-emerald-500' />
                                                    <span>To‘g‘ri javob! Ajoyib natija.</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className='h-5 w-5 text-rose-500' />
                                                    <span>Noto‘g‘ri javob. To‘g‘ri variant: {q.correctAnswer}</span>
                                                </>
                                            )}
                                        </div>

                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => handleResetQuestion(q.id)}
                                            className='h-7 gap-1 text-xs'
                                        >
                                            <RotateCcw className='h-3.5 w-3.5' />
                                            <span>Qayta ishlash</span>
                                        </Button>
                                    </div>

                                    {/* Explanation */}
                                    {q.explanation && (
                                        <div className='rounded-xl border bg-muted/30 p-4 text-sm text-foreground/90 space-y-1.5'>
                                            <span className='font-semibold text-primary block'>
                                                📖 Tushuntirish va yechim:
                                            </span>
                                            <Markdown content={q.explanation} />
                                        </div>
                                    )}

                                    {/* Hint if exists and user made error */}
                                    {!isCorrect && q.hint && (
                                        <div className='rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200'>
                                            <span className='font-bold'>💡 Eslatma: </span>
                                            {q.hint}
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
