'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Language, Translations } from './types';
import { uz } from './locales/uz';
import { en } from './locales/en';
import { ru } from './locales/ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: Translations;
    t: (key: string, fallback?: string) => string;
    isUz: boolean;
    isEn: boolean;
    isRu: boolean;
}

const dictionaries: Record<Language, Translations> = {
    uz,
    en,
    ru,
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'math_lang';
const COOKIE_KEY = 'NEXT_LOCALE';

function getInitialLanguage(): Language {
    if (typeof window === 'undefined') return 'uz';

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'uz' || stored === 'en' || stored === 'ru') {
            return stored as Language;
        }

        const match = document.cookie.match(new RegExp('(^| )' + COOKIE_KEY + '=([^;]+)'));
        if (match && (match[2] === 'uz' || match[2] === 'en' || match[2] === 'ru')) {
            return match[2] as Language;
        }
    } catch {
        // Fallback to default
    }

    return 'uz';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('uz');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const initial = getInitialLanguage();
        setLanguageState(initial);
        setMounted(true);
        if (typeof document !== 'undefined') {
            document.documentElement.lang = initial;
        }
    }, []);

    const setLanguage = useCallback((newLang: Language) => {
        setLanguageState(newLang);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY, newLang);
                document.cookie = `${COOKIE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
                document.documentElement.lang = newLang;
            } catch {
                // Ignore storage errors
            }
        }
    }, []);

    const translations = useMemo(() => dictionaries[language] || uz, [language]);

    const t = useCallback(
        (path: string, fallback?: string): string => {
            const keys = path.split('.');
            let current: any = translations;

            for (const key of keys) {
                if (current && typeof current === 'object' && key in current) {
                    current = current[key];
                } else {
                    return fallback || path;
                }
            }

            return typeof current === 'string' ? current : fallback || path;
        },
        [translations]
    );

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            translations,
            t,
            isUz: language === 'uz',
            isEn: language === 'en',
            isRu: language === 'ru',
        }),
        [language, setLanguage, translations, t]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        // Safe fallback in case used outside provider
        return {
            language: 'uz' as Language,
            setLanguage: () => {},
            translations: uz,
            t: (key: string, fallback?: string) => fallback || key,
            isUz: true,
            isEn: false,
            isRu: false,
        };
    }
    return context;
}
