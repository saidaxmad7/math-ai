import { z } from 'zod';

import { AI_MAX_MESSAGE_LENGTH } from '@/constants/ai';

export const aiContextTypeSchema = z.enum([
    'CHAT',
    'LESSON',
    'PRACTICE',
    'QUIZ',
]);

export const sendAIMessageSchema = z.object({
    conversationId: z.string().cuid().optional(),
    content: z
        .string()
        .trim()
        .min(1, 'Message is required.')
        .max(AI_MAX_MESSAGE_LENGTH),
    stream: z.boolean().default(false),
    contextType: aiContextTypeSchema.default('CHAT'),
    contextId: z.string().trim().max(100).optional(),
});

export type SendAIMessageInput = z.infer<typeof sendAIMessageSchema>;
