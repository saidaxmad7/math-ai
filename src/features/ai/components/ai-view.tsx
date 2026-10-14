'use client';

import { AIChat } from '@/features/ai/components/ai-chat';
import { useLanguage } from '@/i18n/language-context';

export function AIView() {
    const { translations } = useLanguage();

    return (
        <div className='space-y-8'>
            <div>
                <h1 className='font-heading text-4xl font-bold'>
                    {translations.aiChat.title}
                </h1>
                <p className='mt-2 text-muted-foreground'>
                    {translations.aiChat.subtitle}
                </p>
            </div>

            <AIChat />
        </div>
    );
}
