'use client';

import Link from 'next/link';
import { Target, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/language-context';

type LessonPracticeCTAProps = {
    topicId: string;
    topicTitle: string;
    gradeId: string;
    subjectId: string;
};

export function LessonPracticeCTA({
    topicId,
    topicTitle,
    gradeId,
    subjectId,
}: LessonPracticeCTAProps) {
    const { language } = useLanguage();
    const practiceHref = `/dashboard/practice?gradeId=${gradeId}&subjectId=${subjectId}&topicId=${topicId}`;

    return (
        <section className='relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-sm'>
            <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div className='space-y-2 max-w-xl'>
                    <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary'>
                        <Zap className='h-3.5 w-3.5' />
                        <span>{language === 'uz' ? '10. AI Practice moduli' : '10. AI Practice Module'}</span>
                    </div>

                    <h3 className='font-heading text-2xl font-bold tracking-tight text-foreground'>
                        {language === 'uz'
                            ? 'Mavzuni to‘liq o‘rganib bo‘ldingizmi?'
                            : 'Finished studying this topic?'}
                    </h3>

                    <p className='text-sm leading-relaxed text-muted-foreground'>
                        {language === 'uz'
                            ? `«${topicTitle}» mavzusi bo‘yicha AI testlarini ishlab, o‘z bilimingizni sinang. Agar adashsangiz, sun’iy intellekt xatoyingizni aniqlab, qayerda va nega xato bo‘lganini ko‘rsatadi.`
                            : `Test your understanding with AI quizzes on "${topicTitle}". If you make a mistake, AI analyzes your steps and explains where and why it happened.`}
                    </p>

                    <div className='flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                            <CheckCircle className='h-3.5 w-3.5 text-emerald-500' />
                            {language === 'uz' ? 'Step-by-step xato tahlili' : 'Step-by-step mistake analysis'}
                        </span>
                        <span className='flex items-center gap-1'>
                            <CheckCircle className='h-3.5 w-3.5 text-emerald-500' />
                            {language === 'uz' ? 'Bilim darajasi statistikasi' : 'Mastery level statistics'}
                        </span>
                    </div>
                </div>

                <div className='shrink-0'>
                    <Link
                        href={practiceHref}
                        className={cn(
                            buttonVariants({ size: 'lg' }),
                            'h-12 px-6 rounded-2xl gap-2 font-semibold shadow-md transition-all hover:scale-105'
                        )}
                    >
                        <Target className='h-5 w-5' />
                        <span>{language === 'uz' ? 'AI Practice testini boshlash' : 'Start AI Practice Quiz'}</span>
                        <ArrowRight className='h-4 w-4' />
                    </Link>
                </div>
            </div>
        </section>
    );
}
