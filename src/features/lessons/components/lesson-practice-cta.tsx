import Link from 'next/link';
import { Target, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    const practiceHref = `/dashboard/practice?gradeId=${gradeId}&subjectId=${subjectId}&topicId=${topicId}`;

    return (
        <section className='relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-sm'>
            <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div className='space-y-2 max-w-xl'>
                    <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary'>
                        <Zap className='h-3.5 w-3.5' />
                        <span>10. AI Practice moduli</span>
                    </div>

                    <h3 className='font-heading text-2xl font-bold tracking-tight text-foreground'>
                        Mavzuni to‘liq o‘rganib bo‘ldingizmi?
                    </h3>

                    <p className='text-sm leading-relaxed text-muted-foreground'>
                        «{topicTitle}» mavzusi bo‘yicha AI testlarini ishlab, o‘z bilimingizni sinang. Agar adashsangiz, sun’iy intellekt xatoyingizni aniqlab, qayerda va nega xato bo‘lganini ko‘rsatadi.
                    </p>

                    <div className='flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                            <CheckCircle className='h-3.5 w-3.5 text-emerald-500' />
                            Step-by-step xato tahlili
                        </span>
                        <span className='flex items-center gap-1'>
                            <CheckCircle className='h-3.5 w-3.5 text-emerald-500' />
                            Bilim darajasi statistikasi
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
                        <span>AI Practice testini boshlash</span>
                        <ArrowRight className='h-4 w-4' />
                    </Link>
                </div>
            </div>
        </section>
    );
}
