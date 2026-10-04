'use client';

import { Bot, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Markdown } from '@/components/math/markdown';
import type { AIMessageResponse } from '@/mappers/ai.mapper';

type AIMessageListProps = {
    messages: AIMessageResponse[];
};

export function AIMessageList({ messages }: AIMessageListProps) {
    if (messages.length === 0) {
        return (
            <Card className='border-dashed'>
                <CardContent className='py-12 text-center text-sm text-muted-foreground'>
                    <div className='mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                        <Bot className='size-6' />
                    </div>
                    <p className='font-medium text-foreground'>Savolingizni yozing yoki tavsiya etilgan mavzulardan birini tanlang</p>
                    <p className='mt-1 text-xs text-muted-foreground'>
                        AI yordamchi matematika formulalari, misollar yechimi va tushuntirishlarni qadamma-qadam ko&apos;rsatib beradi.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='space-y-4'>
            {messages.map((message) => {
                const isUser = message.role === 'USER';
                return (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        {!isUser && (
                            <div className='mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary'>
                                <Bot className='size-4' />
                            </div>
                        )}
                        <div
                            className={
                                isUser
                                    ? 'max-w-2xl rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-sm'
                                    : 'max-w-3xl rounded-2xl border bg-card px-5 py-4 text-card-foreground shadow-xs'
                            }
                        >
                            <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider opacity-75'>
                                {isUser ? 'Siz' : 'AI Matematika Yordamchisi'}
                            </p>
                            {isUser ? (
                                <p className='whitespace-pre-wrap text-sm leading-relaxed'>
                                    {message.content}
                                </p>
                            ) : (
                                <div className='text-sm leading-relaxed'>
                                    <Markdown content={message.content} />
                                </div>
                            )}
                        </div>
                        {isUser && (
                            <div className='mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
                                <User className='size-4' />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
