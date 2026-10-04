'use client';

import { useState } from 'react';
import {
    ArrowRight,
    Award,
    CheckCircle2,
    HelpCircle,
    RotateCcw,
    Sparkles,
    TrendingUp,
    XCircle,
} from 'lucide-react';

import { MathView } from '@/components/math/math-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useStartQuiz, useSubmitAnswer } from '@/hooks/use-quiz';
import type {
    AnswerEvaluationResponse,
    PracticeQuestionResponse,
    QuizSessionResponse,
} from '@/mappers/quiz.mapper';

type AdaptiveQuizProps = {
    topicId: string;
    topicTitle: string;
    onBack?: () => void;
    onGoToRemedial?: () => void;
};

export function AdaptiveQuiz({
    topicId,
    topicTitle,
    onBack,
    onGoToRemedial,
}: AdaptiveQuizProps) {
    const startQuiz = useStartQuiz();
    const submitAnswer = useSubmitAnswer();

    const [session, setSession] = useState<QuizSessionResponse | null>(null);
    const [currentQuestion, setCurrentQuestion] =
        useState<PracticeQuestionResponse | null>(null);

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [useCustomAnswer, setUseCustomAnswer] = useState(false);
    const [customAnswerText, setCustomAnswerText] = useState('');
    const [lastEvaluation, setLastEvaluation] =
        useState<AnswerEvaluationResponse | null>(null);
    const [hasMistakesInSession, setHasMistakesInSession] = useState(false);

    // Initial start
    function handleStart() {
        startQuiz.mutate(topicId, {
            onSuccess: (data) => {
                setSession(data);
                if (data.currentQuestion) {
                    setCurrentQuestion(data.currentQuestion);
                }
                setLastEvaluation(null);
                setSelectedOption('');
                setCustomAnswerText('');
                setUseCustomAnswer(false);
            },
        });
    }

    function handleSubmit() {
        if (!session || !currentQuestion) return;

        const answer = useCustomAnswer ? customAnswerText.trim() : selectedOption;
        if (!answer) return;

        submitAnswer.mutate(
            {
                sessionId: session.id,
                questionId: currentQuestion.id,
                userAnswer: answer,
                isCustomAnswer: useCustomAnswer,
                timeSpentSeconds: 15,
            },
            {
                onSuccess: (evalData) => {
                    setLastEvaluation(evalData);
                    if (!evalData.isCorrect) {
                        setHasMistakesInSession(true);
                    }
                    setSession((prev) =>
                        prev
                            ? {
                                  ...prev,
                                  currentDifficulty: evalData.nextDifficulty,
                                  consecutiveCorrect: evalData.consecutiveCorrect,
                                  totalAnswered: evalData.totalAnswered,
                                  correctAnswers: evalData.correctAnswers,
                                  status: evalData.isSessionCompleted
                                      ? 'COMPLETED'
                                      : 'IN_PROGRESS',
                              }
                            : null,
                    );
                },
            },
        );
    }

    function handleNextQuestion() {
        setLastEvaluation(null);
        setSelectedOption('');
        setCustomAnswerText('');
        setUseCustomAnswer(false);

        // Fetch next question by resuming
        startQuiz.mutate(topicId, {
            onSuccess: (data) => {
                setSession(data);
                if (data.currentQuestion) {
                    setCurrentQuestion(data.currentQuestion);
                } else {
                    // No more questions
                    setCurrentQuestion(null);
                }
            },
        });
    }

    // Difficulty badge renderer
    function renderDifficultyBadge(diff: string) {
        switch (diff) {
            case 'EASY':
                return (
                    <Badge variant='outline' className='border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'>
                        🟢 Oson daraja
                    </Badge>
                );
            case 'MEDIUM':
                return (
                    <Badge variant='outline' className='border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'>
                        🟡 O&apos;rtacha daraja
                    </Badge>
                );
            case 'HARD':
                return (
                    <Badge variant='outline' className='border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'>
                        🔴 Qiyin daraja
                    </Badge>
                );
            default:
                return null;
        }
    }

    // Not started view
    if (!session) {
        return (
            <Card className='border-primary/20 shadow-md'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Sparkles className='h-5 w-5 text-primary' />
                        {topicTitle} — Moslashuvchan test
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                        Ushbu test sizning bilim darajangizga moslashadi: to&apos;g&apos;ri va tez yechsangiz daraja o&apos;rtacha va qiyinga ko&apos;tariladi.
                        Variantlar orasidan tanlashingiz yoki <strong>o&apos;z javobingizni</strong> yozishingiz mumkin.
                    </p>
                    <div className='flex gap-3'>
                        <Button
                            onClick={handleStart}
                            disabled={startQuiz.isPending}
                            className='gap-2'
                        >
                            {startQuiz.isPending ? 'Yuklanmoqda...' : 'Testni boshlash'}
                            <ArrowRight className='h-4 w-4' />
                        </Button>
                        {onBack && (
                            <Button variant='outline' onClick={onBack}>
                                Orqaga
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Completed view
    if (session.status === 'COMPLETED' || !currentQuestion) {
        return (
            <Card className='border-primary/30 shadow-lg'>
                <CardHeader className='text-center'>
                    <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary'>
                        <Award className='h-8 w-8' />
                    </div>
                    <CardTitle className='mt-3 text-2xl font-bold'>
                        Test yakunlandi!
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6 text-center'>
                    <div className='grid grid-cols-2 gap-4 rounded-xl border bg-muted/30 p-4'>
                        <div>
                            <p className='text-sm text-muted-foreground'>Jami ishlangan</p>
                            <p className='text-2xl font-bold'>{session.totalAnswered}</p>
                        </div>
                        <div>
                            <p className='text-sm text-muted-foreground'>To&apos;g&apos;ri javoblar</p>
                            <p className='text-2xl font-bold text-emerald-600'>
                                {session.correctAnswers} / {session.totalAnswered}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-center gap-3'>
                        {hasMistakesInSession && onGoToRemedial && (
                            <Button
                                onClick={onGoToRemedial}
                                className='gap-2 bg-amber-600 text-white hover:bg-amber-700'
                            >
                                <HelpCircle className='h-4 w-4' />
                                Xatolar ustida ishlash (Qayta o&apos;rganish)
                            </Button>
                        )}
                        <Button variant='outline' onClick={handleStart} className='gap-2'>
                            <RotateCcw className='h-4 w-4' />
                            Qayta topshirish
                        </Button>
                        {onBack && (
                            <Button variant='ghost' onClick={onBack}>
                                Mavzularga qaytish
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className='border-primary/30 shadow-lg'>
            <CardHeader className='border-b pb-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div>
                        <p className='text-xs font-medium uppercase text-muted-foreground'>
                            {topicTitle}
                        </p>
                        <CardTitle className='mt-1 text-lg font-bold'>
                            Savol #{session.totalAnswered + 1}
                        </CardTitle>
                    </div>

                    <div className='flex items-center gap-2'>
                        {renderDifficultyBadge(currentQuestion.difficulty)}
                        {session.currentDifficulty === 'MEDIUM' && (
                            <Badge variant='secondary' className='gap-1 text-xs'>
                                <TrendingUp className='h-3 w-3 text-primary' />
                                Ketma-ket to&apos;g&apos;ri: {session.consecutiveCorrect}/3
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className='space-y-6 pt-6'>
                {/* Question Text */}
                <div className='rounded-xl border bg-muted/20 p-5 text-base font-medium'>
                    <MathView content={currentQuestion.question} />
                </div>

                {/* Options list */}
                <div className='space-y-3'>
                    <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                        Javob variantini tanlang:
                    </p>

                    <div className='grid gap-3 sm:grid-cols-2'>
                        {currentQuestion.options.map((option, idx) => {
                            const optionLetter = ['A', 'B', 'C', 'D'][idx] || `${idx + 1}`;
                            const isSelected =
                                !useCustomAnswer && selectedOption === optionLetter;

                            return (
                                <button
                                    key={idx}
                                    type='button'
                                    disabled={Boolean(lastEvaluation)}
                                    onClick={() => {
                                        setSelectedOption(optionLetter);
                                        setUseCustomAnswer(false);
                                    }}
                                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                                        isSelected
                                            ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                                            : 'hover:border-primary/50 hover:bg-muted/40'
                                    } ${
                                        lastEvaluation &&
                                        optionLetter === lastEvaluation.correctAnswer
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                                            : ''
                                    }`}
                                >
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${
                                            isSelected
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {optionLetter}
                                    </div>
                                    <div className='flex-1 text-sm'>
                                        <MathView content={option} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 5th Option: Custom Answer Input */}
                <div className='rounded-xl border border-dashed p-4'>
                    <div className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            id='custom-answer-toggle'
                            checked={useCustomAnswer}
                            disabled={Boolean(lastEvaluation)}
                            onChange={(e) => {
                                setUseCustomAnswer(e.target.checked);
                                if (e.target.checked) setSelectedOption('');
                            }}
                            className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                        />
                        <label
                            htmlFor='custom-answer-toggle'
                            className='cursor-pointer text-sm font-medium text-foreground'
                        >
                            5-variant: Variantlarda yo&apos;qmi? O&apos;z javobingizni yozing
                        </label>
                    </div>

                    {useCustomAnswer && (
                        <div className='mt-3 space-y-2'>
                            <Input
                                value={customAnswerText}
                                disabled={Boolean(lastEvaluation)}
                                onChange={(e) => setCustomAnswerText(e.target.value)}
                                placeholder='Misol: 32 yoki 2^7 yoki x = 5'
                                className='h-11'
                            />
                            <p className='text-xs text-muted-foreground'>
                                Formula yoki qiymatni to&apos;g&apos;ridan-to&apos;g&apos;ri yozishingiz mumkin.
                            </p>
                        </div>
                    )}
                </div>

                {/* Evaluation Result View */}
                {lastEvaluation && (
                    <div
                        className={`rounded-xl border p-5 ${
                            lastEvaluation.isCorrect
                                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30'
                                : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30'
                        }`}
                    >
                        <div className='flex items-start gap-3'>
                            {lastEvaluation.isCorrect ? (
                                <CheckCircle2 className='mt-0.5 h-6 w-6 text-emerald-600' />
                            ) : (
                                <XCircle className='mt-0.5 h-6 w-6 text-rose-600' />
                            )}
                            <div className='space-y-2'>
                                <h4
                                    className={`font-bold ${
                                        lastEvaluation.isCorrect
                                            ? 'text-emerald-800 dark:text-emerald-200'
                                            : 'text-rose-800 dark:text-rose-200'
                                    }`}
                                >
                                    {lastEvaluation.isCorrect
                                        ? 'Barakalla! To‘g‘ri javob!'
                                        : 'Noto‘g‘ri javob berildi.'}
                                </h4>

                                {!lastEvaluation.isCorrect && (
                                    <p className='text-sm text-muted-foreground'>
                                        To&apos;g&apos;ri javob:{' '}
                                        <strong className='text-foreground'>
                                            {lastEvaluation.correctAnswer}
                                            {lastEvaluation.correctCustomAnswer
                                                ? ` (${lastEvaluation.correctCustomAnswer})`
                                                : ''}
                                        </strong>
                                    </p>
                                )}

                                <div className='pt-2 text-sm text-foreground'>
                                    <p className='font-semibold'>Yechim va tushuntirish:</p>
                                    <div className='mt-1 rounded-lg bg-background/80 p-3'>
                                        <MathView content={lastEvaluation.explanation} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className='flex items-center justify-between border-t pt-4'>
                    {onBack && (
                        <Button variant='outline' onClick={onBack}>
                            Orqaga
                        </Button>
                    )}

                    {!lastEvaluation ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                submitAnswer.isPending ||
                                (!useCustomAnswer && !selectedOption) ||
                                (useCustomAnswer && !customAnswerText.trim())
                            }
                            className='ml-auto gap-2'
                        >
                            {submitAnswer.isPending ? 'Tekshirilmoqda...' : 'Javobni tekshirish'}
                            <ArrowRight className='h-4 w-4' />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNextQuestion}
                            className='ml-auto gap-2 bg-primary text-primary-foreground'
                        >
                            Keyingi savol
                            <ArrowRight className='h-4 w-4' />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
