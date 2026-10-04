import { ZodError, z } from "zod";

import { auth } from "@/auth";
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from "@/lib/api/response";
import { createNoteSchema } from "@/validations/note.validation";
import { mapNote, mapNotes } from "@/mappers/note.mapper";
import { createNote, getNotesByLesson } from "@/services/note.service";

const noteLessonSchema = z.object({
    lessonId: z.string().cuid("Invalid lesson id."),
});

export async function GET(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const { searchParams } = new URL(request.url);
        const { lessonId } = noteLessonSchema.parse({
            lessonId: searchParams.get("lessonId"),
        });

        const notes = await getNotesByLesson(session.user.id, lessonId);

        return successResponse(
            mapNotes(notes),
            "Notes fetched successfully.",
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const { searchParams } = new URL(request.url);
        const { lessonId } = noteLessonSchema.parse({
            lessonId: searchParams.get("lessonId"),
        });

        const body = createNoteSchema.parse(await request.json());

        const note = await createNote(session.user.id, lessonId, body);

        return successResponse(mapNote(note), "Note created successfully.", 201);
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}
