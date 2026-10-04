'use client';

import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
                placeholder='Savolingizni yozing...'
                rows={4}
                disabled={isSending}
                aria-label='AI savoli'
            />
            <div className='flex justify-end'>
                <Button type='submit' disabled={!value.trim() || isSending}>
                    <Send />
                    {isSending ? 'Yuborilmoqda...' : 'Yuborish'}
                </Button>
            </div>
        </form>
    );
}
