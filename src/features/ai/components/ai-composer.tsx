'use client';

import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/i18n/language-context';

type AIComposerProps = {
    value: string;
    isSending: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

export function AIComposer({
    value,
    isSending,
    onChange,
    onSubmit,
}: AIComposerProps) {
    const { translations } = useLanguage();

    return (
        <form
            className='space-y-3 rounded-xl border bg-card p-4'
            onSubmit={(event) => {
                event.preventDefault();

                if (value.trim() && !isSending) {
                    onSubmit();
                }
            }}
        >
            <Textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={translations.aiChat.inputPlaceholder}
                rows={4}
                disabled={isSending}
                aria-label='AI prompt'
            />
            <div className='flex justify-end'>
                <Button type='submit' disabled={!value.trim() || isSending}>
                    <Send />
                    {isSending
                        ? translations.aiChat.sending
                        : translations.aiChat.send}
                </Button>
            </div>
        </form>
    );
}
