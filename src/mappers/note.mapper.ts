export type NoteResponse = {
    id: string;
    title: string | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    lesson: {
        id: string;
        title: string;
        slug: string;
        order: number;
    };
};

type NoteWithLesson = {
    id: string;
    title: string | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    lesson: {
        id: string;
        title: string;
        slug: string;
        order: number;
    };
};

export function mapNote(note: NoteWithLesson): NoteResponse {
    return {
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        lesson: {
            id: note.lesson.id,
            title: note.lesson.title,
            slug: note.lesson.slug,
            order: note.lesson.order,
        },
    };
}

export function mapNotes(notes: NoteWithLesson[]): NoteResponse[] {
    return notes.map(mapNote);
}
