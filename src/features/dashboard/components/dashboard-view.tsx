'use client';

import { BookOpen, Brain, GraduationCap } from 'lucide-react';

import { DashboardStats } from '@/features/dashboard/components/dashboard-stats';
import { QuickActionCard } from '@/features/dashboard/components/quick-action-card';
import { RecentActivity } from '@/features/dashboard/components/recent-activity';
import { LearningProgress } from '@/features/dashboard/components/learning-progress';
import { GradeCard } from '@/features/dashboard/components/grade-card';
import { useLanguage } from '@/i18n/language-context';

type Grade = {
    id: string;
    name: string;
    subjects: { id: string }[];
};

interface DashboardViewProps {
    grades: Grade[];
}

export function DashboardView({ grades }: DashboardViewProps) {
    const { translations } = useLanguage();

    const quickActions = [
        {
            title: translations.dashboard.chooseClassTitle,
            description: translations.dashboard.chooseClassDesc,
            href: '/dashboard/classes',
            icon: GraduationCap,
        },
        {
            title: translations.dashboard.browseSubjectsTitle,
            description: translations.dashboard.browseSubjectsDesc,
            href: '/dashboard/subjects',
            icon: BookOpen,
        },
        {
            title: translations.dashboard.startPracticeTitle,
            description: translations.dashboard.startPracticeDesc,
            href: '/dashboard/practice',
            icon: Brain,
        },
    ];

    return (
        <div className='space-y-10'>
            <div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    {translations.dashboard.welcomeBack}
                </h1>

                <p className='mt-2 text-muted-foreground'>
                    {translations.dashboard.continueJourney}
                </p>
            </div>

            <section className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
                <DashboardStats />
            </section>

            <section className='space-y-6'>
                <div>
                    <h2 className='font-heading text-2xl font-bold'>
                        {translations.dashboard.gradesTitle}
                    </h2>

                    <p className='text-muted-foreground text-sm'>
                        {translations.dashboard.gradesSubtitle}
                    </p>
                </div>

                <div className='grid gap-4 md:grid-cols-3'>
                    {grades.map((grade) => (
                        <GradeCard
                            key={grade.id}
                            id={grade.id}
                            name={grade.name}
                            subjectCount={grade.subjects.length}
                        />
                    ))}
                </div>
            </section>

            <section className='space-y-6'>
                <div>
                    <h2 className='font-heading text-2xl font-bold'>
                        {translations.dashboard.quickActionsTitle}
                    </h2>

                    <p className='text-muted-foreground text-sm'>
                        {translations.dashboard.quickActionsSubtitle}
                    </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {quickActions.map((action) => (
                        <QuickActionCard
                            key={action.href}
                            title={action.title}
                            description={action.description}
                            href={action.href}
                            icon={action.icon}
                        />
                    ))}
                </div>
            </section>

            <div className='grid gap-6 xl:grid-cols-2'>
                <LearningProgress />
                <RecentActivity />
            </div>
        </div>
    );
}
