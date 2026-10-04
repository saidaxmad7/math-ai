'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Markdown } from '@/components/math/markdown';
import { cn } from '@/lib/utils';

type InLessonAITutorProps = {
    lessonId: string;
    lessonTitle: string;
    gradeName: string;
    subjectName: string;
};

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export function InLessonAITutor({
    lessonId,
    lessonTitle,
    gradeName,
    subjectName,
}: InLessonAITutorProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Salom! Men sizning **${gradeName} ${subjectName}** bo‘yicha AI ustozingizman. **«${lessonTitle}»** mavzusida tushunmagan biron bir joyingiz bormi? Quyidagi tayyor savollardan birini tanlashingiz yoki o‘z savolingizni yozishingiz mumkin!`,
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | undefined>();

    const promptChips = [
        `💡 Bu mavzuni eng oddiy hayotiy misol bilan tushuntir`,
        `📐 Formulaning har bir belgisini soddaroq izohlab ber`,
        `⚠️ Bu mavzuda eng ko‘p qilinadigan xatolar qaysilar?`,
        `✍️ Menga qadam-baqadam yechiladigan yana 1 ta oson misol ko‘rsat`,
    ];

    const sendMessage = async (textToSend: string) => {
        const text = textToSend.trim();
        if (!text || isLoading) return;

        setInput('');
        const userMsg: Message = { role: 'user', content: text };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/ai/conversations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: text,
                    conversationId,
                    contextType: 'LESSON',
                    contextId: lessonId,
                    stream: false,
                }),
            });

            if (!res.ok) {
                throw new Error('AI javob berishda xatolik yuz berdi.');
            }

            const data = await res.json();
            const reply =
                data.data?.messages?.[data.data.messages.length - 1]?.content ||
                data.data?.message?.content ||
                'Kechirasiz, javobni qayta ishlashda muammo bo‘ldi.';

            if (data.data?.id) {
                setConversationId(data.data.id);
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'Kechirasiz, tizimda vaqtinchalik xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='space-y-4 pt-6'>
            <div className='flex items-center gap-3 border-b pb-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400'>
                    <Bot className='h-5 w-5' />
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-heading text-2xl font-bold tracking-tight text-foreground'>
                            AI Ustoz bilan tushunmagan joyni so‘rang
                        </h2>
                        <span className='rounded-full bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400'>
                            Gemini 3.8 Flash
                        </span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                        «Bu joyini tushunmadim» desangiz, AI butun darsni emas, aynan shu qismini yanada sodda tilda tushuntirib beradi.
                    </p>
                </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className='flex flex-wrap gap-2 pt-1'>
                {promptChips.map((chip, idx) => (
                    <button
                        key={idx}
                        type='button'
                        disabled={isLoading}
                        onClick={() => sendMessage(chip)}
                        className='rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-violet-500 hover:bg-violet-500/10'
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Chat Box Container */}
            <div className='overflow-hidden rounded-2xl border bg-card shadow-xs'>
                <div className='max-h-[460px] min-h-[220px] overflow-y-auto p-4 sm:p-6 space-y-4'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={cn(
                                'flex gap-3',
                                msg.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {msg.role === 'assistant' && (
                                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white shadow-xs'>
                                    <Bot className='h-4 w-4' />
                                </div>
                            )}

                            <div
                                className={cn(
                                    'max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs',
                                    msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground font-medium'
                                        : 'border bg-muted/30 text-foreground'
                                )}
                            >
                                <Markdown content={msg.content} />
                            </div>

                            {msg.role === 'user' && (
                                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary'>
                                    <User className='h-4 w-4' />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className='flex items-center gap-3 text-muted-foreground text-sm py-2'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-600 animate-pulse'>
                                <Bot className='h-4 w-4' />
                            </div>
                            <div className='flex items-center gap-2 rounded-2xl border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground'>
                                <RefreshCw className='h-3.5 w-3.5 animate-spin text-violet-500' />
                                <span>AI ustoz dars asosida javob tayyorlamoqda...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(input);
                    }}
                    className='flex items-center gap-2 border-t bg-muted/10 p-3'
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Masalan: «Nega diskriminant 0 dan kichik bo‘lsa ildiz yo‘q?» yoki «Qavslarni qanday qo‘yish kerak?»'
                        disabled={isLoading}
                        className='h-11 rounded-xl bg-background text-sm'
                    />
                    <Button
                        type='submit'
                        disabled={!input.trim() || isLoading}
                        className='h-11 px-4 rounded-xl gap-2 font-medium shrink-0'
                    >
                        <span>Yuborish</span>
                        <Send className='h-4 w-4' />
                    </Button>
                </form>
            </div>
        </section>
    );
}
