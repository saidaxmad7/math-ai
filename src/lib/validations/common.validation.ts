import { z } from "zod";

export const cuidSchema = (fieldName: string) =>
    z.object({
        [fieldName]: z.string().cuid(`Invalid ${fieldName}.`),
    });

export const slugSchema = z.object({
    slug: z.string().min(1, "Slug is required."),
});