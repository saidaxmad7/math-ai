'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    GraduationCap,
    KeyRound,
    Loader2,
    Lock,
    LogIn,
    Mail,
    ShieldCheck,
    Sparkles,
    User,
    UserPlus,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { useLanguage } from '@/i18n/language-context';
import { cn } from '@/lib/utils';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get('error');
    const { translations, language } = useLanguage();
    const t = translations.auth;

    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
    const [teacherCode, setTeacherCode] = useState('');
    const [showTeacherCode, setShowTeacherCode] = useState(false);

    // Google Sign-in
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            await signIn('google', {
                callbackUrl: '/dashboard',
            });
        } catch {
            setIsLoading(false);
            setErrorMessage(
                language === 'uz'
                    ? 'Google orqali kirishda xatolik yuz berdi.'
                    : language === 'ru'
                    ? 'Ошибка при входе через Google.'
                    : 'Failed to sign in with Google.'
            );
        }
    };

    // Email & Password Sign-in
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail || !password) {
            setErrorMessage(
                language === 'uz'
                    ? 'Iltimos, email va parolni to‘liq kiriting.'
                    : language === 'ru'
                    ? 'Пожалуйста, введите email и пароль.'
                    : 'Please enter both email and password.'
            );
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: cleanEmail,
                password,
                callbackUrl: '/dashboard',
                redirect: false,
            });

            if (result?.ok) {
                toast.success(
                    language === 'uz'
                        ? 'Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.'
                        : language === 'ru'
                        ? 'Добро пожаловать! Вы успешно вошли в систему.'
                        : 'Welcome back! Signed in successfully.'
                );
                router.push('/dashboard');
                router.refresh();
            } else {
                setIsLoading(false);
                setErrorMessage(t.invalidCredentials);
            }
        } catch {
            setIsLoading(false);
            setErrorMessage(
                language === 'uz'
                    ? 'Tizimga kirishda xatolik yuz berdi.'
                    : language === 'ru'
                    ? 'Произошла ошибка при входе в систему.'
                    : 'An error occurred during sign in.'
            );
        }
    };

    // Registration
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName || !cleanEmail || !password) {
            setErrorMessage(
                language === 'uz'
                    ? 'Iltimos, barcha maydonlarni to‘ldiring.'
                    : language === 'ru'
                    ? 'Пожалуйста, заполните все обязательные поля.'
                    : 'Please fill in all required fields.'
            );
            return;
        }

        if (password.length < 6) {
            setErrorMessage(
                language === 'uz'
                    ? 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.'
                    : language === 'ru'
                    ? 'Пароль должен содержать не менее 6 символов.'
                    : 'Password must be at least 6 characters.'
            );
            return;
        }

        if (role === 'ADMIN' && !teacherCode.trim()) {
            setErrorMessage(
                language === 'uz'
                    ? 'O‘qituvchi / Admin maxfiy xavfsizlik kodini kiriting.'
                    : language === 'ru'
                    ? 'Введите секретный PIN-код учителя / администратора.'
                    : 'Please enter the teacher / admin security PIN.'
            );
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: cleanName,
                    email: cleanEmail,
                    password,
                    role,
                    teacherCode: role === 'ADMIN' ? teacherCode.trim() : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setIsLoading(false);
                setErrorMessage(
                    data.message ||
                        (language === 'uz'
                            ? 'Ro‘yxatdan o‘tib bo‘lmadi.'
                            : language === 'ru'
                            ? 'Не удалось зарегистрироваться.'
                            : 'Registration failed.')
                );
                return;
            }

            toast.success(t.accountCreatedSuccess);

            // Muvaffaqiyatli ro'yxatdan o'tgach, avtomatik kirish
            const loginResult = await signIn('credentials', {
                email: cleanEmail,
                password,
                callbackUrl: '/dashboard',
                redirect: false,
            });

            if (loginResult?.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                setIsLoading(false);
                setMode('signin');
            }
        } catch {
            setIsLoading(false);
            setErrorMessage(
                language === 'uz'
                    ? 'Server bilan bog‘lanishda xatolik yuz berdi.'
                    : language === 'ru'
                    ? 'Ошибка подключения к серверу регистрации.'
                    : 'Failed to connect to registration server.'
            );
        }
    };

    return (
        <Card className='relative w-full max-w-md border-border/70 bg-card/95 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden'>
            {/* Yuqori dekorativ chiziq */}
            <div className='absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-primary/60 via-primary to-primary/60' />

            <CardContent className='flex flex-col gap-6 p-6 sm:p-8'>
                {/* Brending va Sarlavha */}
                <div className='flex flex-col items-center gap-3 text-center'>
                    <div className='flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-primary/10'>
                        <GraduationCap className='size-8' />
                    </div>

                    <div className='space-y-1'>
                        <div className='flex items-center justify-center gap-2'>
                            <h1 className='text-2xl font-bold tracking-tight'>Math AI</h1>
                            <span className='rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary'>
                                2.0
                            </span>
                        </div>
                        <p className='text-xs text-muted-foreground max-w-xs'>
                            {mode === 'signin' ? t.signInSubtitle : t.signUpSubtitle}
                        </p>
                    </div>
                </div>

                {/* Tab Switcher: Kirish / Ro'yxatdan o'tish */}
                <div className='grid grid-cols-2 rounded-2xl bg-muted/60 p-1 border border-border/50'>
                    <button
                        type='button'
                        onClick={() => {
                            setMode('signin');
                            setErrorMessage(null);
                        }}
                        className={cn(
                            'flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 select-none cursor-pointer',
                            mode === 'signin'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <LogIn className='size-3.5' />
                        {t.tabSignIn}
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            setMode('signup');
                            setErrorMessage(null);
                        }}
                        className={cn(
                            'flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 select-none cursor-pointer',
                            mode === 'signup'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <UserPlus className='size-3.5' />
                        {t.tabSignUp}
                    </button>
                </div>

                {/* Xatolik xabarnomasi */}
                {(errorMessage || errorParam) && (
                    <div className='flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive animate-in fade-in duration-200'>
                        <AlertCircle className='size-4 shrink-0 mt-0.5' />
                        <div className='space-y-0.5'>
                            <p className='font-semibold'>
                                {errorMessage ||
                                    (language === 'uz'
                                        ? 'Kirishda xatolik yuz berdi'
                                        : language === 'ru'
                                        ? 'Ошибка входа'
                                        : 'Authentication error')}
                            </p>
                            {errorParam === 'Configuration' && !errorMessage && (
                                <p className='text-[11px] opacity-80'>
                                    {language === 'uz'
                                        ? 'Email va parolingiz bilan kiring.'
                                        : language === 'ru'
                                        ? 'Войдите с помощью email и пароля.'
                                        : 'Please sign in with your email and password.'}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Google orqali kirish (Faqat bitta tugma, ikkala rejimda ham mavjud) */}
                <Button
                    type='button'
                    variant='outline'
                    className='w-full h-12 gap-3 rounded-2xl border-border/80 font-medium hover:bg-muted/60 hover:border-primary/40 transition-all cursor-pointer'
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    <svg className='size-4 shrink-0' viewBox='0 0 24 24'>
                        <path
                            fill='#4285F4'
                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        />
                        <path
                            fill='#34A853'
                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        />
                        <path
                            fill='#FBBC05'
                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
                        />
                        <path
                            fill='#EA4335'
                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                        />
                    </svg>
                    <span>{t.googleSignIn}</span>
                </Button>

                {/* Ajratuvchi chiziq */}
                <div className='relative flex items-center justify-center'>
                    <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t border-border/70' />
                    </div>
                    <span className='relative bg-card px-3 text-[11px] font-medium text-muted-foreground'>
                        {t.orWithEmail}
                    </span>
                </div>

                {/* KIRISH FORMASI */}
                {mode === 'signin' && (
                    <form onSubmit={handleSignIn} className='space-y-4'>
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                                <Mail className='size-3.5 text-muted-foreground' />
                                {t.emailLabel}
                            </label>
                            <Input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.emailPlaceholder}
                                disabled={isLoading}
                                className='h-11 rounded-xl text-sm'
                            />
                        </div>

                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                                <Lock className='size-3.5 text-muted-foreground' />
                                {t.passwordLabel}
                            </label>
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t.passwordPlaceholder}
                                    disabled={isLoading}
                                    className='h-11 rounded-xl pr-10 text-sm'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='w-full h-11 rounded-xl font-semibold gap-2 mt-2 shadow-md shadow-primary/20 cursor-pointer'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                <>
                                    <span>{t.signInBtn}</span>
                                    <ArrowRight className='size-4' />
                                </>
                            )}
                        </Button>
                    </form>
                )}

                {/* RO'YXATDAN O'TISH FORMASI */}
                {mode === 'signup' && (
                    <form onSubmit={handleSignUp} className='space-y-3.5'>
                        <div className='space-y-1'>
                            <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                                <User className='size-3.5 text-muted-foreground' />
                                {t.nameLabel}
                            </label>
                            <Input
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t.namePlaceholder}
                                disabled={isLoading}
                                className='h-10 rounded-xl text-sm'
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                                <Mail className='size-3.5 text-muted-foreground' />
                                {t.emailLabel}
                            </label>
                            <Input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.emailPlaceholder}
                                disabled={isLoading}
                                className='h-10 rounded-xl text-sm'
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                                <Lock className='size-3.5 text-muted-foreground' />
                                {t.passwordLabel}
                            </label>
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t.passwordPlaceholder}
                                    disabled={isLoading}
                                    className='h-10 rounded-xl pr-10 text-sm'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                </button>
                            </div>
                        </div>

                        {/* Rolni tanlash: O'quvchi yoki O'qituvchi */}
                        <div className='space-y-1.5 pt-1'>
                            <label className='text-xs font-semibold text-foreground'>
                                {language === 'uz' ? 'Profilingiz turi:' : language === 'ru' ? 'Тип профиля:' : 'Account Type:'}
                            </label>
                            <div className='grid grid-cols-2 gap-2'>
                                <div
                                    role='button'
                                    tabIndex={0}
                                    onClick={() => setRole('USER')}
                                    onKeyDown={(e) => e.key === 'Enter' && setRole('USER')}
                                    className={cn(
                                        'flex items-center gap-2 rounded-xl border p-2.5 cursor-pointer transition-all select-none',
                                        role === 'USER'
                                            ? 'border-primary bg-primary/[0.08] text-foreground font-semibold ring-1 ring-primary/30'
                                            : 'border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60'
                                    )}
                                >
                                    <GraduationCap className={cn('size-4', role === 'USER' ? 'text-primary' : 'text-muted-foreground')} />
                                    <span className='text-xs'>{t.roleStudent}</span>
                                </div>

                                <div
                                    role='button'
                                    tabIndex={0}
                                    onClick={() => setRole('ADMIN')}
                                    onKeyDown={(e) => e.key === 'Enter' && setRole('ADMIN')}
                                    className={cn(
                                        'flex items-center gap-2 rounded-xl border p-2.5 cursor-pointer transition-all select-none',
                                        role === 'ADMIN'
                                            ? 'border-primary bg-primary/[0.08] text-foreground font-semibold ring-1 ring-primary/30'
                                            : 'border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60'
                                    )}
                                >
                                    <ShieldCheck className={cn('size-4', role === 'ADMIN' ? 'text-primary' : 'text-muted-foreground')} />
                                    <span className='text-xs'>{t.roleTeacher}</span>
                                </div>
                            </div>
                        </div>

                        {/* Agar O'qituvchi tanlangan bo'lsa, Maxfiy PIN kod talab qilinadi */}
                        {role === 'ADMIN' && (
                            <div className='space-y-1.5 rounded-xl border border-primary/20 bg-primary/[0.03] p-3 animate-in fade-in duration-200'>
                                <label className='text-xs font-semibold text-primary flex items-center justify-between'>
                                    <span className='flex items-center gap-1.5'>
                                        <KeyRound className='size-3.5' />
                                        {t.teacherCodeLabel}
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Input
                                        type={showTeacherCode ? 'text' : 'password'}
                                        required
                                        value={teacherCode}
                                        onChange={(e) => setTeacherCode(e.target.value)}
                                        placeholder={t.teacherCodePlaceholder}
                                        disabled={isLoading}
                                        className='h-9 rounded-lg font-mono tracking-widest text-xs pr-9'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowTeacherCode(!showTeacherCode)}
                                        className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                        tabIndex={-1}
                                    >
                                        {showTeacherCode ? <EyeOff className='size-3.5' /> : <Eye className='size-3.5' />}
                                    </button>
                                </div>
                                <p className='text-[10px] text-muted-foreground'>
                                    {t.roleTeacherNote}
                                </p>
                            </div>
                        )}

                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='w-full h-11 rounded-xl font-semibold gap-2 mt-2 shadow-md shadow-primary/20 cursor-pointer'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                <>
                                    <span>{t.signUpBtn}</span>
                                    <CheckCircle2 className='size-4' />
                                </>
                            )}
                        </Button>
                    </form>
                )}

                {/* Pastki o'tish tugmasi */}
                <div className='text-center pt-1 border-t'>
                    <button
                        type='button'
                        onClick={() => {
                            setMode(mode === 'signin' ? 'signup' : 'signin');
                            setErrorMessage(null);
                        }}
                        className='text-xs font-medium text-primary hover:underline transition-all cursor-pointer'
                    >
                        {mode === 'signin' ? t.noAccountPrompt : t.haveAccountPrompt}
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <main className='relative flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-background via-muted/30 to-background px-4 sm:px-6 py-8 sm:py-12 overflow-hidden'>
            {/* Orqa fon geometrik suv belgilari (Matematika belgilari) */}
            <div className='pointer-events-none absolute -top-12 -left-12 size-80 rounded-full bg-primary/[0.05] blur-3xl' />
            <div className='pointer-events-none absolute -bottom-12 -right-12 size-80 rounded-full bg-primary/[0.07] blur-3xl' />
            
            <span className='pointer-events-none absolute top-12 left-16 select-none font-serif text-6xl font-light text-primary/[0.04]'>
                &int;
            </span>
            <span className='pointer-events-none absolute bottom-16 left-24 select-none font-serif text-6xl font-light text-primary/[0.04]'>
                &sum;
            </span>
            <span className='pointer-events-none absolute top-20 right-20 select-none font-serif text-6xl font-light text-primary/[0.04]'>
                &pi;
            </span>
            <span className='pointer-events-none absolute bottom-24 right-28 select-none font-serif text-5xl font-light text-primary/[0.04]'>
                f(x)
            </span>

            {/* Tepada Til tanlash */}
            <div className='absolute top-3 right-3 sm:top-5 sm:right-5 z-20'>
                <LanguageSwitcher />
            </div>

            <Suspense fallback={<div className='text-sm text-muted-foreground flex items-center gap-2'><Loader2 className='size-4 animate-spin' /> Yuklanmoqda...</div>}>
                <LoginForm />
            </Suspense>
        </main>
    );
}
