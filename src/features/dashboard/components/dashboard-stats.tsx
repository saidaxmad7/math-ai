'use client';

import { BookOpen, Brain, ChartColumn, CircleCheckBig } from 'lucide-react';

import { StatCard } from '@/features/dashboard/components/stat-card';
import { useDashboard } from '@/hooks/use-dashboard';
import { useLanguage } from '@/i18n/language-context';

export function DashboardStats() {
    const { data: dashboard, isLoading } = useDashboard();
    const { translations } = useLanguage();

    const stats = [
        {
            title: translations.dashboard.solvedProblems,
            value: '0',
            description: translations.dashboard.solvedProblemsDesc,
            icon: CircleCheckBig,
            isLoadingField: false,
        },
        {
            title: translations.dashboard.completedLessons,
            value: dashboard ? String(dashboard.completedLessons) : '0',
            description: translations.dashboard.completedLessonsDesc,
            icon: BookOpen,
            isLoadingField: true,
        },
        {
            title: translations.dashboard.aiSessions,
            value: '0',
            description: translations.dashboard.aiSessionsDesc,
            icon: Brain,
            isLoadingField: false,
        },
        {
            title: translations.dashboard.overallProgress,
            value: dashboard ? `${dashboard.progressPercentage}%` : '0%',
            description: translations.dashboard.overallProgressDesc,
            icon: ChartColumn,
            isLoadingField: true,
        },
    ];

    return (
        <>
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={isLoading && stat.isLoadingField ? '...' : stat.value}
                    description={stat.description}
                    icon={stat.icon}
                />
            ))}
        </>
    );
}
