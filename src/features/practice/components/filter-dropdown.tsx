'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterDropdownOption<T extends string = string> = {
    value: T;
    label: string;
    badge?: string;
    icon?: ReactNode;
};

interface FilterDropdownProps<T extends string = string> {
    label?: string;
    icon?: ReactNode;
    value: T | undefined;
    onChange: (value: T | undefined) => void;
    options: FilterDropdownOption<T>[];
    allLabel: string;
    className?: string;
    disabled?: boolean;
}

export function FilterDropdown<T extends string = string>({
    icon,
    value,
    onChange,
    options,
    allLabel,
    className,
    disabled = false,
}: FilterDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Selected option object
    const selectedOption = options.find((opt) => opt.value === value);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            {/* Trigger Button */}
            <div
                role='button'
                tabIndex={disabled ? -1 : 0}
                aria-expanded={isOpen}
                aria-haspopup='listbox'
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
                className={cn(
                    'group flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-input bg-card px-3 text-sm font-medium text-foreground shadow-xs transition-all duration-200 outline-none select-none',
                    'hover:border-primary/50 hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
                    'dark:bg-zinc-900/90 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80',
                    isOpen && 'border-primary ring-2 ring-primary/20 dark:border-primary dark:ring-primary/20',
                    disabled && 'cursor-not-allowed opacity-50',
                    !disabled && 'cursor-pointer',
                )}
            >
                <div className='flex min-w-0 items-center gap-2'>
                    {icon && (
                        <span className='shrink-0 text-muted-foreground group-hover:text-foreground transition-colors'>
                            {icon}
                        </span>
                    )}
                    <span className={cn(
                        'truncate',
                        !value && 'text-muted-foreground',
                        value && 'font-semibold text-foreground',
                    )}>
                        {selectedOption ? selectedOption.label : allLabel}
                    </span>
                    {selectedOption?.badge && (
                        <span className='hidden shrink-0 rounded-md bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground sm:inline-block'>
                            {selectedOption.badge}
                        </span>
                    )}
                </div>

                <div className='flex shrink-0 items-center gap-1'>
                    {/* Clear Button */}
                    {value && !disabled && (
                        <button
                            type='button'
                            aria-label='Tozalash'
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(undefined);
                            }}
                            className='rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                        >
                            <X className='h-3.5 w-3.5' />
                        </button>
                    )}
                    {/* Animated Chevron */}
                    <ChevronDown
                        className={cn(
                            'h-4 w-4 text-muted-foreground transition-transform duration-200 ease-out',
                            isOpen && 'rotate-180 text-primary',
                        )}
                    />
                </div>
            </div>

            {/* Dropdown Menu Popup */}
            {isOpen && (
                <div
                    role='listbox'
                    className={cn(
                        'absolute top-full left-0 z-50 mt-1.5 w-full min-w-[210px] overflow-hidden rounded-xl border border-border/80 bg-popover/98 p-1.5 shadow-xl backdrop-blur-md transition-all duration-150',
                        'dark:bg-zinc-900/98 dark:border-zinc-800 dark:shadow-2xl dark:shadow-black/50',
                        'animate-in fade-in-0 zoom-in-95',
                    )}
                >
                    <div className='max-h-60 overflow-y-auto space-y-0.5 pr-0.5'>
                        {/* "All" Option */}
                        <div
                            role='option'
                            aria-selected={!value}
                            onClick={() => {
                                onChange(undefined);
                                setIsOpen(false);
                            }}
                            className={cn(
                                'flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition-colors cursor-pointer',
                                !value
                                    ? 'bg-primary/10 text-primary font-semibold dark:bg-primary/20 dark:text-primary'
                                    : 'text-foreground hover:bg-accent/80 hover:text-accent-foreground',
                            )}
                        >
                            <span>{allLabel}</span>
                            {!value && <Check className='h-4 w-4 text-primary shrink-0' />}
                        </div>

                        {/* Divider */}
                        {options.length > 0 && (
                            <div className='my-1 h-px bg-border/60 dark:bg-zinc-800' />
                        )}

                        {/* Option Items */}
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <div
                                    key={option.value}
                                    role='option'
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        'flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors cursor-pointer',
                                        isSelected
                                            ? 'bg-primary/10 text-primary font-semibold dark:bg-primary/20 dark:text-primary'
                                            : 'text-foreground hover:bg-accent/80 hover:text-accent-foreground',
                                    )}
                                >
                                    <div className='flex items-center gap-2 truncate'>
                                        {option.icon && (
                                            <span className='shrink-0'>{option.icon}</span>
                                        )}
                                        <span className='truncate'>{option.label}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5 shrink-0'>
                                        {option.badge && (
                                            <span className='rounded-md bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground'>
                                                {option.badge}
                                            </span>
                                        )}
                                        {isSelected && (
                                            <Check className='h-4 w-4 text-primary shrink-0' />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
