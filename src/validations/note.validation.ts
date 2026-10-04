import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .max(255, "Title must be at most 255 characters.")
    .optional(),

  content: z.string().trim().min(1, "Content is required."),
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .max(255, "Title must be at most 255 characters.")
    .optional(),
  content: z.string().trim().min(1, "Content cannot be empty.").optional(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>;
