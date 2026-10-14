'use client';

import { useState, useEffect } from 'react';
import {
    KeyRound,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Sparkles,
    Trash2,
    ExternalLink,
    Video,
    BookOpen,
    ShieldCheck,
    Check,
    Copy,
    Cpu,
} from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/i18n/language-context';
import { cn } from '@/lib/utils';

export function GeminiByokCard() {
    const { language, translations } = useLanguage();
    const t = translations.settings;

    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [hasCustomKey, setHasCustomKey] = useState(false);
    const [maskedKey, setMaskedKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [guideTab, setGuideTab] = useState<'video' | 'steps'>('video');
    const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
    const [copiedUrl, setCopiedUrl] = useState(false);

    // Initial load from server and localStorage
    useEffect(() => {
        let isMounted = true;

        async function fetchKeyStatus() {
            try {
                // Check localStorage first
                const localKey = localStorage.getItem('math_gemini_api_key');
                if (localKey && localKey.trim()) {
                    setHasCustomKey(true);
                    setMaskedKey(`${localKey.slice(0, 6)}••••••••${localKey.slice(-4)}`);
                }

                // Check DB status
                const res = await fetch('/api/user/gemini-key');
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && data.data) {
                        if (data.data.hasCustomKey) {
                            setHasCustomKey(true);
                            setMaskedKey(data.data.maskedKey);
                        } else if (!localKey) {
                            setHasCustomKey(false);
                            setMaskedKey(null);
                        }
                    }
                }
            } catch {
                // Ignore background fetch failure
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchKeyStatus();

        return () => {
            isMounted = false;
        };
    }, []);

    // Kalitni sinovdan o'tkazish
    const handleTestKey = async () => {
        const keyToTest = apiKey.trim() || (typeof window !== 'undefined' ? localStorage.getItem('math_gemini_api_key') : '');
        if (!keyToTest) {
            toast.error(
                language === 'uz'
                    ? "Tekshirish uchun avval Gemini API kalitini kiriting."
                    : "Please enter a Gemini API key first to test."
            );
            return;
        }

        setIsTesting(true);
        setTestSuccess(null);
        toast.loading(t.apiKeyTestingToast, { id: 'test-gemini-key' });

        try {
            const res = await fetch('/api/user/gemini-key/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: keyToTest }),
            });

            const data = await res.json();
            toast.dismiss('test-gemini-key');

            if (res.ok && data.success) {
                setTestSuccess(true);
                toast.success(t.apiKeySuccessToast);
            } else {
                setTestSuccess(false);
                toast.error(data.message || (language === 'uz' ? 'Kalit yaroqsiz.' : 'Key is invalid.'));
            }
        } catch {
            toast.dismiss('test-gemini-key');
            setTestSuccess(false);
            toast.error(
                language === 'uz'
                    ? "Server bilan bog'lanishda xatolik yuz berdi."
                    : "Failed to connect to verification server."
            );
        } finally {
            setIsTesting(false);
        }
    };

    // Kalitni saqlash
    const handleSaveKey = async () => {
        const keyToSave = apiKey.trim();
        if (!keyToSave) {
            toast.error(
                language === 'uz'
                    ? "Iltimos, avval kalitni kiriting."
                    : "Please enter an API key first."
            );
            return;
        }

        if (keyToSave.length < 15) {
            toast.error(
                language === 'uz'
                    ? "Gemini API kaliti formati noto'g'ri (juda qisqa)."
                    : "Gemini API key is invalid (too short)."
            );
            return;
        }

        setIsSaving(true);
        toast.loading(t.apiKeyTestingToast, { id: 'save-gemini-key' });

        try {
            const res = await fetch('/api/user/gemini-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: keyToSave }),
            });

            const data = await res.json();
            toast.dismiss('save-gemini-key');

            if (res.ok && data.success) {
                // Save to localStorage as well
                localStorage.setItem('math_gemini_api_key', keyToSave);
                setHasCustomKey(true);
                setMaskedKey(`${keyToSave.slice(0, 6)}••••••••${keyToSave.slice(-4)}`);
                setApiKey('');
                setTestSuccess(true);
                toast.success(t.apiKeySavedToast);
            } else {
                toast.error(data.message || (language === 'uz' ? "Kalitni saqlab bo'lmadi." : "Failed to save key."));
            }
        } catch {
            toast.dismiss('save-gemini-key');
            // If server route is unreachable, still save to localStorage for client-side BYOK
            localStorage.setItem('math_gemini_api_key', keyToSave);
            setHasCustomKey(true);
            setMaskedKey(`${keyToSave.slice(0, 6)}••••••••${keyToSave.slice(-4)}`);
            setApiKey('');
            toast.success(t.apiKeySavedToast);
        } finally {
            setIsSaving(false);
        }
    };

    // Shaxsiy kalitni o'chirish
    const handleRemoveKey = async () => {
        try {
            await fetch('/api/user/gemini-key', { method: 'DELETE' });
        } catch {
            // Ignore server delete error
        }
        localStorage.removeItem('math_gemini_api_key');
        setHasCustomKey(false);
        setMaskedKey(null);
        setApiKey('');
        setTestSuccess(null);
        toast.info(t.apiKeyRemovedToast);
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(true);
        toast.success(language === 'uz' ? "Havola nusxalandi!" : "Link copied!");
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    return (
        <Card className='border-primary/20 bg-linear-to-br from-card via-card to-primary/[0.03] shadow-xs overflow-hidden'>
            <CardHeader className='pb-4'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20'>
                            <KeyRound className='size-5' />
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <CardTitle className='text-xl'>{t.apiKeyTitle}</CardTitle>
                                <span className='rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold font-mono text-primary'>
                                    BYOK
                                </span>
                            </div>
                            <CardDescription className='text-xs sm:text-sm mt-0.5'>
                                {t.apiKeyDesc}
                            </CardDescription>
                        </div>
                    </div>

                    {/* Holat indikatori */}
                    {!isLoading && (
                        <div>
                            {hasCustomKey ? (
                                <Badge className='border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 gap-1.5 px-3 py-1 font-semibold text-xs'>
                                    <CheckCircle2 className='size-3.5' />
                                    {t.apiKeyStatusCustom}
                                </Badge>
                            ) : (
                                <Badge variant='outline' className='border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 gap-1.5 px-3 py-1 font-semibold text-xs'>
                                    <AlertTriangle className='size-3.5' />
                                    {t.apiKeyStatusSystem}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className='space-y-6 pt-2'>
                {/* Agar shaxsiy kalit mavjud bo'lsa */}
                {hasCustomKey && maskedKey && (
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4'>
                        <div className='flex items-center gap-3 min-w-0'>
                            <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                                <ShieldCheck className='size-5' />
                            </div>
                            <div className='min-w-0'>
                                <p className='text-xs font-semibold text-foreground'>
                                    {language === 'uz' ? 'Ulangan shaxsiy kalit:' : 'Connected custom key:'}
                                </p>
                                <p className='font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider truncate'>
                                    {maskedKey}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 shrink-0'>
                            <Button
                                size='sm'
                                variant='outline'
                                onClick={handleTestKey}
                                disabled={isTesting}
                                className='h-8 text-xs gap-1.5'
                            >
                                {isTesting ? (
                                    <Loader2 className='size-3.5 animate-spin' />
                                ) : (
                                    <Sparkles className='size-3.5 text-primary' />
                                )}
                                {t.apiKeyTestBtn}
                            </Button>

                            <Button
                                size='sm'
                                variant='destructive'
                                onClick={handleRemoveKey}
                                className='h-8 text-xs gap-1.5'
                            >
                                <Trash2 className='size-3.5' />
                                {t.apiKeyRemoveBtn}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Kalit kiritish maydoni */}
                <div className='space-y-3'>
                    <label className='text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between'>
                        <span>{t.apiKeyInputLabel}</span>
                        <a
                            href='https://aistudio.google.com/app/apikey'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-xs text-primary hover:underline font-normal'
                        >
                            {t.apiKeyOpenAIStudio}
                            <ExternalLink className='size-3' />
                        </a>
                    </label>

                    <div className='flex flex-col sm:flex-row gap-2.5'>
                        <div className='relative flex-1'>
                            <Input
                                type={showKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value);
                                    if (testSuccess !== null) setTestSuccess(null);
                                }}
                                placeholder={t.apiKeyInputPlaceholder}
                                className='pr-10 font-mono text-xs sm:text-sm h-11'
                            />
                            <button
                                type='button'
                                onClick={() => setShowKey(!showKey)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                title={showKey ? "Yashirish" : "Ko'rsatish"}
                            >
                                {showKey ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                            </button>
                        </div>

                        <div className='flex items-center gap-2 shrink-0'>
                            <Button
                                onClick={handleTestKey}
                                variant='outline'
                                disabled={isTesting || !apiKey.trim()}
                                className='h-11 px-3.5 text-xs gap-1.5'
                            >
                                {isTesting ? (
                                    <Loader2 className='size-3.5 animate-spin' />
                                ) : (
                                    <Sparkles className='size-3.5 text-primary' />
                                )}
                                {t.apiKeyTestBtn}
                            </Button>

                            <Button
                                onClick={handleSaveKey}
                                disabled={isSaving || !apiKey.trim()}
                                className='h-11 px-4 text-xs font-semibold gap-1.5'
                            >
                                {isSaving ? (
                                    <Loader2 className='size-3.5 animate-spin' />
                                ) : (
                                    <Check className='size-3.5' />
                                )}
                                {t.apiKeySaveBtn}
                            </Button>
                        </div>
                    </div>

                    {/* Sinov natijasi */}
                    {testSuccess === true && (
                        <p className='text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in'>
                            <CheckCircle2 className='size-3.5' />
                            {t.apiKeySuccessToast}
                        </p>
                    )}
                </div>

                {/* Imtiyozlar va Xavfsizlik belgisi */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1'>
                    <div className='flex items-center gap-2.5 rounded-xl border bg-muted/20 p-3'>
                        <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                            <Sparkles className='size-4' />
                        </div>
                        <div className='text-xs'>
                            <p className='font-semibold text-foreground'>{t.apiKeyFreeBadge}</p>
                            <p className='text-muted-foreground mt-0.5'>
                                {language === 'uz'
                                    ? 'Google AI Studio tomonidan hech qanday to‘lovsiz taqdim etiladi.'
                                    : 'Provided completely free by Google AI Studio.'}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2.5 rounded-xl border bg-muted/20 p-3'>
                        <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                            <ShieldCheck className='size-4' />
                        </div>
                        <div className='text-xs'>
                            <p className='font-semibold text-foreground'>{t.apiKeySecurityBadge}</p>
                            <p className='text-muted-foreground mt-0.5'>
                                {language === 'uz'
                                    ? 'Kalitingiz maxfiy saqlanadi va boshqa foydalanuvchilar bilan bo‘lishilmaydi.'
                                    : 'Your key stays private and is never shared with other users.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Qo'llanma bo'limi (Video va Qadamma-qadam yo'riqnoma) */}
                <div className='border-t pt-5 space-y-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2.5'>
                        <div className='flex items-center gap-2'>
                            <Cpu className='size-4 text-primary' />
                            <h3 className='text-sm font-bold text-foreground'>
                                {t.apiKeyVideoGuideTitle}
                            </h3>
                        </div>

                        {/* Tab almashtirish */}
                        <div className='inline-flex rounded-xl bg-muted/60 p-1 self-start sm:self-auto'>
                            <button
                                type='button'
                                onClick={() => setGuideTab('video')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                                    guideTab === 'video'
                                        ? 'bg-card text-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <Video className='size-3.5 text-primary' />
                                {t.apiKeyWatchVideo}
                            </button>
                            <button
                                type='button'
                                onClick={() => setGuideTab('steps')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                                    guideTab === 'steps'
                                        ? 'bg-card text-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <BookOpen className='size-3.5 text-primary' />
                                {t.apiKeyReadSteps}
                            </button>
                        </div>
                    </div>

                    {/* Video Qo'llanma Tab */}
                    {guideTab === 'video' && (
                        <div className='space-y-3 animate-in fade-in-50 duration-200'>
                            <div className='relative aspect-video w-full rounded-2xl overflow-hidden border bg-neutral-950 shadow-md ring-1 ring-border/50'>
                                <iframe
                                    src='https://www.youtube.com/embed/JdKcFCLotZY?rel=0'
                                    title='Get Your Gemini API Key in Google AI Studio - Official Google Cloud'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    allowFullScreen
                                    className='absolute inset-0 size-full border-0'
                                />
                            </div>

                            {/* YouTube to'g'ridan-to'g'ri havola va ogohlantirish */}
                            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/80 bg-muted/40 p-3 text-xs'>
                                <div className='flex items-center gap-2 text-muted-foreground'>
                                    <AlertTriangle className='size-4 text-amber-500 shrink-0' />
                                    <span>{t.apiKeyVideoFallback}</span>
                                </div>
                                <div className='flex items-center gap-2 shrink-0'>
                                    <a
                                        href='https://www.youtube.com/watch?v=JdKcFCLotZY'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs'
                                    >
                                        <Video className='size-3.5' />
                                        {t.apiKeyOpenYouTube}
                                        <ExternalLink className='size-3' />
                                    </a>
                                    <a
                                        href='https://aistudio.google.com/app/apikey'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3 py-1.5 text-xs transition-colors shadow-xs'
                                    >
                                        {t.apiKeyOpenAIStudio}
                                        <ExternalLink className='size-3' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Qadamma-qadam Tab */}
                    {guideTab === 'steps' && (
                        <div className='space-y-3 animate-in fade-in-50 duration-200'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <div className='flex gap-3 rounded-xl border bg-card p-3.5'>
                                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground'>
                                        1
                                    </span>
                                    <div className='space-y-1 text-xs'>
                                        <p className='font-semibold text-foreground'>
                                            {language === 'uz' ? 'AI Studio saytiga o‘ting' : 'Visit Google AI Studio'}
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {t.apiKeyStep1}
                                        </p>
                                        <Button
                                            size='sm'
                                            variant='ghost'
                                            className='h-7 px-2 text-[11px] text-primary gap-1 mt-1 -ml-2'
                                            onClick={() => handleCopyUrl('https://aistudio.google.com/app/apikey')}
                                        >
                                            {copiedUrl ? <Check className='size-3' /> : <Copy className='size-3' />}
                                            {copiedUrl ? (language === 'uz' ? 'Nusxalandi' : 'Copied') : (language === 'uz' ? 'Havolani nusxalash' : 'Copy link')}
                                        </Button>
                                    </div>
                                </div>

                                <div className='flex gap-3 rounded-xl border bg-card p-3.5'>
                                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground'>
                                        2
                                    </span>
                                    <div className='space-y-1 text-xs'>
                                        <p className='font-semibold text-foreground'>
                                            {language === 'uz' ? 'Google akkaunt bilan kiring' : 'Sign in with Google'}
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {t.apiKeyStep2}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-3 rounded-xl border bg-card p-3.5'>
                                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground'>
                                        3
                                    </span>
                                    <div className='space-y-1 text-xs'>
                                        <p className='font-semibold text-foreground'>
                                            {language === 'uz' ? 'Kalit yarating' : 'Generate API Key'}
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {t.apiKeyStep3}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-3 rounded-xl border bg-card p-3.5'>
                                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground'>
                                        4
                                    </span>
                                    <div className='space-y-1 text-xs'>
                                        <p className='font-semibold text-foreground'>
                                            {language === 'uz' ? 'Kalitni saqlang' : 'Paste & Save'}
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {t.apiKeyStep4}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
