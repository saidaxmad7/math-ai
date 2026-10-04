'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    HelpCircle,
    LayoutDashboard,
    Shield,
    Users,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

import { AdminOverview } from './admin-overview';
import { AdminUsersTable } from './admin-users-table';
import { AdminHardestTopics } from './admin-hardest-topics';
import { LockAdminButton } from './admin-pin-gate';


type AdminDashboardClientProps = {
    currentUserId: string;
    adminName: string;
};

export function AdminDashboardClient({
    currentUserId,
    adminName,
}: AdminDashboardClientProps) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className='space-y-6'>
            <div>
                <Breadcrumb
                    items={[
                        { label: 'Bosh sahifa', href: '/dashboard' },
                        { label: 'Admin Panel' },
                    ]}
                />

                <div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                <Shield className='h-5 w-5' />
                            </div>
                            <h1 className='font-heading text-3xl font-bold'>
                                Admin Panel
                            </h1>
                        </div>
                        <p className='mt-1 text-sm text-muted-foreground'>
                            Xush kelibsiz, <span className='font-medium text-foreground'>{adminName}</span>. Tizim statistikasi, kitoblar va o&apos;quvchilar faoliyatini boshqaring.
                        </p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <LockAdminButton />
                        <Link
                            href='/dashboard/admin/books'
                            className={cn(buttonVariants(), 'gap-2')}
                        >
                            <BookOpen className='h-4 w-4' />
                            6 ta Darslikni Boshqarish
                        </Link>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
                <TabsList className='grid w-full grid-cols-3 max-w-md'>
                    <TabsTrigger value='overview' className='gap-2 text-xs sm:text-sm'>
                        <LayoutDashboard className='h-4 w-4' />
                        Umumiy
                    </TabsTrigger>
                    <TabsTrigger value='users' className='gap-2 text-xs sm:text-sm'>
                        <Users className='h-4 w-4' />
                        Foydalanuvchilar
                    </TabsTrigger>
                    <TabsTrigger value='hardest' className='gap-2 text-xs sm:text-sm'>
                        <HelpCircle className='h-4 w-4' />
                        Qiyin Mavzular
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='overview'>
                    <AdminOverview onSelectTab={setActiveTab} />
                </TabsContent>

                <TabsContent value='users'>
                    <AdminUsersTable currentUserId={currentUserId} />
                </TabsContent>

                <TabsContent value='hardest'>
                    <AdminHardestTopics />
                </TabsContent>
            </Tabs>
        </div>
    );
}
