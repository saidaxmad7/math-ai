'use client';

import { BookOpen, Brain, GraduationCap } from 'lucide-react';

import { DashboardStats } from '@/features/dashboard/components/dashboard-stats';
import { QuickActionCard } from '@/features/dashboard/components/quick-action-card';
import { RecentActivity } from '@/features/dashboard/components/recent-activity';
import { LearningProgress } from '@/features/dashboard/components/learning-progress';
import { GradeCard } from '@/features/dashboard/components/grade-card';
import { CreativeHeroGreeting } from '@/features/dashboard/components/creative-hero-greeting';
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
        <div className='space-y-6 sm:space-y-10'>
            {/* Dynamic, Personalized & Inspiring Hero Greeting */}
            <CreativeHeroGreeting />

            <section className='grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                <DashboardStats />
            </section>

            <section className='space-y-4 sm:space-y-6'>
                <div>
                    <h2 className='font-heading text-xl sm:text-2xl font-bold'>
                        {translations.dashboard.gradesTitle}
                    </h2>

                    <p className='text-muted-foreground text-xs sm:text-sm'>
                        {translations.dashboard.gradesSubtitle}
                    </p>
                </div>

                <div className='grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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

            <section className='space-y-4 sm:space-y-6'>
                <div>
                    <h2 className='font-heading text-xl sm:text-2xl font-bold'>
                        {translations.dashboard.quickActionsTitle}
                    </h2>

                    <p className='text-muted-foreground text-xs sm:text-sm'>
                        {translations.dashboard.quickActionsSubtitle}
                    </p>
                </div>

                <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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

            <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
                <LearningProgress />
                <RecentActivity />
            </div>
        </div>
    );
}
