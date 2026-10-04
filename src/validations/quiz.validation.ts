import { z } from 'zod';

export const startQuizSchema = z.object({
    topicId: z.string().min(1, 'Mavzu ID si kiritilishi shart'),
});

export type StartQuizInput = z.infer<typeof startQuizSchema>;

export const submitAnswerSchema = z.object({
    sessionId: z.string().min(1, 'Sessiya ID si kiritilishi shart'),
    questionId: z.string().min(1, 'Savol ID si kiritilishi shart'),
    userAnswer: z.string().trim().min(1, 'Javob kiritilishi shart'),
    isCustomAnswer: z.boolean().default(false),
    timeSpentSeconds: z.number().int().nonnegative().default(0),
});

export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;

export const resolveMistakeSchema = z.object({
    mistakeId: z.string().min(1, 'Xatolik ID si kiritilishi shart'),
});

export type ResolveMistakeInput = z.infer<typeof resolveMistakeSchema>;
