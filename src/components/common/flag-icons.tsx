import * as React from 'react';
import { cn } from '@/lib/utils';

interface FlagProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    variant?: 'circle' | 'rounded';
}

/**
 * High-definition Vector Flag of Uzbekistan 🇺🇿
 * Renders identically and crisp on all operating systems (Windows, macOS, Linux, iOS, Android).
 */
export function UzbekistanFlag({
    className,
    variant = 'circle',
    ...props
}: FlagProps) {
    const isCircle = variant === 'circle';

    return (
        <svg
            viewBox='0 0 32 32'
            aria-label="O'zbekiston bayrog'i"
            className={cn(
                'shrink-0 shadow-2xs ring-1 ring-black/10 dark:ring-white/15',
                isCircle ? 'rounded-full' : 'rounded-md',
                className ?? 'size-5'
            )}
            {...props}
        >
            <defs>
                <clipPath id='uz-flag-clip'>
                    {isCircle ? (
                        <circle cx='16' cy='16' r='16' />
                    ) : (
                        <rect width='32' height='32' rx='4' />
                    )}
                </clipPath>
            </defs>

            <g clipPath='url(#uz-flag-clip)'>
                {/* Blue Stripe */}
                <rect width='32' height='10.5' fill='#0099B5' />
                {/* Red Margin 1 */}
                <rect y='10.5' width='32' height='0.9' fill='#CE1126' />
                {/* White Stripe */}
                <rect y='11.4' width='32' height='9.2' fill='#FFFFFF' />
                {/* Red Margin 2 */}
                <rect y='20.6' width='32' height='0.9' fill='#CE1126' />
                {/* Green Stripe */}
                <rect y='21.5' width='32' height='10.5' fill='#1EB53A' />

                {/* Crescent Moon */}
                <circle cx='8' cy='5.5' r='3.4' fill='#FFFFFF' />
                <circle cx='9.3' cy='5.5' r='2.8' fill='#0099B5' />

                {/* 12 Stars (3 rows: 3 top, 4 mid, 5 bottom) */}
                {/* Top row - 3 stars */}
                <circle cx='13.5' cy='3.3' r='0.65' fill='#FFFFFF' />
                <circle cx='15.5' cy='3.3' r='0.65' fill='#FFFFFF' />
                <circle cx='17.5' cy='3.3' r='0.65' fill='#FFFFFF' />

                {/* Middle row - 4 stars */}
                <circle cx='13.5' cy='5.5' r='0.65' fill='#FFFFFF' />
                <circle cx='15.5' cy='5.5' r='0.65' fill='#FFFFFF' />
                <circle cx='17.5' cy='5.5' r='0.65' fill='#FFFFFF' />
                <circle cx='19.5' cy='5.5' r='0.65' fill='#FFFFFF' />

                {/* Bottom row - 5 stars */}
                <circle cx='11.5' cy='7.7' r='0.65' fill='#FFFFFF' />
                <circle cx='13.5' cy='7.7' r='0.65' fill='#FFFFFF' />
                <circle cx='15.5' cy='7.7' r='0.65' fill='#FFFFFF' />
                <circle cx='17.5' cy='7.7' r='0.65' fill='#FFFFFF' />
                <circle cx='19.5' cy='7.7' r='0.65' fill='#FFFFFF' />
            </g>
        </svg>
    );
}

/**
 * High-definition Vector Flag of the United Kingdom 🇬🇧 (Union Jack)
 * Renders identically and crisp on all operating systems (Windows, macOS, Linux, iOS, Android).
 */
export function UKFlag({
    className,
    variant = 'circle',
    ...props
}: FlagProps) {
    const isCircle = variant === 'circle';

    return (
        <svg
            viewBox='0 0 32 32'
            aria-label='United Kingdom Flag'
            className={cn(
                'shrink-0 shadow-2xs ring-1 ring-black/10 dark:ring-white/15',
                isCircle ? 'rounded-full' : 'rounded-md',
                className ?? 'size-5'
            )}
            {...props}
        >
            <defs>
                <clipPath id='uk-flag-clip'>
                    {isCircle ? (
                        <circle cx='16' cy='16' r='16' />
                    ) : (
                        <rect width='32' height='32' rx='4' />
                    )}
                </clipPath>
            </defs>

            <g clipPath='url(#uk-flag-clip)'>
                {/* Blue Background */}
                <rect width='32' height='32' fill='#012169' />

                {/* White diagonals */}
                <line x1='0' y1='0' x2='32' y2='32' stroke='#FFFFFF' strokeWidth='5.5' />
                <line x1='32' y1='0' x2='0' y2='32' stroke='#FFFFFF' strokeWidth='5.5' />

                {/* Red diagonals */}
                <line x1='0' y1='0' x2='32' y2='32' stroke='#C8102E' strokeWidth='2.2' />
                <line x1='32' y1='0' x2='0' y2='32' stroke='#C8102E' strokeWidth='2.2' />

                {/* White central cross */}
                <rect x='12.5' y='0' width='7' height='32' fill='#FFFFFF' />
                <rect x='0' y='12.5' width='32' height='7' fill='#FFFFFF' />

                {/* Red central cross */}
                <rect x='14' y='0' width='4' height='32' fill='#C8102E' />
                <rect x='0' y='14' width='32' height='4' fill='#C8102E' />
            </g>
        </svg>
    );
}
