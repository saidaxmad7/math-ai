import { AIContextType, AIMessageRole } from '@prisma/client';

import { AI_MAX_HISTORY_MESSAGES } from '@/constants/ai';
import { buildLessonAIContext } from '@/lib/ai/context';
import { getDefaultConversationTitle, generateTopicTitle } from '@/lib/ai/conversation';
import { aiProvider, type AIProviderMessage } from '@/lib/ai/provider';
import { buildMathTutorPrompt } from '@/lib/ai/system-prompt';
import {
    createConversation,
    createMessage,
    findConversation,
    findConversations,
    findLessonAIContext,
    touchConversation,
    updateConversationTitle,
    deleteConversation,
} from '@/repositories/ai.repository';
import type { SendAIMessageInput } from '@/validations/ai.validation';

function toProviderRole(role: AIMessageRole): AIProviderMessage['role'] {
    switch (role) {
        case AIMessageRole.SYSTEM:
            return 'system';
        case AIMessageRole.ASSISTANT:
            return 'assistant';
        case AIMessageRole.USER:
            return 'user';
    }
}

function toProviderMessages(
    messages: { role: AIMessageRole; content: string }[],
    context?: string,
    language: 'uz' | 'en' = 'uz',
): AIProviderMessage[] {
    const compactMessages = messages
        .filter(
            (message, index, source) =>
                source.findIndex(
                    (candidate) =>
                        candidate.role === message.role &&
                        candidate.content === message.content,
                ) === index,
        )
        .slice(-AI_MAX_HISTORY_MESSAGES);

    return [
        {
            role: 'system',
            content: buildMathTutorPrompt(context, language),
        },
        ...compactMessages.map((message) => ({
            role: toProviderRole(message.role),
            content: message.content,
        })),
    ];
}

async function buildContext(
    contextType: AIContextType | null,
    contextId: string | null,
) {
    if (
        !contextId ||
        (contextType !== AIContextType.LESSON &&
            contextType !== AIContextType.PRACTICE &&
            contextType !== AIContextType.QUIZ)
    ) {
        return undefined;
    }

    const lesson = await findLessonAIContext(contextId);

    if (!lesson) {
        return undefined;
    }

    return buildLessonAIContext({
        grade: lesson.topic.subject.grade.name,
        subject: lesson.topic.subject.name,
        topic: lesson.topic.title,
        lessonTitle: lesson.title,
        description: lesson.description,
    });
}

async function getOrCreateConversation(
    userId: string,
    input: SendAIMessageInput,
) {
    if (input.conversationId) {
        const conversation = await findConversation(
            userId,
            input.conversationId,
        );

        if (!conversation) {
            throw new Error('Conversation not found.');
        }

        // Agar mavjud suhbatning sarlavhasi hali ham 'Yangi suhbat' bo'lsa, uni ushbu savolga moslab yangilaymiz
        if (
            !conversation.title ||
            conversation.title === 'Yangi suhbat' ||
            conversation.title === 'New chat'
        ) {
            let lessonTitle: string | undefined;
            if (conversation.contextId) {
                const lesson = await findLessonAIContext(conversation.contextId);
                lessonTitle = lesson?.title;
            }
            const updatedTitle = generateTopicTitle(input.content, lessonTitle);
            conversation.title = updatedTitle;
            void updateConversationTitle(conversation.id, updatedTitle).catch(() => {});
        }

        return conversation;
    }

    // Yangi suhbat yaratilganda unga birinchi savol asosida aniq mavzu beramiz
    let lessonTitle: string | undefined;
    if (input.contextId) {
        const lesson = await findLessonAIContext(input.contextId);
        lessonTitle = lesson?.title;
    }
    const dynamicTitle = generateTopicTitle(input.content, lessonTitle);

    return createConversation({
        userId,
        title: dynamicTitle,
        contextType: input.contextType,
        contextId: input.contextId,
    });
}

export async function getAIConversations(userId: string) {
    const conversations = await findConversations(userId);

    // Bazadagi barcha eski 'Yangi suhbat' nomli suhbatlarning mavzusini avtomatik tiklash
    for (const conv of conversations) {
        if (!conv.title || conv.title === 'Yangi suhbat' || conv.title === 'New chat') {
            const firstUserMessage = conv.messages.find((m) => m.role === AIMessageRole.USER);
            if (firstUserMessage) {
                let lessonTitle: string | undefined;
                if (conv.contextId) {
                    const lesson = await findLessonAIContext(conv.contextId);
                    lessonTitle = lesson?.title;
                }
                const newTitle = generateTopicTitle(firstUserMessage.content, lessonTitle);
                conv.title = newTitle;
                void updateConversationTitle(conv.id, newTitle).catch(() => {});
            }
        }
    }

    return conversations;
}

export async function removeAIConversation(
    userId: string,
    conversationId: string,
) {
    return deleteConversation(userId, conversationId);
}

export async function getAIConversation(
    userId: string,
    conversationId: string,
) {
    const conversation = await findConversation(userId, conversationId);

    if (!conversation) {
        throw new Error('Conversation not found.');
    }

    return conversation;
}

export async function sendAIMessage(
    userId: string,
    input: SendAIMessageInput,
    apiKey?: string,
) {
    const conversation = await getOrCreateConversation(userId, input);
    const context = await buildContext(
        conversation.contextType,
        conversation.contextId,
    );

    await createMessage({
        conversationId: conversation.id,
        role: AIMessageRole.USER,
        content: input.content,
    });

    const messages: { role: AIMessageRole; content: string }[] = [
        ...conversation.messages,
        { role: AIMessageRole.USER, content: input.content },
    ];
    const content = await aiProvider.generateResponse({
        messages: toProviderMessages(messages, context, input.language),
        apiKey: apiKey ?? input.customApiKey,
    });

    await createMessage({
        conversationId: conversation.id,
        role: AIMessageRole.ASSISTANT,
        content,
    });
    await touchConversation(conversation.id);

    return getAIConversation(userId, conversation.id);
}

export async function* streamAIMessage(
    userId: string,
    input: SendAIMessageInput,
    apiKey?: string,
): AsyncGenerator<
    | { type: 'conversation'; conversationId: string }
    | { type: 'token'; content: string }
    | { type: 'done' },
    void,
    undefined
> {
    const conversation = await getOrCreateConversation(userId, input);
    const context = await buildContext(
        conversation.contextType,
        conversation.contextId,
    );

    await createMessage({
        conversationId: conversation.id,
        role: AIMessageRole.USER,
        content: input.content,
    });

    yield { type: 'conversation', conversationId: conversation.id };

    const messages: { role: AIMessageRole; content: string }[] = [
        ...conversation.messages,
        { role: AIMessageRole.USER, content: input.content },
    ];
    let content = '';

    for await (const token of aiProvider.streamResponse({
        messages: toProviderMessages(messages, context, input.language),
        apiKey: apiKey ?? input.customApiKey,
    })) {
        content += token;
        yield { type: 'token', content: token };
    }

    await createMessage({
        conversationId: conversation.id,
        role: AIMessageRole.ASSISTANT,
        content,
    });
    await touchConversation(conversation.id);

    yield { type: 'done' };
}
