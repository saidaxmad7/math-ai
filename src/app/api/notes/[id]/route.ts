import { ZodError } from "zod";

import { auth } from "@/auth";
import { errorResponse, successResponse, validationErrorResponse } from "@/lib/api/response";
import { mapNote } from "@/mappers/note.mapper";
import {
    deleteNote,
    getNoteById,
    updateNote,
} from "@/services/note.service";
import { updateNoteSchema } from "@/validations/note.validation";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_: Request, { params }: RouteContext) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const { id } = await params;
        const note = await getNoteById(id, session.user.id);

        if (!note) {
            return errorResponse("Note not found.", 404);
        }

        return successResponse(mapNote(note), "Note fetched successfully.");
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const { id } = await params;
        const body = updateNoteSchema.parse(await request.json());

        const note = await updateNote(id, session.user.id, body);

        return successResponse(mapNote(note), "Note updated successfully.");
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        if (error instanceof Error && error.message.includes("not found")) {
            return errorResponse(error.message, 404);
        }

        return errorResponse();
    }
}

export async function DELETE(_: Request, { params }: RouteContext) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const { id } = await params;
        const note = await deleteNote(id, session.user.id);

        return successResponse(mapNote(note), "Note deleted successfully.");
    } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
            return errorResponse(error.message, 404);
        }

        return errorResponse();
    }
}
