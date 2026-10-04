import { z } from "zod";

export const completeLessonSchema = z.object({
    lessonId: z.string().cuid("Invalid lesson id."),
});

export type CompleteLessonSchema = z.infer<typeof completeLessonSchema>;