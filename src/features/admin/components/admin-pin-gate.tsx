'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    Loader2,
    Lock,
    ShieldAlert,
    ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminPinStatus, useLockAdmin, useVerifyAdminPin } from '@/hooks/use-admin';
import { cn } from '@/lib/utils';

type AdminPinGateProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
};

export function AdminPinGate({
    children,
    title = 'Admin Maxfiy Kodini Kiriting',
    description = 'Admin panel va darsliklar boshqaruviga kirish uchun xavfsizlik PIN-kodini tasdiqlang.',
}: AdminPinGateProps) {
    const { data: isUnlocked = false, isLoading } = useAdminPinStatus();
    const verifyPin = useVerifyAdminPin();
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!pin.trim()) {
            setErrorMessage('Iltimos, maxfiy kodni kiriting.');
            return;
        }

        setErrorMessage(null);
        verifyPin.mutate(pin.trim(), {
            onSuccess: () => {
                toast.success("Maxfiy kod to'g'ri. Admin panel ochildi!");
            },
            onError: (err) => {
                const msg =
                    err instanceof Error
                        ? err.message
                        : "Noto'g'ri kod! Qayta urinib ko'ring.";
                setErrorMessage(msg);
                toast.error(msg);
            },
        });
    }

    if (isLoading) {
        return (
            <div className='flex min-h-[50vh] items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
        );
    }

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className='flex min-h-[65vh] items-center justify-center p-4'>
            <Card className='w-full max-w-md border-primary/20 shadow-xl bg-card'>
                <CardHeader className='text-center pb-4'>
                    <div className='mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner'>
                        <KeyRound className='h-8 w-8' />
                    </div>

                    <div className='mx-auto mb-1'>
                        <Badge variant='outline' className='gap-1 border-primary/30 text-primary text-xs'>
                            <ShieldCheck className='h-3.5 w-3.5' />
                            Xavfsizlik Himoyasi
                        </Badge>
                    </div>

                    <CardTitle className='text-2xl font-bold tracking-tight'>
                        {title}
                    </CardTitle>
                    <CardDescription className='text-sm mt-1'>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='relative'>
                                <Input
                                    type={showPin ? 'text' : 'password'}
                                    placeholder='Maxfiy kod (PIN)...'
                                    value={pin}
                                    onChange={(e) => {
                                        setPin(e.target.value);
                                        if (errorMessage) setErrorMessage(null);
                                    }}
                                    autoFocus
                                    className='pr-10 text-center tracking-widest text-lg font-semibold'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPin(!showPin)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {showPin ? (
                                        <EyeOff className='h-4 w-4' />
                                    ) : (
                                        <Eye className='h-4 w-4' />
                                    )}
                                </button>
                            </div>

                            {errorMessage && (
                                <p className='text-xs font-medium text-destructive flex items-center justify-center gap-1 mt-1'>
                                    <ShieldAlert className='h-3.5 w-3.5' />
                                    {errorMessage}
                                </p>
                            )}
                        </div>

                        <Button
                            type='submit'
                            disabled={verifyPin.isPending}
                            className='w-full font-medium'
                        >
                            {verifyPin.isPending ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Tekshirilmoqda...
                                </>
                            ) : (
                                <>
                                    <Lock className='mr-2 h-4 w-4' />
                                    Admin Panelga Kirish
                                </>
                            )}
                        </Button>

                        <div className='pt-2 flex items-center justify-center text-xs text-muted-foreground'>
                            <Link
                                href='/dashboard'
                                className='hover:text-primary transition-colors flex items-center gap-1.5'
                            >
                                <ArrowLeft className='h-3.5 w-3.5' />
                                Bosh sahifaga qaytish
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export function LockAdminButton({ className }: { className?: string }) {
    const lockAdmin = useLockAdmin();

    return (
        <Button
            variant='outline'
            size='sm'
            disabled={lockAdmin.isPending}
            onClick={() => {
                lockAdmin.mutate(undefined, {
                    onSuccess: () => {
                        toast.info("Admin panel qulflandi.");
                    },
                });
            }}
            className={cn('text-xs gap-1.5', className)}
        >
            <Lock className='h-3.5 w-3.5 text-muted-foreground' />
            Qulflash
        </Button>
    );
}
