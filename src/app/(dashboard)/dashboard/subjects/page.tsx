import Link from 'next/link';
import { BookOpen, Calculator, Triangle, ArrowRight, Brain, ChevronRight, GraduationCap } from 'lucide-react';

import { getAllSubjects } from '@/services/subject.service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function SubjectsPage() {
    const subjects = await getAllSubjects();

    // Group subjects by grade for structured presentation
    const gradeGroups = subjects.reduce<Record<string, typeof subjects>>((acc, sub) => {
        const gradeName = sub.grade.name;
        if (!acc[gradeName]) {
            acc[gradeName] = [];
        }
        acc[gradeName].push(sub);
        return acc;
    }, {});

    return (
        <div className='space-y-10'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <BookOpen className='size-4' />
                    Fanlar katalogi
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold tracking-tight'>
                    Fanlar va yo&apos;nalishlar
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    Maktab dasturidagi barcha matematika bo&apos;limlari, boblar va mavzular katalogi.
                </p>
            </div>

            <div className='space-y-10'>
                {Object.entries(gradeGroups).map(([gradeName, gradeSubjects]) => (
                    <div key={gradeName} className='space-y-4'>
                        <div className='flex items-center gap-3 border-b border-border/60 pb-3'>
                            <div className='flex items-center gap-2'>
                                <GraduationCap className='size-5 text-primary' />
                                <h2 className='text-xl font-bold tracking-tight'>{gradeName}</h2>
                            </div>
                            <Badge variant='outline' className='text-xs font-semibold px-2.5 py-0.5'>
                                {gradeSubjects.length} ta fan
                            </Badge>
                        </div>

                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                            {gradeSubjects.map((subject) => {
                                const isGeometry = subject.name.toLowerCase().includes('geom');
                                const IconComponent = isGeometry ? Triangle : Calculator;

                                return (
                                    <Card
                                        key={subject.id}
                                        className='group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg'
                                    >
                                        <CardHeader className='pb-4'>
                                            <div className='flex items-center justify-between'>
                                                <div
                                                    className='flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 shadow-2xs'
                                                    style={{
                                                        backgroundColor: `${subject.color || '#3b82f6'}15`,
                                                        color: subject.color || '#3b82f6',
                                                    }}
                                                >
                                                    <IconComponent className='size-6' />
                                                </div>
                                                <Badge variant='secondary' className='font-semibold px-2.5 py-1'>
                                                    {subject._count.topics} ta mavzu
                                                </Badge>
                                            </div>
                                            <CardTitle className='mt-4 text-xl font-bold tracking-tight'>
                                                {subject.name}
                                            </CardTitle>
                                            <CardDescription className='text-xs sm:text-sm text-muted-foreground'>
                                                {gradeName} bo&apos;yicha standart darslik va amaliy topshiriqlar
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className='pt-2 space-y-2.5'>
                                            <div className='flex flex-col gap-2.5 pt-2 border-t border-border/60'>
                                                <Link
                                                    href={`/dashboard/grades/${subject.gradeId}/subjects/${subject.id}`}
                                                    className='group/btn flex h-10 w-full items-center justify-between rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.99]'
                                                >
                                                    <span>Mavzular mundarijasi</span>
                                                    <ArrowRight className='size-4 shrink-0 transition-transform group-hover/btn:translate-x-1' />
                                                </Link>

                                                <Link
                                                    href={`/dashboard/practice?gradeId=${subject.gradeId}&subjectId=${subject.id}`}
                                                    className='group/btn flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 text-xs font-medium text-foreground transition-all hover:border-border hover:bg-muted/50'
                                                >
                                                    <span className='flex items-center gap-2'>
                                                        <Brain className='size-3.5 shrink-0 text-primary' />
                                                        Test mashqlari
                                                    </span>
                                                    <span className='flex items-center gap-1 text-muted-foreground group-hover/btn:text-foreground'>
                                                        O&apos;tish
                                                        <ChevronRight className='size-3 shrink-0' />
                                                    </span>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
