'use client';

import { useState } from 'react';
import {
    AlertCircle,
    Brain,
    CheckCircle2,
    GraduationCap,
    Loader2,
    Search,
    Shield,
    ShieldCheck,
    UserCheck,
    UserX,
    Users,
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAdminUsers, useUpdateUserRole } from '@/hooks/use-admin';
import { formatDate } from '@/lib/utils';
import type { AdminUserResponse } from '@/mappers/admin.mapper';

type AdminUsersTableProps = {
    currentUserId?: string;
};

export function AdminUsersTable({ currentUserId }: AdminUsersTableProps) {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL');

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useAdminUsers({
        search: search.trim() || undefined,
        role: roleFilter,
    });

    const updateRole = useUpdateUserRole();

    function handleRoleChange(user: AdminUserResponse, newRole: 'USER' | 'ADMIN') {
        const actionLabel = newRole === 'ADMIN' ? 'admin' : "o'quvchi";

        updateRole.mutate(
            { userId: user.id, role: newRole },
            {
                onSuccess: () => {
                    toast.success(
                        `${user.name || user.email} roli muvaffaqiyatli ${actionLabel}ga o'zgartirildi.`,
                    );
                },
                onError: (error) => {
                    toast.error(
                        error instanceof Error
                            ? error.message
                            : "Rolni o'zgartirishda xatolik yuz berdi.",
                    );
                },
            },
        );
    }

    const users = data?.users || [];

    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <Users className='h-5 w-5 text-primary' />
                            <CardTitle className='text-xl font-bold'>
                                Kirgan Foydalanuvchilar Ro&apos;yxati
                            </CardTitle>
                        </div>
                        <CardDescription className='mt-1 text-sm'>
                            Tizimga kirgan barcha o&apos;quvchilar va administratorlar faoliyati
                        </CardDescription>
                    </div>

                    <Badge variant='outline' className='w-fit text-sm'>
                        Jami: {data?.total ?? 0} ta foydalanuvchi
                    </Badge>
                </div>

                {/* Filters */}
                <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                            placeholder="Ism yoki email bo'yicha qidirish..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='pl-9'
                        />
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button
                            size='sm'
                            variant={roleFilter === 'ALL' ? 'default' : 'outline'}
                            onClick={() => setRoleFilter('ALL')}
                        >
                            Barchasi
                        </Button>
                        <Button
                            size='sm'
                            variant={roleFilter === 'USER' ? 'default' : 'outline'}
                            onClick={() => setRoleFilter('USER')}
                        >
                            O&apos;quvchilar
                        </Button>
                        <Button
                            size='sm'
                            variant={roleFilter === 'ADMIN' ? 'default' : 'outline'}
                            onClick={() => setRoleFilter('ADMIN')}
                        >
                            Adminlar
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className='flex h-48 items-center justify-center'>
                        <Loader2 className='h-6 w-6 animate-spin text-primary' />
                        <span className='ml-2 text-sm text-muted-foreground'>
                            Foydalanuvchilar ro&apos;yxati yuklanmoqda...
                        </span>
                    </div>
                ) : isError ? (
                    <div className='rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center text-sm text-destructive'>
                        Foydalanuvchilarni yuklashda xatolik yuz berdi.
                    </div>
                ) : users.length === 0 ? (
                    <div className='py-12 text-center text-muted-foreground'>
                        Foydalanuvchilar topilmadi.
                    </div>
                ) : (
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Foydalanuvchi</TableHead>
                                    <TableHead>Roli</TableHead>
                                    <TableHead>Ro&apos;yxatdan o&apos;tgan</TableHead>
                                    <TableHead className='text-center'>Darslar</TableHead>
                                    <TableHead className='text-center'>Testlar</TableHead>
                                    <TableHead className='text-center'>Xatolar</TableHead>
                                    <TableHead className='text-right'>Amallar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => {
                                    const isSelf = currentUserId === user.id;
                                    const isAdmin = user.role === 'ADMIN';

                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold text-primary'>
                                                        {(user.name?.[0] || user.email[0] || 'U').toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className='flex items-center gap-2 font-medium'>
                                                            <span>{user.name || "Nomsiz foydalanuvchi"}</span>
                                                            {isSelf && (
                                                                <Badge variant='outline' className='text-[10px] py-0'>
                                                                    Siz
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className='text-xs text-muted-foreground'>
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {isAdmin ? (
                                                    <Badge className='bg-blue-600 hover:bg-blue-700 text-white gap-1'>
                                                        <ShieldCheck className='h-3 w-3' />
                                                        Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge variant='secondary' className='gap-1'>
                                                        <GraduationCap className='h-3 w-3' />
                                                        O&apos;quvchi
                                                    </Badge>
                                                )}
                                            </TableCell>

                                            <TableCell className='text-xs text-muted-foreground'>
                                                {formatDate(user.createdAt)}
                                            </TableCell>

                                            <TableCell className='text-center'>
                                                <Badge variant='outline' className='font-normal'>
                                                    <CheckCircle2 className='mr-1 h-3 w-3 text-emerald-500' />
                                                    {user.completedLessonsCount} ta
                                                </Badge>
                                            </TableCell>

                                            <TableCell className='text-center'>
                                                <Badge variant='outline' className='font-normal'>
                                                    <Brain className='mr-1 h-3 w-3 text-purple-500' />
                                                    {user.quizSessionsCount} ta
                                                </Badge>
                                            </TableCell>

                                            <TableCell className='text-center'>
                                                <Badge variant='outline' className='font-normal'>
                                                    <AlertCircle className='mr-1 h-3 w-3 text-amber-500' />
                                                    {user.mistakesCount} ta
                                                </Badge>
                                            </TableCell>

                                            <TableCell className='text-right'>
                                                {isSelf ? (
                                                    <span className='text-xs text-muted-foreground italic'>
                                                        O&apos;z profilingiz
                                                    </span>
                                                ) : isAdmin ? (
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        disabled={updateRole.isPending}
                                                        onClick={() => handleRoleChange(user, 'USER')}
                                                        className='text-xs text-amber-600 hover:text-amber-700 hover:bg-amber-50'
                                                    >
                                                        <UserX className='mr-1 h-3 w-3' />
                                                        O&apos;quvchi qilish
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        disabled={updateRole.isPending}
                                                        onClick={() => handleRoleChange(user, 'ADMIN')}
                                                        className='text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                                                    >
                                                        <Shield className='mr-1 h-3 w-3' />
                                                        Admin qilish
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
