'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function AccessDenied() {
    return (
        <div className='flex min-h-[60vh] items-center justify-center p-4'>
            <Card className='max-w-md border-destructive/20 text-center shadow-lg'>
                <CardHeader className='pb-4'>
                    <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3'>
                        <ShieldAlert className='h-8 w-8' />
                    </div>
                    <CardTitle className='text-2xl font-bold'>
                        Ruxsat etilmagan
                    </CardTitle>
                    <CardDescription className='text-sm leading-relaxed'>
                        Ushbu bo&apos;lim (Admin Panel) faqat tizim administratorlari uchun mo&apos;ljallangan. Oddiy o&apos;quvchilar kitob yuklay olmaydi yoki tizim sozlamalarini o&apos;zgartira olmaydi.
                    </CardDescription>
                </CardHeader>
                <CardContent className='pt-2'>
                    <Link
                        href='/dashboard'
                        className={cn(buttonVariants(), 'w-full')}
                    >
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Bosh sahifaga qaytish
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
