'use client';

import { BookOpen, Brain, ChartColumn, CircleCheckBig } from 'lucide-react';

import { StatCard } from '@/features/dashboard/components/stat-card';
import { useDashboard } from '@/hooks/use-dashboard';

export function DashboardStats() {
    const { data: dashboard, isLoading } = useDashboard();

    const stats = [
        {
            title: 'Solved Problems',
            value: '0',
            description: 'Total completed questions',
            icon: CircleCheckBig,
        },
        {
            title: 'Completed Lessons',
            value: dashboard ? String(dashboard.completedLessons) : '0',
            description: 'Lessons you have finished',
            icon: BookOpen,
        },
        {
            title: 'AI Sessions',
            value: '0',
            description: 'Practice sessions with AI',
            icon: Brain,
        },
        {
            title: 'Overall Progress',
            value: dashboard ? `${dashboard.progressPercentage}%` : '0%',
            description: 'Learning progress',
            icon: ChartColumn,
        },
    ];

    return (
        <>
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={
                        isLoading &&
                        (stat.title === 'Completed Lessons' ||
                            stat.title === 'Overall Progress')
                            ? '...'
                            : stat.value
                    }
                    description={stat.description}
                    icon={stat.icon}
                />
            ))}
        </>
    );
}
