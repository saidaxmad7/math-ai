'use client';

import * as React from 'react';
import { Globe, Check } from 'lucide-react';
import { toast } from 'sonner';

import { useLanguage } from '@/i18n/language-context';
import { Language } from '@/i18n/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
    variant?: 'dropdown' | 'toggle' | 'segmented';
    className?: string;
}

const languages: { id: Language; label: string; flag: string; nativeName: string }[] = [
    { id: 'uz', label: 'UZ', flag: '🇺🇿', nativeName: "O'zbekcha" },
    { id: 'en', label: 'EN', flag: '🇬🇧', nativeName: 'English' },
];

export function LanguageSwitcher({
    variant = 'dropdown',
    className,
}: LanguageSwitcherProps) {
    const { language, setLanguage, translations } = useLanguage();

    const currentLang = languages.find((l) => l.id === language) || languages[0];

    const handleSelect = (langId: Language) => {
        if (langId === language) return;
        setLanguage(langId);
        const toastMsg =
            langId === 'uz'
                ? translations.settings.langChangedToast || "Til o'zgartirildi: O'zbekcha 🇺🇿"
                : "Language changed to English 🇬🇧";
        toast.success(toastMsg);
    };

    if (variant === 'segmented') {
        return (
            <div
                className={cn(
                    'inline-flex items-center rounded-xl border border-border/60 bg-muted/40 p-1',
                    className
                )}
            >
                {languages.map((item) => {
                    const isActive = item.id === language;
                    return (
                        <button
                            key={item.id}
                            type='button'
                            onClick={() => handleSelect(item.id)}
                            className={cn(
                                'flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150',
                                isActive
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <span>{item.flag}</span>
                            <span>{item.nativeName}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    if (variant === 'toggle') {
        const nextLang = language === 'uz' ? 'en' : 'uz';
        const nextItem = languages.find((l) => l.id === nextLang)!;

        return (
            <Button
                variant='ghost'
                size='sm'
                onClick={() => handleSelect(nextLang)}
                className={cn('h-9 gap-1.5 rounded-full px-3 text-xs font-semibold', className)}
                title={`Switch to ${nextItem.nativeName}`}
            >
                <span className='text-sm'>{currentLang.flag}</span>
                <span>{currentLang.label}</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'inline-flex h-9 items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 text-xs font-semibold shadow-2xs backdrop-blur-sm transition-all hover:bg-accent/80 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    className
                )}
            >
                <span className='text-sm leading-none'>{currentLang.flag}</span>
                <span className='font-bold uppercase tracking-wider text-[11px]'>{currentLang.label}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-44 rounded-2xl p-1.5 shadow-xl'>
                <div className='px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                    {translations.common.language}
                </div>
                {languages.map((item) => (
                    <DropdownMenuItem
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                            'flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors',
                            item.id === language && 'bg-primary/10 text-primary font-semibold'
                        )}
                    >
                        <span className='flex items-center gap-2'>
                            <span className='text-base'>{item.flag}</span>
                            <span>{item.nativeName}</span>
                        </span>
                        {item.id === language && <Check className='size-3.5 text-primary' />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
