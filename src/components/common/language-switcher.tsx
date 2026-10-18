'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { toast } from 'sonner';

import { useLanguage } from '@/i18n/language-context';
import { Language } from '@/i18n/types';
import { UzbekistanFlag, UKFlag, RussianFlag } from '@/components/common/flag-icons';
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
    showChevron?: boolean;
    sideOffset?: number;
}

type LanguageOption = {
    id: Language;
    label: string;
    nativeName: string;
    subLabel: string;
    Flag: React.ComponentType<{ className?: string }>;
};

const languages: LanguageOption[] = [
    {
        id: 'uz',
        label: 'UZ',
        nativeName: "O'zbekcha",
        subLabel: 'Lotin yozuvi',
        Flag: UzbekistanFlag,
    },
    {
        id: 'ru',
        label: 'RU',
        nativeName: 'Русский',
        subLabel: 'Кириллица',
        Flag: RussianFlag,
    },
    {
        id: 'en',
        label: 'EN',
        nativeName: 'English',
        subLabel: 'International',
        Flag: UKFlag,
    },
];

export function LanguageSwitcher({
    variant = 'dropdown',
    className,
    showChevron = true,
    sideOffset = 26,
}: LanguageSwitcherProps) {
    const { language, setLanguage, translations } = useLanguage();

    const currentLang = languages.find((l) => l.id === language) ?? languages[0];
    const CurrentFlag = currentLang.Flag;

    const handleSelect = (langId: Language) => {
        if (langId === language) return;
        setLanguage(langId);
        const toastMsg =
            langId === 'uz'
                ? "Til o'zgartirildi: O'zbekcha"
                : langId === 'ru'
                ? 'Язык изменен на Русский 🇷🇺'
                : 'Language changed to English 🇬🇧';
        toast.success(toastMsg);
    };

    if (variant === 'segmented') {
        return (
            <div
                className={cn(
                    'inline-flex items-center gap-1 rounded-2xl border border-border/60 bg-muted/30 p-1 backdrop-blur-xs',
                    className
                )}
            >
                {languages.map((item) => {
                    const isActive = item.id === language;
                    const ItemFlag = item.Flag;
                    return (
                        <button
                            key={item.id}
                            type='button'
                            onClick={() => handleSelect(item.id)}
                            className={cn(
                                'flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer',
                                isActive
                                    ? 'bg-background text-foreground shadow-xs ring-1 ring-border/50'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                            )}
                        >
                            <ItemFlag className='size-4' />
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
        const NextFlag = nextItem.Flag;

        return (
            <button
                type='button'
                onClick={() => handleSelect(nextLang)}
                className={cn(
                    'inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 text-xs font-semibold shadow-2xs backdrop-blur-xs transition-all hover:border-primary/40 hover:bg-accent/50 cursor-pointer',
                    className
                )}
                title={`Switch to ${nextItem.nativeName}`}
            >
                <CurrentFlag className='size-4' />
                <span className='font-mono text-xs'>{currentLang.label}</span>
            </button>
        );
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                className={cn(
                    'group inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-2.5 sm:px-3 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 data-popup-open:bg-white/15 data-popup-open:border-white/25 data-popup-open:text-white',
                    className
                )}
                aria-label={translations.common.language}
            >
                <CurrentFlag className='size-4 shrink-0' />
                <span className='font-mono font-bold text-xs tracking-wider'>
                    {currentLang.label}
                </span>
                {showChevron && (
                    <ChevronDown className='size-3 text-slate-400 transition-transform duration-200 group-data-popup-open:rotate-180 group-data-[state=open]:rotate-180 group-hover:text-slate-200' />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                sideOffset={sideOffset}
                className='w-52 rounded-2xl p-1.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9)] border border-white/10 bg-slate-950/95 backdrop-blur-2xl ring-1 ring-white/10'
            >
                <div className='px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                    {translations.common.language}
                </div>
                {languages.map((item) => {
                    const ItemFlag = item.Flag;
                    const isSelected = item.id === language;
                    return (
                        <DropdownMenuItem
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={cn(
                                'flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs transition-all duration-150 outline-none select-none my-0.5',
                                isSelected
                                    ? 'bg-violet-500/15 text-violet-300 font-semibold border border-violet-500/30'
                                    : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                            )}
                        >
                            <div className='flex items-center gap-2.5'>
                                <ItemFlag className='size-4.5 shrink-0' />
                                <div>
                                    <p className='leading-none font-medium'>{item.nativeName}</p>
                                    <p className='text-[10px] text-slate-400 mt-0.5'>
                                        {item.subLabel}
                                    </p>
                                </div>
                            </div>
                            {isSelected && (
                                <Check className='size-3.5 text-violet-400 stroke-[2.5]' />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
