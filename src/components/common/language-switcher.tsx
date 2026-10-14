'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { toast } from 'sonner';

import { useLanguage } from '@/i18n/language-context';
import { Language } from '@/i18n/types';
import { UzbekistanFlag, UKFlag } from '@/components/common/flag-icons';
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
                : 'Language changed to English';
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
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'group inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2.5 sm:px-3 text-xs font-semibold shadow-2xs backdrop-blur-xs transition-all hover:border-primary/40 hover:bg-accent/60 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    className
                )}
            >
                <CurrentFlag className='size-4' />
                <span className='font-mono font-bold text-xs tracking-wider text-foreground'>
                    {currentLang.label}
                </span>
                {showChevron && (
                    <ChevronDown className='size-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180' />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='w-48 rounded-2xl p-1.5 shadow-xl border-border/80 bg-popover/95 backdrop-blur-md'
            >
                <div className='px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
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
                                'flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all',
                                isSelected
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-foreground hover:bg-muted/80'
                            )}
                        >
                            <div className='flex items-center gap-2.5'>
                                <ItemFlag className='size-4.5' />
                                <div>
                                    <p className='leading-none'>{item.nativeName}</p>
                                    <p className='text-[10px] text-muted-foreground mt-0.5'>
                                        {item.subLabel}
                                    </p>
                                </div>
                            </div>
                            {isSelected && (
                                <Check className='size-3.5 text-primary stroke-[2.5]' />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
