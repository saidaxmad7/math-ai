import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type NoteWithLesson = Prisma.NoteGetPayload<{
    include: {
        lesson: true;
    };
}>;

export async function findNotesByLesson(
    userId: string,
    lessonId: string,
): Promise<NoteWithLesson[]> {
    return prisma.note.findMany({
        where: {
            userId,
            lessonId,
        },
        include: {
            lesson: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
}

export async function findNoteById(
    id: string,
    userId: string,
): Promise<NoteWithLesson | null> {
    return prisma.note.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            lesson: true,
        },
    });
}

export async function createNote(
    data: Prisma.NoteUncheckedCreateInput,
): Promise<NoteWithLesson> {
    return prisma.note.create({
        data,
        include: {
            lesson: true,
        },
    });
}

export async function updateNote(
    id: string,
    data: Prisma.NoteUncheckedUpdateInput,
): Promise<NoteWithLesson> {
    return prisma.note.update({
        where: {
            id,
        },
        data,
        include: {
            lesson: true,
        },
    });
}

export async function deleteNote(id: string): Promise<NoteWithLesson> {
    return prisma.note.delete({
        where: {
            id,
        },
        include: {
            lesson: true,
        },
    });
}
