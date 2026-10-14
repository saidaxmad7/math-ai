'use client';

import { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Markdown } from '@/components/math/markdown';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/language-context';

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
    const { translations, language } = useLanguage();

    const getGreeting = (lang: 'uz' | 'en') =>
        lang === 'uz'
            ? `Salom! Men sizning **${gradeName} ${subjectName}** bo‘yicha AI ustozingizman. **«${lessonTitle}»** mavzusida tushunmagan biron bir joyingiz bormi? Quyidagi tayyor savollardan birini tanlashingiz yoki o‘z savolingizni yozishingiz mumkin!`
            : `Hello! I am your AI math tutor for **${gradeName} ${subjectName}**. Do you have any questions regarding **"${lessonTitle}"**? Pick one of the suggested prompts below or ask anything!`;

    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: getGreeting(language),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | undefined>();

    // Update greeting if language changes and chat hasn't started yet
    useEffect(() => {
        if (messages.length <= 1) {
            setMessages([
                {
                    role: 'assistant',
                    content: getGreeting(language),
                },
            ]);
        }
    }, [language]);

    const promptChips =
        language === 'uz'
            ? [
                  `💡 Bu mavzuni eng oddiy hayotiy misol bilan tushuntir`,
                  `📐 Formulaning har bir belgisini soddaroq izohlab ber`,
                  `⚠️ Bu mavzuda eng ko‘p qilinadigan xatolar qaysilar?`,
                  `✍️ Menga qadam-baqadam yechiladigan yana 1 ta oson misol ko‘rsat`,
              ]
            : [
                  `💡 Explain this topic with a simple real-life example`,
                  `📐 Explain each symbol in the formula step by step`,
                  `⚠️ What are the most common mistakes in this topic?`,
                  `✍️ Show me another step-by-step example`,
              ];

    const sendMessage = async (textToSend: string) => {
        const text = textToSend.trim();
        if (!text || isLoading) return;

        setInput('');
        const userMsg: Message = { role: 'user', content: text };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const customKey = typeof window !== 'undefined' ? localStorage.getItem('math_gemini_api_key') : null;
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (customKey) {
                headers['x-gemini-api-key'] = customKey;
            }

            const res = await fetch('/api/ai/conversations', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    conversationId,
                    content: text,
                    contextType: 'LESSON',
                    contextId: lessonId,
                    language,
                    ...(customKey ? { customApiKey: customKey } : {}),
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.message || 'AI javob bera olmadi');
            }

            const data = await res.json();
            const reply =
                data.data?.messages?.[data.data.messages.length - 1]?.content ||
                (language === 'uz'
                    ? 'Javob qabul qilindi, ammo matn bo‘sh bo‘ldi.'
                    : 'Response received but content was empty.');

            if (data.data?.id && !conversationId) {
                setConversationId(data.data.id);
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : '';
            const isKeyIssue = errorMsg.toLowerCase().includes('kalit') || 
                               errorMsg.toLowerCase().includes('key') || 
                               errorMsg.toLowerCase().includes('quota') ||
                               errorMsg.toLowerCase().includes('limit');

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: isKeyIssue
                        ? (language === 'uz'
                            ? `⚠️ **Gemini API kaliti zarur:** ${errorMsg}\n\n👉 [Sozlamalar sahifasiga o‘tish](/dashboard/settings) orqali 1 daqiqada bepul shaxsiy kalitingizni ulang.`
                            : `⚠️ **Gemini API key required:** ${errorMsg}\n\n👉 Go to [Settings](/dashboard/settings) to connect your free Gemini API key in 1 minute.`)
                        : (language === 'uz'
                            ? 'Kechirasiz, tizimda vaqtinchalik xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.'
                            : 'Sorry, a temporary error occurred. Please try again.'),
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
                            {language === 'uz'
                                ? 'AI Ustoz bilan tushunmagan joyni so‘rang'
                                : 'Ask AI Tutor to explain anything'}
                        </h2>
                        <span className='rounded-full bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400'>
                            Gemini 3.8 Flash
                        </span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                        {language === 'uz'
                            ? '«Bu joyini tushunmadim» desangiz, AI butun darsni emas, aynan shu qismini yanada sodda tilda tushuntirib beradi.'
                            : 'Say "I didn\'t understand this part" and the AI will simplify that specific concept step by step.'}
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
                                <span>
                                    {language === 'uz'
                                        ? 'AI ustoz dars asosida javob tayyorlamoqda...'
                                        : 'AI tutor is preparing an explanation...'}
                                </span>
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
                        placeholder={
                            language === 'uz'
                                ? 'Masalan: «Nega diskriminant 0 dan kichik bo‘lsa ildiz yo‘q?» yoki «Qavslarni qanday ochish kerak?»'
                                : 'e.g. "Why is there no real root if discriminant is negative?" or "How do I factor this?"'
                        }
                        disabled={isLoading}
                        className='h-11 rounded-xl bg-background text-sm'
                    />
                    <Button
                        type='submit'
                        disabled={!input.trim() || isLoading}
                        className='h-11 px-4 rounded-xl gap-2 font-medium shrink-0'
                    >
                        <span>{translations.lesson.send}</span>
                        <Send className='h-4 w-4' />
                    </Button>
                </form>
            </div>
        </section>
    );
}
