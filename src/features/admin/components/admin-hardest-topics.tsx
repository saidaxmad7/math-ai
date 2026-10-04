'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, BookOpen, Brain, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAdminHardestTopics } from '@/hooks/use-admin';
import { cn } from '@/lib/utils';


export function AdminHardestTopics() {
    const { data: topics = [], isLoading, isError } = useAdminHardestTopics();

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center gap-2'>
                    <AlertTriangle className='h-5 w-5 text-amber-500' />
                    <CardTitle className='text-xl font-bold'>
                        O&apos;quvchilar Eng Ko&apos;p Qiynalayotgan Mavzular
                    </CardTitle>
                </div>
                <CardDescription>
                    Sun&apos;iy intellekt tomonidan qayd etilgan xatolar tahlili. Ushbu mavzularda o&apos;quvchilar eng ko&apos;p xatoga yo&apos;l qo&apos;ymoqda.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className='flex h-40 items-center justify-center'>
                        <Loader2 className='h-6 w-6 animate-spin text-primary' />
                        <span className='ml-2 text-sm text-muted-foreground'>
                            Mavzular tahlili yuklanmoqda...
                        </span>
                    </div>
                ) : isError ? (
                    <div className='rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center text-sm text-destructive'>
                        Ma&apos;lumotlarni yuklashda xatolik yuz berdi.
                    </div>
                ) : topics.length === 0 ? (
                    <div className='py-8 text-center text-muted-foreground text-sm'>
                        Hozircha xatoliklar qayd etilmagan. O&apos;quvchilar testlarni yechgach, bu yerda statistik tahlil paydo bo&apos;ladi.
                    </div>
                ) : (
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                className='flex flex-col justify-between rounded-xl border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-sm'
                            >
                                <div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <Badge variant='outline' className='text-xs'>
                                            {topic.gradeName} · {topic.subjectName}
                                        </Badge>
                                        <Badge variant='destructive' className='text-xs'>
                                            {topic.mistakesCount} ta xato
                                        </Badge>
                                    </div>

                                    <h4 className='mt-3 font-semibold text-base leading-snug'>
                                        {topic.title}
                                    </h4>

                                    <p className='mt-1 text-xs text-muted-foreground flex items-center gap-1'>
                                        <Brain className='h-3.5 w-3.5' />
                                        Mavzuda {topic.practiceQuestionsCount} ta AI savol mavjud
                                    </p>
                                </div>

                                <div className='mt-4 pt-3 border-t flex justify-end'>
                                    <Link
                                        href='/dashboard/practice'
                                        className={cn(
                                            buttonVariants({
                                                size: 'sm',
                                                variant: 'ghost',
                                            }),
                                            'text-xs',
                                        )}
                                    >
                                        Mashqlarni ko&apos;rish
                                        <ArrowRight className='ml-1 h-3 w-3' />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
