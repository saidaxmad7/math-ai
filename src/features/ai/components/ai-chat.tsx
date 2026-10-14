'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Bot,
    MessageSquarePlus,
    Sparkles,
    Loader2,
    History,
    ChevronDown,
    KeyRound,
    Settings,
    ArrowRight,
    AlertTriangle,
    MessageSquare,
    Trash2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    useAIConversation,
    useAIConversations,
    useSendAIMessage,
    useDeleteAIConversation,
} from '@/hooks/use-ai';
import { AIComposer } from '@/features/ai/components/ai-composer';
import { AIMessageList } from '@/features/ai/components/ai-message-list';
import { useLanguage } from '@/i18n/language-context';
import { toast } from 'sonner';

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
    const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
    const [content, setContent] = useState('');
    const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);

    const {
        data: conversations = [],
        isLoading: isConversationsLoading,
        isError: isConversationsError,
    } = useAIConversations();

    // Agar foydalanuvchi "Yangi suhbat"ni bosgan bo'lsa, activeConversationId = undefined bo'ladi
    const activeConversationId =
        selectedId === 'new'
            ? undefined
            : (selectedId ?? conversations[0]?.id);

    const { data: conversation } = useAIConversation(activeConversationId);
    const sendMessage = useSendAIMessage();
    const deleteConversation = useDeleteAIConversation();

    const activeConversation =
        selectedId === 'new'
            ? null
            : (conversation ?? conversations.find((item) => item.id === activeConversationId));

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

            setSelectedId(response.id);
            setContent('');
        } catch (e: unknown) {
            console.error('AI error:', e);
            const err = e as { response?: { data?: { message?: string } }; message?: string };
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                (language === 'uz'
                    ? "AI javob bera olmadi. Sozlamalar sahifasida o'zingizning bepul Gemini API kalitingizni ulab ko'ring."
                    : "AI failed to respond. Please check your Gemini API key in Settings.");
            toast.error(msg);
        }
    }

    function handleStartNewChat() {
        setSelectedId('new');
        setContent('');
        setMobileHistoryOpen(false);
    }

    async function handleDeleteChat(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        try {
            await deleteConversation.mutateAsync(id);
            if (activeConversationId === id) {
                setSelectedId('new');
            }
            toast.success(language === 'uz' ? "Suhbat o‘chirildi" : "Conversation deleted");
        } catch {
            toast.error(language === 'uz' ? "O‘chirishda xatolik" : "Failed to delete");
        }
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
            {/* Desktop Left History Panel */}
            <Card className='hidden lg:block h-fit shadow-xs'>
                <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                        <CardTitle className='text-base font-semibold'>
                            {translations.aiChat.historyTitle}
                        </CardTitle>
                        <Button
                            variant={selectedId === 'new' ? 'default' : 'outline'}
                            size='sm'
                            className='h-8 gap-1.5 text-xs font-medium cursor-pointer shadow-xs'
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
                            {conversations.map((item) => {
                                const isActive = selectedId !== 'new' && item.id === activeConversationId;
                                return (
                                    <div
                                        key={item.id}
                                        role='button'
                                        tabIndex={0}
                                        className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-primary/10 font-semibold text-primary'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                        onClick={() => setSelectedId(item.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setSelectedId(item.id);
                                            }
                                        }}
                                    >
                                        <div className='flex items-center gap-2 min-w-0 truncate'>
                                            <MessageSquare className={`size-3.5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <span className='truncate'>{item.title || translations.aiChat.newChatDefaultTitle}</span>
                                        </div>
                                        <button
                                            type='button'
                                            title={language === 'uz' ? "O‘chirish" : "Delete"}
                                            className='opacity-0 group-hover:opacity-100 hover:text-destructive p-1 rounded-md transition-all shrink-0 cursor-pointer'
                                            onClick={(e) => handleDeleteChat(e, item.id)}
                                        >
                                            <Trash2 className='size-3.5' />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Mobile & Tablet History Bar */}
            <div className='lg:hidden space-y-2'>
                <div className='flex items-center justify-between gap-2 rounded-2xl border bg-card p-2.5 sm:p-3 shadow-xs'>
                    <button
                        type='button'
                        onClick={() => setMobileHistoryOpen(!mobileHistoryOpen)}
                        className='flex items-center gap-2 min-w-0 text-left'
                    >
                        <Bot className='size-4 text-primary shrink-0' />
                        <span className='text-xs font-semibold truncate'>
                            {activeConversation?.title ?? translations.aiChat.newChatDefaultTitle}
                        </span>
                        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform duration-200 ${mobileHistoryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className='flex items-center gap-1.5 shrink-0'>
                        <Button
                            variant='outline'
                            size='sm'
                            className='h-8 text-xs gap-1'
                            onClick={() => setMobileHistoryOpen(!mobileHistoryOpen)}
                        >
                            <History className='size-3.5' />
                            <span className='hidden sm:inline'>{translations.aiChat.historyTitle}</span>
                        </Button>
                        <Button
                            variant={selectedId === 'new' ? 'default' : 'outline'}
                            size='sm'
                            className='h-8 text-xs gap-1'
                            onClick={handleStartNewChat}
                        >
                            <MessageSquarePlus className='size-3.5' />
                            <span className='hidden sm:inline'>{translations.aiChat.newChat}</span>
                        </Button>
                    </div>
                </div>

                {/* Collapsible Mobile History List */}
                {mobileHistoryOpen && (
                    <Card className='shadow-md border-primary/20 animate-in fade-in-50 duration-150'>
                        <CardHeader className='py-2.5 px-4 border-b'>
                            <CardTitle className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                {translations.aiChat.historyTitle}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-2 max-h-60 overflow-y-auto space-y-1'>
                            {conversations.length === 0 ? (
                                <p className='text-xs text-muted-foreground py-2 text-center'>
                                    {translations.aiChat.emptyHistory}
                                </p>
                            ) : (
                                conversations.map((item) => {
                                    const isActive = selectedId !== 'new' && item.id === activeConversationId;
                                    return (
                                        <div
                                            key={item.id}
                                            role='button'
                                            tabIndex={0}
                                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                                                isActive
                                                    ? 'bg-primary/10 font-semibold text-primary'
                                                    : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                            onClick={() => {
                                                setSelectedId(item.id);
                                                setMobileHistoryOpen(false);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    setSelectedId(item.id);
                                                    setMobileHistoryOpen(false);
                                                }
                                            }}
                                        >
                                            <div className='flex items-center gap-2 min-w-0 truncate'>
                                                <MessageSquare className='size-3.5 shrink-0' />
                                                <span className='truncate'>{item.title ?? translations.aiChat.newChatDefaultTitle}</span>
                                            </div>
                                            <button
                                                type='button'
                                                title={language === 'uz' ? "O‘chirish" : "Delete"}
                                                className='text-muted-foreground hover:text-destructive p-1 rounded-md shrink-0 cursor-pointer'
                                                onClick={(e) => handleDeleteChat(e, item.id)}
                                            >
                                                <Trash2 className='size-3.5' />
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Chat & Prompts Section */}
            <div className='space-y-6'>
                {/* Suggested Prompts (when empty) */}
                {currentMessages.length === 0 && (
                    <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                            <Sparkles className='size-3.5 text-primary' />
                            {translations.aiChat.suggestedPromptsTitle}
                        </div>
                        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2'>
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
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4 text-xs shadow-xs animate-in fade-in duration-200'>
                        <div className='flex items-start gap-3'>
                            <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400'>
                                <KeyRound className='size-4' />
                            </div>
                            <div className='space-y-1 text-left'>
                                <p className='font-bold text-foreground text-sm'>
                                    {language === 'uz' ? 'Google Gemini API kaliti kerak' : 'Google Gemini API Key Required'}
                                </p>
                                <p className='text-muted-foreground leading-relaxed'>
                                    {sendMessage.error.message || (
                                        language === 'uz'
                                            ? "AI bilan to‘liq suhbatlashish uchun Sozlamalar sahifasida o‘zingizning bepul Gemini API kalitingizni ulang (atigi 1 daqiqa vaqt oladi)."
                                            : "Please connect your free Google Gemini API key in Settings to chat with AI (takes 1 minute)."
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 shrink-0 self-end sm:self-center'>
                            <Link
                                href='/dashboard/settings'
                                className='inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer'
                            >
                                <Settings className='size-3.5' />
                                <span>{language === 'uz' ? 'Sozlamalarga o‘tish' : 'Go to Settings'}</span>
                                <ArrowRight className='size-3.5' />
                            </Link>
                        </div>
                    </div>
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
