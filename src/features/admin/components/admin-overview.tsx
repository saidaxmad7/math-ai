'use client';

import Link from 'next/link';
import {
    BookCheck,
    BookOpen,
    Brain,
    CheckCircle2,
    FileText,
    GraduationCap,
    HelpCircle,
    Loader2,
    Shield,
    TrendingUp,
    Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAdminStats } from '@/hooks/use-admin';
import { cn } from '@/lib/utils';


type AdminOverviewProps = {
    onSelectTab: (tab: string) => void;
};

export function AdminOverview({ onSelectTab }: AdminOverviewProps) {
    const { data: stats, isLoading, isError } = useAdminStats();

    if (isLoading) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
                <span className='ml-3 text-muted-foreground'>Statistika yuklanmoqda...</span>
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className='rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive'>
                Statistika ma&apos;lumotlarini yuklashda xatolik yuz berdi.
            </div>
        );
    }

    const booksPercent = Math.round((stats.completedBooks / 6) * 100);

    return (
        <div className='space-y-8'>
            {/* Top Stat Cards */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card className='transition-all hover:shadow-md'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-sm font-medium text-muted-foreground'>
                            Foydalanuvchilar
                        </CardTitle>
                        <div className='rounded-full bg-primary/10 p-2 text-primary'>
                            <Users className='h-4 w-4' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>{stats.totalUsers}</div>
                        <div className='mt-2 flex items-center gap-2 text-xs text-muted-foreground'>
                            <Badge variant='outline' className='text-xs'>
                                {stats.totalStudents} o&apos;quvchi
                            </Badge>
                            <Badge variant='secondary' className='text-xs'>
                                {stats.totalAdmins} admin
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className='transition-all hover:shadow-md'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-sm font-medium text-muted-foreground'>
                            Darsliklar (6 ta)
                        </CardTitle>
                        <div className='rounded-full bg-blue-500/10 p-2 text-blue-600'>
                            <BookCheck className='h-4 w-4' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>
                            {stats.completedBooks} / 6
                        </div>
                        <div className='mt-2 space-y-1'>
                            <Progress value={booksPercent} className='h-1.5' />
                            <p className='text-xs text-muted-foreground'>
                                {stats.completedBooks === 6
                                    ? "Barcha 6 ta kitob tahlil qilingan"
                                    : `${6 - stats.completedBooks} ta kitob yuklanishi kerak`}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='transition-all hover:shadow-md'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-sm font-medium text-muted-foreground'>
                            AI Savollar Bazasi
                        </CardTitle>
                        <div className='rounded-full bg-amber-500/10 p-2 text-amber-600'>
                            <Brain className='h-4 w-4' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>{stats.totalQuestions}</div>
                        <p className='mt-2 text-xs text-muted-foreground'>
                            + {stats.totalWorkedExamples} ta yechilgan namunaviy misol
                        </p>
                    </CardContent>
                </Card>

                <Card className='transition-all hover:shadow-md'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-sm font-medium text-muted-foreground'>
                            O&apos;zlashtirish Ko&apos;rsatkichi
                        </CardTitle>
                        <div className='rounded-full bg-emerald-500/10 p-2 text-emerald-600'>
                            <TrendingUp className='h-4 w-4' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>
                            {stats.mistakeResolutionRate}%
                        </div>
                        <p className='mt-2 text-xs text-muted-foreground'>
                            {stats.resolvedMistakes} / {stats.totalMistakes} ta xato to&apos;g&apos;rilandi
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions & System Info Banner */}
            <div className='grid gap-6 md:grid-cols-3'>
                <Card className='md:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card'>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <Shield className='h-5 w-5 text-primary' />
                            <CardTitle className='text-lg font-bold'>
                                Administrator Boshqaruv Markazi
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <p className='text-sm text-muted-foreground leading-relaxed'>
                            Ushbu tizim 9-11 sinf matematika va geometriya darsliklarini AI yordamida chuqur tahlil qilish, mavzularni ajratib olish va o&apos;quvchilarga moslashuvchan (adaptive) ta&apos;lim berish uchun ishlab chiqilgan.
                        </p>

                        <div className='flex flex-wrap gap-3 pt-2'>
                            <Link
                                href='/dashboard/admin/books'
                                className={cn(buttonVariants(), 'gap-2')}
                            >
                                <BookOpen className='h-4 w-4' />
                                Darslik yuklash va AI tahlili
                            </Link>


                            <Button
                                variant='outline'
                                onClick={() => onSelectTab('users')}
                            >
                                <Users className='mr-2 h-4 w-4' />
                                O&apos;quvchilar ro&apos;yxati
                            </Button>

                            <Button
                                variant='secondary'
                                onClick={() => onSelectTab('hardest')}
                            >
                                <HelpCircle className='mr-2 h-4 w-4' />
                                Qiyin mavzular tahlili
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Educational Content Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className='text-base font-semibold'>
                            Mavjud Ta&apos;lim Resurslari
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm'>
                        <div className='flex items-center justify-between border-b pb-2'>
                            <span className='text-muted-foreground flex items-center gap-2'>
                                <BookOpen className='h-4 w-4 text-primary' />
                                Jami Mavzular:
                            </span>
                            <span className='font-semibold'>{stats.totalTopics} ta</span>
                        </div>

                        <div className='flex items-center justify-between border-b pb-2'>
                            <span className='text-muted-foreground flex items-center gap-2'>
                                <FileText className='h-4 w-4 text-blue-500' />
                                Nazariy Darslar:
                            </span>
                            <span className='font-semibold'>{stats.totalLessons} ta</span>
                        </div>

                        <div className='flex items-center justify-between border-b pb-2'>
                            <span className='text-muted-foreground flex items-center gap-2'>
                                <Brain className='h-4 w-4 text-purple-500' />
                                Test Sessiyalari:
                            </span>
                            <span className='font-semibold'>{stats.totalQuizSessions} ta</span>
                        </div>

                        <div className='flex items-center justify-between pt-1'>
                            <span className='text-muted-foreground flex items-center gap-2'>
                                <CheckCircle2 className='h-4 w-4 text-emerald-500' />
                                Namunaviy Yechimlar:
                            </span>
                            <span className='font-semibold'>{stats.totalWorkedExamples} ta</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
