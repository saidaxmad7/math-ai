import { z } from 'zod';

export const practiceQuerySchema = z.object({
    gradeId: z.string().cuid().optional(),
    subjectId: z.string().cuid().optional(),
    query: z.string().trim().max(100).optional(),
    status: z.enum(['all', 'completed', 'incomplete']).default('all'),
    sort: z
        .enum(['priority', 'newest', 'oldest', 'alphabetical'])
        .default('priority'),
});

export type PracticeQuery = z.infer<typeof practiceQuerySchema>;
