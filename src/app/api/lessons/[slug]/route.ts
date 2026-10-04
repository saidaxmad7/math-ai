import { errorResponse, successResponse } from "@/lib/api/response";
import { toLessonResponse } from "@/mappers/lesson.mapper";
import { getLessonBySlug } from "@/services/lesson.service";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(_: Request, { params }: RouteContext) {
    try {
        const { slug } = await params;

        const lesson = await getLessonBySlug(slug);

        if (!lesson) {
            return errorResponse("Lesson not found.", 404);
        }

        return successResponse(
            toLessonResponse(lesson),
            "Lesson fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}
