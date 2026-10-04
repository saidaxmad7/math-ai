'use client';

import { useState } from 'react';
import { Bot, MessageSquarePlus, Sparkles, Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    useAIConversation,
    useAIConversations,
    useSendAIMessage,
} from '@/hooks/use-ai';
import { AIComposer } from '@/features/ai/components/ai-composer';
import { AIMessageList } from '@/features/ai/components/ai-message-list';

const SUGGESTED_PROMPTS = [
    {
        title: '📐 Pifagor teoremasi',
        prompt: "Pifagor teoremasini va to'g'ri burchakli uchburchakda gipotenuza topish qoidasini misol bilan tushuntirib bering.",
    },
    {
        title: '🔢 Kvadrat tenglama va Viet',
        prompt: "Kvadrat tenglamani diskriminant va Viyet teoremasi yordamida yechish usullarini qisqa formulalar bilan ko'rsating.",
    },
    {
        title: '📈 Hosilaning ma\'nosi',
        prompt: "Funksiya hosilasi nima va uning geometrik ma'nosi nimalardan iborat?",
    },
    {
        title: '🎲 Ehtimollik klassik ta\'rifi',
        prompt: "Klassik ehtimollik formulasi P(A) = m/n bo'yicha namunaviy masala yechib bering.",
    },
];

export function AIChat() {
    const [conversationId, setConversationId] = useState<string>();
    const [content, setContent] = useState('');
    const {
        data: conversations = [],
        isLoading: isConversationsLoading,
        isError: isConversationsError,
    } = useAIConversations();
    const { data: conversation } = useAIConversation(conversationId);
    const sendMessage = useSendAIMessage();

    const activeConversationId = conversationId ?? conversations[0]?.id;

    const activeConversation =
        conversation ??
        conversations.find((item) => item.id === activeConversationId);

    async function handleSubmit(promptText?: string) {
        const textToSend = (promptText || content).trim();
        if (!textToSend || sendMessage.isPending) return;

        try {
            const response = await sendMessage.mutateAsync({
                conversationId: activeConversationId,
                content: textToSend,
                stream: false,
                contextType: 'CHAT',
            });

            setConversationId(response.id);
            setContent('');
        } catch (e) {
            console.error('AI xabari yuborishda xatolik:', e);
        }
    }

    function handleStartNewChat() {
        setConversationId(undefined);
        setContent('');
    }

    if (isConversationsError) {
        return (
            <Card>
                <CardContent className='py-8 text-sm text-destructive'>
                    AI suhbatlarini yuklab bo&apos;lmadi.
                </CardContent>
            </Card>
        );
    }

    const currentMessages = activeConversation?.messages ?? [];

    return (
        <div className='grid gap-6 lg:grid-cols-[280px_1fr]'>
            {/* Chap panel: Suhbatlar tarixi */}
            <Card className='h-fit shadow-xs'>
                <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                        <CardTitle className='text-base font-semibold'>Suhbatlar tarixi</CardTitle>
                        <Button
                            variant='outline'
                            size='sm'
                            className='h-8 gap-1 text-xs'
                            onClick={handleStartNewChat}
                        >
                            <MessageSquarePlus className='size-3.5' />
                            Yangi
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className='space-y-1.5 pt-0'>
                    {isConversationsLoading ? (
                        <div className='flex items-center gap-2 py-4 text-xs text-muted-foreground'>
                            <Loader2 className='size-3.5 animate-spin' />
                            Yuklanmoqda...
                        </div>
                    ) : conversations.length === 0 ? (
                        <p className='py-4 text-xs text-muted-foreground text-center'>
                            Hali suhbatlar yo&apos;q.
                        </p>
                    ) : (
                        <div className='max-h-[500px] overflow-y-auto space-y-1 pr-1'>
                            {conversations.map((item) => (
                                <button
                                    key={item.id}
                                    type='button'
                                    className={`w-full truncate rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${
                                        item.id === activeConversationId
                                            ? 'bg-primary/10 font-semibold text-primary'
                                            : 'text-muted-foreground'
                                    }`}
                                    onClick={() => setConversationId(item.id)}
                                >
                                    {item.title ?? 'Yangi suhbat'}
                                </button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* O'ng panel: Chat va Savollar */}
            <div className='space-y-6'>
                {/* Tavsiya etilgan namunaviy savollar (agar chat bo'sh bo'lsa) */}
                {currentMessages.length === 0 && (
                    <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                            <Sparkles className='size-3.5 text-primary' />
                            Tezkor namunaviy savollar
                        </div>
                        <div className='grid gap-2 sm:grid-cols-2'>
                            {SUGGESTED_PROMPTS.map((item, idx) => (
                                <button
                                    key={idx}
                                    type='button'
                                    disabled={sendMessage.isPending}
                                    onClick={() => {
                                        setContent(item.prompt);
                                        handleSubmit(item.prompt);
                                    }}
                                    className='flex flex-col items-start rounded-xl border bg-card p-3 text-left transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-xs disabled:opacity-50'
                                >
                                    <span className='text-xs font-semibold text-foreground'>{item.title}</span>
                                    <span className='mt-1 text-[11px] text-muted-foreground line-clamp-2'>
                                        {item.prompt}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <AIMessageList messages={currentMessages} />

                {sendMessage.isPending && (
                    <div className='flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-xs text-muted-foreground animate-pulse'>
                        <Bot className='size-4 text-primary animate-spin' />
                        AI matematika yordamchisi javob tayyorlamoqda...
                    </div>
                )}

                {sendMessage.isError && (
                    <p className='text-xs text-destructive rounded-lg border border-destructive/20 bg-destructive/10 p-3'>
                        Xatolik: {sendMessage.error.message || 'AI javob berishda xatolik yuz berdi.'}
                    </p>
                )}

                <AIComposer
                    value={content}
                    isSending={sendMessage.isPending}
                    onChange={setContent}
                    onSubmit={() => handleSubmit()}
                />
            </div>
        </div>
    );
}
