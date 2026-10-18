"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/container";

import { useLanguage } from "@/i18n/language-context";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

export function Footer() {
    const { language } = useLanguage();

    return (
        <footer className='relative border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-8'>
            <Container className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-sm text-slate-400'>
                    {language === "uz"
                        ? "© 2026 Math AI • Barcha huquqlar himoyalangan"
                        : language === "ru"
                        ? "© 2026 Math AI • Все права защищены"
                        : "© 2026 Math AI • All rights reserved"}
                </p>

                <a
                    href='https://www.instagram.com/madaminow.s/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group inline-flex items-center gap-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white'
                >
                    <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-300 transition-all duration-200 group-hover:border-pink-500/40 group-hover:bg-gradient-to-tr group-hover:from-amber-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 group-hover:text-pink-400 group-hover:shadow-[0_0_12px_rgba(236,72,153,0.3)]'>
                        <InstagramIcon className='h-3.5 w-3.5' />
                    </span>
                    <span className='group-hover:text-white transition-colors'>
                        Designed &amp; Developed by <span className='font-semibold text-white group-hover:text-pink-300 transition-colors'>Saidahmad</span>
                    </span>
                    <ArrowUpRight className='h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink-300' />
                </a>
            </Container>
        </footer>
    );
}
