import { z } from 'zod';

export const uploadBookSchema = z.object({
    gradeId: z.string().min(1, 'Sinf tanlanishi shart'),
    subjectId: z.string().min(1, 'Fan tanlanishi shart'),
    title: z.string().trim().min(1, 'Kitob nomi kiritilishi shart'),
});

export type UploadBookInput = z.infer<typeof uploadBookSchema>;

export const parseBookSchema = z.object({
    bookId: z.string().min(1, 'Kitob ID si kiritilishi shart'),
});

export type ParseBookInput = z.infer<typeof parseBookSchema>;
