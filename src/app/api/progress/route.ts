import { ZodError } from "zod";

import { auth } from "@/auth";
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from "@/lib/api/response";
import { completeLessonSchema } from "@/lib/validations/progress.validation";
import {
    toProgressResponse,
    toProgressesResponse,
} from "@/mappers/progress.mapper";
import { completeLesson, getProgress } from "@/services/progress.service";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const progresses = await getProgress(session.user.id);

        return successResponse(
            toProgressesResponse(progresses),
            "Progress fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const body = completeLessonSchema.parse(await request.json());

        const progress = await completeLesson(session.user.id, body.lessonId);

        return successResponse(
            toProgressResponse(progress),
            "Lesson completed successfully.",
            201,
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}
