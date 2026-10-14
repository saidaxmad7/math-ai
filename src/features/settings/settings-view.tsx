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
    Globe,
    Settings as SettingsIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/i18n/language-context';

export function SettingsView() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, translations } = useLanguage();

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
        toast.success(
            language === 'uz'
                ? `Birlamchi sinf ${grade}-sinfga o'zgartirildi.`
                : `Default grade set to Grade ${grade}.`
        );
    };

    const handleLanguageChange = (newLang: 'uz' | 'en') => {
        if (newLang === language) return;
        setLanguage(newLang);
        toast.success(
            newLang === 'uz'
                ? "Til o'zgartirildi: O'zbekcha 🇺🇿"
                : "Language changed to English 🇬🇧"
        );
    };

    const user = session?.user;
    const isAdmin = user?.role === 'ADMIN';

    return (
        <div className='max-w-4xl space-y-8'>
            {/* Sahifa sarlavhasi */}
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <SettingsIcon className='size-4' />
                    {translations.settings.badge}
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    {translations.settings.title}
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    {translations.settings.description}
                </p>
            </div>

            {/* Til sozlamalari (Language Settings) - Profil sahifasida qulay boshqaruv */}
            <Card className='border-primary/20 bg-linear-to-br from-primary/5 via-card to-card shadow-sm'>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs'>
                            <Globe className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>
                                {translations.settings.languageTitle}
                            </CardTitle>
                            <CardDescription>
                                {translations.settings.languageDesc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-sm font-semibold'>
                        {translations.settings.chooseLanguage}
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:max-w-md'>
                        <Button
                            type='button'
                            variant={language === 'uz' ? 'default' : 'outline'}
                            className='h-14 font-semibold text-sm flex items-center justify-between px-4 transition-all duration-200'
                            onClick={() => handleLanguageChange('uz')}
                        >
                            <span className='flex items-center gap-2.5'>
                                <span className='text-2xl'>🇺🇿</span>
                                <span>O&apos;zbekcha (Lotin)</span>
                            </span>
                            {language === 'uz' && <CheckCircle2 className='size-5 text-white' />}
                        </Button>

                        <Button
                            type='button'
                            variant={language === 'en' ? 'default' : 'outline'}
                            className='h-14 font-semibold text-sm flex items-center justify-between px-4 transition-all duration-200'
                            onClick={() => handleLanguageChange('en')}
                        >
                            <span className='flex items-center gap-2.5'>
                                <span className='text-2xl'>🇬🇧</span>
                                <span>English</span>
                            </span>
                            {language === 'en' && <CheckCircle2 className='size-5 text-white' />}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Profil ma'lumotlari */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <User className='size-5' />
                        </div>
                        <div>
                            <CardTitle className='text-xl'>{translations.settings.profileTitle}</CardTitle>
                            <CardDescription>
                                {translations.settings.profileDesc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='flex items-center gap-3 rounded-xl border bg-card p-4'>
                            <User className='size-5 text-muted-foreground' />
                            <div>
                                <p className='text-xs text-muted-foreground'>{translations.settings.userName}</p>
                                <p className='text-sm font-semibold'>{user?.name || (language === 'uz' ? 'Foydalanuvchi' : 'User')}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 rounded-xl border bg-card p-4'>
                            <Mail className='size-5 text-muted-foreground' />
                            <div>
                                <p className='text-xs text-muted-foreground'>{translations.settings.userEmail}</p>
                                <p className='text-sm font-semibold'>{user?.email || (language === 'uz' ? 'Mavjud emas' : 'N/A')}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between rounded-xl border bg-card p-4'>
                        <div className='flex items-center gap-3'>
                            <Shield className='size-5 text-primary' />
                            <div>
                                <p className='text-sm font-semibold'>{translations.settings.userRole}</p>
                                <p className='text-xs text-muted-foreground'>
                                    {isAdmin ? translations.settings.adminRole : translations.settings.studentRole}
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
                            <CardTitle className='text-xl'>{translations.settings.appearanceTitle}</CardTitle>
                            <CardDescription>
                                {translations.settings.appearanceDesc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div>
                        <p className='mb-3 text-sm font-semibold'>{translations.settings.themeLabel}</p>
                        <div className='grid grid-cols-3 gap-3'>
                            <Button
                                variant={theme === 'light' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('light');
                                    toast.success(translations.settings.themeLightToast);
                                }}
                            >
                                <Sun className='size-5' />
                                <span className='text-xs'>{translations.settings.themeLight}</span>
                            </Button>

                            <Button
                                variant={theme === 'dark' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('dark');
                                    toast.success(translations.settings.themeDarkToast);
                                }}
                            >
                                <Moon className='size-5' />
                                <span className='text-xs'>{translations.settings.themeDark}</span>
                            </Button>

                            <Button
                                variant={theme === 'system' ? 'default' : 'outline'}
                                className='h-20 flex-col gap-2'
                                onClick={() => {
                                    setTheme('system');
                                    toast.success(translations.settings.themeSystemToast);
                                }}
                            >
                                <Monitor className='size-5' />
                                <span className='text-xs'>{translations.settings.themeSystem}</span>
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
                            <CardTitle className='text-xl'>{translations.settings.educationTitle}</CardTitle>
                            <CardDescription>
                                {translations.settings.educationDesc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div>
                        <p className='mb-3 text-sm font-semibold'>{translations.settings.defaultGradeLabel}</p>
                        <div className='grid grid-cols-3 gap-3'>
                            {[
                                { id: '9', name: language === 'uz' ? '9-sinf' : 'Grade 9' },
                                { id: '10', name: language === 'uz' ? '10-sinf' : 'Grade 10' },
                                { id: '11', name: language === 'uz' ? '11-sinf' : 'Grade 11' },
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
                            <p className='text-sm font-semibold'>{translations.settings.katexTitle}</p>
                            <p className='text-xs text-muted-foreground'>
                                {translations.settings.katexDesc}
                            </p>
                        </div>
                        <Switch
                            checked={autoKaTeX}
                            onCheckedChange={(val) => {
                                setAutoKaTeX(val);
                                toast.info(val ? "KaTeX: ON" : "KaTeX: OFF");
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
                            <CardTitle className='text-xl'>{translations.settings.aiTitle}</CardTitle>
                            <CardDescription>
                                {translations.settings.aiDesc}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between rounded-xl border bg-muted/30 p-4'>
                        <div className='space-y-1'>
                            <div className='flex items-center gap-2'>
                                <Sparkles className='size-4 text-primary' />
                                <span className='text-sm font-semibold'>{translations.settings.aiModel}</span>
                            </div>
                            <p className='text-xs text-muted-foreground'>
                                {translations.settings.aiModelDesc}
                            </p>
                        </div>
                        <Badge variant='outline' className='border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'>
                            {translations.settings.activeBadge}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Xavfsizlik va Chiqish */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>{translations.settings.sessionTitle}</CardTitle>
                    <CardDescription>
                        {translations.settings.sessionDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant='destructive'
                        className='gap-2'
                        onClick={() => signOut({ callbackUrl: '/login' })}
                    >
                        <LogOut className='size-4' />
                        {translations.settings.signOutBtn}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
