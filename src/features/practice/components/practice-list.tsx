'use client';

import { useState, useMemo } from 'react';
import {
    BookOpen,
    HelpCircle,
    Search,
    GraduationCap,
    CheckCircle2,
    Clock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePractice } from '@/hooks/use-practice';
import { useTopicMistakes } from '@/hooks/use-quiz';
import { AdaptiveQuiz } from '@/features/practice/components/adaptive-quiz';
import { PracticeCard } from '@/features/practice/components/practice-card';
import { RemedialReview } from '@/features/practice/components/remedial-review';
import { FilterDropdown } from '@/features/practice/components/filter-dropdown';
import type { PracticeQuery } from '@/validations/practice.validation';

export function PracticeList() {
    const [viewMode, setViewMode] = useState<'lessons' | 'quiz' | 'remedial'>('lessons');
    const [selectedQuizTopic, setSelectedQuizTopic] = useState<{
        id: string;
        title: string;
    } | null>(null);

    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<PracticeQuery>({
        query: '',
        gradeId: undefined,
        subjectId: undefined,
        status: 'all',
        sort: 'priority',
    });

    const { data, isLoading, isError } = usePractice({
        ...filters,
        query: query.trim() || undefined,
    });

    const { data: mistakes = [] } = useTopicMistakes();

    function updateFilter<Key extends keyof PracticeQuery>(
        key: Key,
        value: PracticeQuery[Key],
    ) {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [key]: value,
        }));
    }

    function handleStartQuiz(topicId: string, topicTitle: string) {
        setSelectedQuizTopic({ id: topicId, title: topicTitle });
        setViewMode('quiz');
    }

    const gradeOptions = useMemo(() => {
        return (data?.grades ?? []).map((grade) => ({
            value: grade.id,
            label: grade.name,
            icon: <GraduationCap className='h-4 w-4 text-primary shrink-0' />,
        }));
    }, [data?.grades]);

    const subjectOptions = useMemo(() => {
        if (!data?.subjects) return [];
        const filtered = filters.gradeId
            ? data.subjects.filter((s) => s.gradeId === filters.gradeId)
            : data.subjects;

        return filtered.map((sub) => {
            const isPart = sub.name.includes('qism');
            const isGeometry = sub.name.toLowerCase().includes('geom');
            return {
                value: sub.id,
                label: sub.name,
                badge: sub.gradeName,
                icon: isGeometry ? (
                    <span className='h-2 w-2 rounded-full bg-emerald-500 shrink-0' />
                ) : isPart ? (
                    <span className='h-2 w-2 rounded-full bg-indigo-500 shrink-0' />
                ) : (
                    <span className='h-2 w-2 rounded-full bg-blue-500 shrink-0' />
                ),
            };
        });
    }, [data?.subjects, filters.gradeId]);

    const statusOptions = [
        {
            value: 'completed',
            label: 'Tugallangan',
            badge: 'Yechilgan',
            icon: <CheckCircle2 className='h-4 w-4 text-emerald-500 shrink-0' />,
        },
        {
            value: 'incomplete',
            label: 'Tugallanmagan',
            badge: 'Kutilmoqda',
            icon: <Clock className='h-4 w-4 text-amber-500 shrink-0' />,
        },
    ];

    function handleGradeChange(gradeId: string | undefined) {
        updateFilter('gradeId', gradeId);
        if (filters.subjectId) {
            const currentSub = data?.subjects.find((s) => s.id === filters.subjectId);
            if (currentSub && gradeId && currentSub.gradeId !== gradeId) {
                updateFilter('subjectId', undefined);
            }
        }
    }

    function handleSubjectChange(subjectId: string | undefined) {
        updateFilter('subjectId', subjectId);
        if (subjectId && !filters.gradeId) {
            const selectedSub = data?.subjects.find((s) => s.id === subjectId);
            if (selectedSub?.gradeId) {
                updateFilter('gradeId', selectedSub.gradeId);
            }
        }
    }

    return (
        <div className='space-y-6'>
            {/* Top Navigation Tabs */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-b pb-4'>
                <div className='flex items-center gap-2'>
                    <Button
                        variant={viewMode === 'lessons' ? 'default' : 'outline'}
                        onClick={() => {
                            setSelectedQuizTopic(null);
                            setViewMode('lessons');
                        }}
                        className='gap-2 text-sm'
                    >
                        <BookOpen className='h-4 w-4' />
                        Mavzular va Testlar
                    </Button>
                    <Button
                        variant={viewMode === 'remedial' ? 'default' : 'outline'}
                        onClick={() => setViewMode('remedial')}
                        className='gap-2 text-sm'
                    >
                        <HelpCircle className='h-4 w-4 text-amber-500' />
                        Xatolar ustida ishlash
                        {mistakes.length > 0 && (
                            <span className='ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white'>
                                {mistakes.length}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {viewMode === 'quiz' && selectedQuizTopic ? (
                <AdaptiveQuiz
                    topicId={selectedQuizTopic.id}
                    topicTitle={selectedQuizTopic.title}
                    onBack={() => setViewMode('lessons')}
                    onGoToRemedial={() => setViewMode('remedial')}
                />
            ) : viewMode === 'remedial' ? (
                <RemedialReview
                    topicId={selectedQuizTopic?.id}
                    onBack={() => setViewMode('lessons')}
                />
            ) : (
                <>
                    {/* Filters */}
                    <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
                        <div className='relative'>
                            <Search className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none' />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder='Dars yoki mavzu qidiring...'
                                aria-label='Dars yoki mavzu qidirish'
                                className='h-10 pl-9.5 rounded-xl bg-card border-input dark:bg-zinc-900/90 dark:border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
                            />
                        </div>

                        <FilterDropdown
                            label='Sinf'
                            icon={<GraduationCap className='h-4 w-4 text-primary' />}
                            value={filters.gradeId}
                            onChange={handleGradeChange}
                            options={gradeOptions}
                            allLabel='Barcha sinflar'
                        />

                        <FilterDropdown
                            label='Fan'
                            icon={<BookOpen className='h-4 w-4 text-emerald-500' />}
                            value={filters.subjectId}
                            onChange={handleSubjectChange}
                            options={subjectOptions}
                            allLabel={filters.gradeId ? 'Barcha fanlar' : 'Barcha fanlar va qismlar'}
                        />

                        <FilterDropdown
                            label='Holat'
                            icon={<CheckCircle2 className='h-4 w-4 text-violet-500' />}
                            value={filters.status === 'all' ? undefined : filters.status}
                            onChange={(val) => updateFilter('status', (val as PracticeQuery['status']) ?? 'all')}
                            options={statusOptions}
                            allLabel='Barcha holatlar'
                        />
                    </div>

                    {isLoading ? (
                        <p className='text-sm text-muted-foreground'>Yuklanmoqda...</p>
                    ) : isError ? (
                        <p className='text-sm text-destructive'>
                            Mashqlarni yuklab bo&apos;lmadi.
                        </p>
                    ) : !data || data.lessons.length === 0 ? (
                        <p className='text-sm text-muted-foreground'>
                            Mos keladigan dars topilmadi.
                        </p>
                    ) : (
                        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                            {data.lessons.map((lesson) => (
                                <PracticeCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    onStartQuiz={handleStartQuiz}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
