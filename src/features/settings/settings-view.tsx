'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
    User,
    Mail,
    Shield,
    Palette,
    Moon,
    Sun,
    Monitor,
    Bot,
    GraduationCap,
    CheckCircle2,
    LogOut,
    Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export function SettingsView() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    const [defaultGrade, setDefaultGrade] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('math_default_grade') || '9';
        }
        return '9';
    });

    const [autoKaTeX, setAutoKaTeX] = useState(true);

    const handleSaveGrade = (grade: string) => {
        setDefaultGrade(grade);
        if (typeof window !== 'undefined') {
            localStorage.setItem('math_default_grade', grade);
        }
        toast.success(`Birlamchi sinf ${grade}-sinfga o'zgartirildi.`);
    };

    const user = session?.user;
    const isAdmin = user?.role === 'ADMIN';

    return (
        <div className='max-w-4xl space-y-8'>
            {/* Profil ma'lumotlari */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <User className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>Profil ma&apos;lumotlari</CardTitle>
                            <CardDescription>
                                Hisobingiz va foydalanuvchi statusi
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='flex items-center gap-3 rounded-xl border bg-card p-4'>
                            <User className='size-5 text-muted-foreground' />
                            <div>
                                <p className='text-xs text-muted-foreground'>Foydalanuvchi nomi</p>
                                <p className='text-sm font-semibold'>{user?.name || 'Foydalanuvchi'}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 rounded-xl border bg-card p-4'>
                            <Mail className='size-5 text-muted-foreground' />
                            <div>
                                <p className='text-xs text-muted-foreground'>Email pochtasi</p>
                                <p className='text-sm font-semibold'>{user?.email || 'Noma&apos;lum'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between rounded-xl border bg-card p-4'>
                        <div className='flex items-center gap-3'>
                            <Shield className='size-5 text-primary' />
                            <div>
                                <p className='text-sm font-semibold'>Tizimdagi rol</p>
                                <p className='text-xs text-muted-foreground'>
                                    {isAdmin ? "To'liq administrator vakolatlari" : "O'quvchi / Talaba akkaunti"}
                                </p>
                            </div>
                        </div>
                        <Badge variant={isAdmin ? 'default' : 'secondary'} className='uppercase'>
                            {isAdmin ? 'ADMIN' : 'USER'}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Interfeys va Tashqi Ko'rinish */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <Palette className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>Interfeys va ko&apos;rinish</CardTitle>
                            <CardDescription>
                                Tizim mavzusi va vizual parametrlari
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div>
                        <p className='mb-3 text-sm font-semibold'>Ranglar mavzusi (Theme):</p>
                        <div className='grid grid-cols-3 gap-3'>
                            <Button
                                variant={theme === 'light' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('light');
                                    toast.success("Yorug' mavzu tanlandi");
                                }}
                            >
                                <Sun className='size-5' />
                                <span className='text-xs'>Yorug&apos; (Light)</span>
                            </Button>

                            <Button
                                variant={theme === 'dark' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('dark');
                                    toast.success("Qorong'i mavzu tanlandi");
                                }}
                            >
                                <Moon className='size-5' />
                                <span className='text-xs'>Qorong&apos;i (Dark)</span>
                            </Button>

                            <Button
                                variant={theme === 'system' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('system');
                                    toast.success("Tizim mavzusi tanlandi");
                                }}
                            >
                                <Monitor className='size-5' />
                                <span className='text-xs'>Tizim (Auto)</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* O'quv afzalliklari */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <GraduationCap className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>Ta&apos;lim va sinf parametrlari</CardTitle>
                            <CardDescription>
                                Birlamchi sinf va darslik tanlovi
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div>
                        <p className='mb-3 text-sm font-semibold'>Asosiy o&apos;qiyotgan sinfingiz:</p>
                        <div className='grid grid-cols-3 gap-3'>
                            {[
                                { id: '9', name: '9-sinf' },
                                { id: '10', name: '10-sinf' },
                                { id: '11', name: '11-sinf' },
                            ].map((g) => (
                                <Button
                                    key={g.id}
                                    variant={defaultGrade === g.id ? 'default' : 'outline'}
                                    className='h-14 font-semibold'
                                    onClick={() => handleSaveGrade(g.id)}
                                >
                                    {defaultGrade === g.id && <CheckCircle2 className='mr-2 size-4' />}
                                    {g.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center justify-between rounded-xl border bg-card p-4'>
                        <div>
                            <p className='text-sm font-semibold'>KaTeX matematik formulalarni ko&apos;rsatish</p>
                            <p className='text-xs text-muted-foreground'>
                                Barcha formulalarni professional $KaTeX$ shriftida vizual ko&apos;rsatish
                            </p>
                        </div>
                        <Switch
                            checked={autoKaTeX}
                            onCheckedChange={(val) => {
                                setAutoKaTeX(val);
                                toast.info(val ? "KaTeX formulalar faollashtirildi" : "KaTeX o'chirildi");
                            }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* AI Yordamchi holati */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <Bot className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>AI Yordamchi konfiguratsiyasi</CardTitle>
                            <CardDescription>
                                Sun&apos;iy intellekt modeli va matematik tahlil holati
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between rounded-xl border bg-muted/30 p-4'>
                        <div className='space-y-1'>
                            <div className='flex items-center gap-2'>
                                <Sparkles className='size-4 text-primary' />
                                <span className='text-sm font-semibold'>AI Modeli: Google Gemini 3.8 Flash</span>
                            </div>
                            <p className='text-xs text-muted-foreground'>
                                O&apos;zbekiston darsliklari va matematik formulalarga moslashtirilgan eng so&apos;nggi model
                            </p>
                        </div>
                        <Badge variant='outline' className='border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'>
                            Faol
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Xavfsizlik va Chiqish */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Sessiya va xavfsizlik</CardTitle>
                    <CardDescription>
                        Tizimdan xavfsiz chiqish yoki sessiyani yangilash
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant='destructive'
                        className='gap-2'
                        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    >
                        <LogOut className='size-4' />
                        Hisobdan chiqish (Sign out)
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
