'use client';

import Link from 'next/link';
import { BookOpen, Target, ArrowRight, ArrowLeft } from 'lucide-react';

import { Markdown } from '@/components/math/markdown';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { BookmarkButton } from '@/features/lessons/components/bookmark-button';
import { CompleteLessonButton } from '@/features/lessons/components/complete-lesson-button';
import { WorkedExamplesSection } from '@/features/lessons/components/worked-examples-section';
import { InLessonQuiz } from '@/features/lessons/components/in-lesson-quiz';
import { InLessonAITutor } from '@/features/lessons/components/in-lesson-ai-tutor';
import { LessonPracticeCTA } from '@/features/lessons/components/lesson-practice-cta';
import { LessonNotesSection } from '@/features/lessons/components/lesson-notes-section';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/language-context';

type LessonDetailViewProps = {
    lesson: any;
    previousLesson: any;
    nextLesson: any;
};

export function LessonDetailView({
    lesson,
    previousLesson,
    nextLesson,
}: LessonDetailViewProps) {
    const { translations, language } = useLanguage();

    const grade = lesson.topic.subject.grade;
    const subject = lesson.topic.subject;
    const topic = lesson.topic;

    return (
        <div className='mx-auto max-w-4xl space-y-10 pb-16'>
            {/* Header & Breadcrumb */}
            <div className='space-y-4'>
                <Breadcrumb
                    items={[
                        {
                            label: translations.navigation.dashboard,
                            href: '/dashboard',
                        },
                        {
                            label: grade.name,
                            href: `/dashboard/grades/${grade.id}`,
                        },
                        {
                            label: subject.name,
                            href: `/dashboard/grades/${grade.id}/subjects/${subject.id}`,
                        },
                        {
                            label: topic.title,
                        },
                    ]}
                />

                <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                    <div className='space-y-3'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <Badge variant='secondary' className='text-xs font-semibold'>
                                {grade.name}
                            </Badge>
                            <Badge variant='outline' className='text-xs font-semibold border-primary/30 text-primary'>
                                {subject.name}
                            </Badge>
                            {typeof topic.order === 'number' && (
                                <Badge variant='outline' className='text-xs text-muted-foreground'>
                                    {language === 'uz' ? `${topic.order}-mavzu` : `Topic ${topic.order}`}
                                </Badge>
                            )}
                        </div>

                        <h1 className='font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                            {lesson.title}
                        </h1>

                        {lesson.description && (
                            <p className='text-base leading-relaxed text-muted-foreground'>
                                {lesson.description}
                            </p>
                        )}
                    </div>

                    <div className='flex shrink-0 items-center gap-2 pt-2 md:pt-0'>
                        <BookmarkButton lessonId={lesson.id} />
                        <CompleteLessonButton lessonId={lesson.id} />
                        <Link
                            href={`/dashboard/practice?gradeId=${grade.id}&subjectId=${subject.id}&topicId=${topic.id}`}
                            className={cn(
                                buttonVariants({ size: 'sm' }),
                                'gap-1.5 font-medium rounded-xl shadow-xs'
                            )}
                        >
                            <Target className='h-4 w-4' />
                            <span>AI Practice</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Lesson Theory & Diagrams Content */}
            <article className='rounded-3xl border bg-card p-6 sm:p-10 shadow-xs space-y-6'>
                <div className='flex items-center gap-2 border-b pb-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase'>
                    <BookOpen className='h-4 w-4 text-primary' />
                    <span>
                        {language === 'uz'
                            ? 'Darslik materiali va qadam-baqadam nazariya'
                            : 'Textbook Curriculum & Step-by-Step Theory'}
                    </span>
                </div>

                <div className='lesson-body'>
                    <Markdown content={lesson.content} />
                </div>
            </article>

            {/* Worked Examples Section (Step-by-step) */}
            {topic.workedExamples && topic.workedExamples.length > 0 && (
                <WorkedExamplesSection examples={topic.workedExamples} />
            )}

            {/* In-Lesson Interactive Quiz (Mini tekshiruv) */}
            {topic.practiceQuestions && topic.practiceQuestions.length > 0 && (
                <InLessonQuiz questions={topic.practiceQuestions} />
            )}

            {/* In-Lesson AI Tutor (Gemini 3.8 Flash Contextual Helper) */}
            <InLessonAITutor
                lessonId={lesson.id}
                lessonTitle={lesson.title}
                gradeName={grade.name}
                subjectName={subject.name}
            />

            {/* Big AI Practice CTA */}
            <LessonPracticeCTA
                topicId={topic.id}
                topicTitle={topic.title}
                gradeId={grade.id}
                subjectId={subject.id}
            />

            {/* Personal Notes Module */}
            <LessonNotesSection lessonId={lesson.id} />

            {/* Topic/Lesson Navigation (Oldingi va Keyingi dars) */}
            <div className='grid gap-4 sm:grid-cols-2 pt-4 border-t'>
                <div>
                    {previousLesson ? (
                        <Link
                            href={`/dashboard/lessons/${previousLesson.slug}`}
                            className='group flex flex-col rounded-2xl border bg-card p-4 transition-all hover:border-primary hover:shadow-xs'
                        >
                            <span className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                                <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-1' />
                                <span>{language === 'uz' ? 'Oldingi mavzu' : 'Previous topic'}</span>
                            </span>
                            <span className='mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
                                {previousLesson.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>

                <div>
                    {nextLesson && (
                        <Link
                            href={`/dashboard/lessons/${nextLesson.slug}`}
                            className='group flex flex-col items-end rounded-2xl border bg-card p-4 transition-all hover:border-primary hover:shadow-xs text-right'
                        >
                            <span className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                                <span>{language === 'uz' ? 'Keyingi mavzu' : 'Next topic'}</span>
                                <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
                            </span>
                            <span className='mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
                                {nextLesson.title}
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
