import type { Prisma } from "@prisma/client";
import {
    createNote as createNoteInRepository,
    deleteNote as deleteNoteInRepository,
    findNoteById as findNoteByIdInRepository,
    findNotesByLesson as findNotesByLessonInRepository,
    updateNote as updateNoteInRepository,
} from "@/repositories/note.repository";

export async function getNotesByLesson(userId: string, lessonId: string) {
    return findNotesByLessonInRepository(userId, lessonId);
}

export async function getNoteById(id: string, userId: string) {
    return findNoteByIdInRepository(id, userId);
}

export async function createNote(
    userId: string,
    lessonId: string,
    data: Omit<Prisma.NoteUncheckedCreateInput, "userId" | "lessonId">,
) {
    return createNoteInRepository({
        ...data,
        userId,
        lessonId,
    });
}

export async function updateNote(
    id: string,
    userId: string,
    data: Prisma.NoteUncheckedUpdateInput,
) {
    const existingNote = await findNoteByIdInRepository(id, userId);

    if (!existingNote) {
        throw new Error(`Note with id "${id}" was not found for the current user.`);
    }

    return updateNoteInRepository(id, data);
}

export async function deleteNote(id: string, userId: string) {
    const existingNote = await findNoteByIdInRepository(id, userId);

    if (!existingNote) {
        throw new Error(`Note with id "${id}" was not found for the current user.`);
    }

    return deleteNoteInRepository(id);
}
