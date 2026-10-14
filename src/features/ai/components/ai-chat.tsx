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
import { useLanguage } from '@/i18n/language-context';

const SUGGESTED_PROMPTS_UZ = [
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

const SUGGESTED_PROMPTS_EN = [
    {
        title: '📐 Pythagorean Theorem',
        prompt: 'Explain the Pythagorean theorem and how to calculate the hypotenuse in a right-angled triangle with a clear example.',
    },
    {
        title: '🔢 Quadratic Equations & Vieta',
        prompt: "Demonstrate how to solve quadratic equations using the discriminant and Vieta's relations with concise formulas.",
    },
    {
        title: '📈 Geometric Meaning of Derivatives',
        prompt: 'What is a mathematical derivative and what is its geometric meaning on function graphs?',
    },
    {
        title: '🎲 Classical Probability',
        prompt: 'Solve a sample problem step-by-step using the classical probability formula P(A) = m/n.',
    },
];

export function AIChat() {
    const { translations, language } = useLanguage();
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

    const prompts = language === 'uz' ? SUGGESTED_PROMPTS_UZ : SUGGESTED_PROMPTS_EN;

    async function handleSubmit(promptText?: string) {
        const textToSend = (promptText || content).trim();
        if (!textToSend || sendMessage.isPending) return;

        try {
            const response = await sendMessage.mutateAsync({
                conversationId: activeConversationId,
                content: textToSend,
                stream: false,
                contextType: 'CHAT',
                language,
            });

            setConversationId(response.id);
            setContent('');
        } catch (e) {
            console.error('AI error:', e);
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
                    {translations.aiChat.loadError}
                </CardContent>
            </Card>
        );
    }

    const currentMessages = activeConversation?.messages ?? [];

    return (
        <div className='grid gap-6 lg:grid-cols-[280px_1fr]'>
            {/* History Panel */}
            <Card className='h-fit shadow-xs'>
                <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                        <CardTitle className='text-base font-semibold'>
                            {translations.aiChat.historyTitle}
                        </CardTitle>
                        <Button
                            variant='outline'
                            size='sm'
                            className='h-8 gap-1 text-xs'
                            onClick={handleStartNewChat}
                        >
                            <MessageSquarePlus className='size-3.5' />
                            {translations.aiChat.newChat}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className='space-y-1.5 pt-0'>
                    {isConversationsLoading ? (
                        <div className='flex items-center gap-2 py-4 text-xs text-muted-foreground'>
                            <Loader2 className='size-3.5 animate-spin' />
                            {translations.aiChat.loading}
                        </div>
                    ) : conversations.length === 0 ? (
                        <p className='py-4 text-xs text-muted-foreground text-center'>
                            {translations.aiChat.emptyHistory}
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
                                    {item.title ?? translations.aiChat.newChatDefaultTitle}
                                </button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Chat & Prompts */}
            <div className='space-y-6'>
                {/* Suggested Prompts */}
                {currentMessages.length === 0 && (
                    <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                            <Sparkles className='size-3.5 text-primary' />
                            {translations.aiChat.suggestedPromptsTitle}
                        </div>
                        <div className='grid gap-2 sm:grid-cols-2'>
                            {prompts.map((item, idx) => (
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
                        {translations.aiChat.thinking}
                    </div>
                )}

                {sendMessage.isError && (
                    <p className='text-xs text-destructive rounded-lg border border-destructive/20 bg-destructive/10 p-3'>
                        {sendMessage.error.message || 'Error occurred.'}
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
