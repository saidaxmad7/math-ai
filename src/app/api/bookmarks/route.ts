import { ZodError, z } from "zod";

import { auth } from "@/auth";
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from "@/lib/api/response";
import { mapBookmarks } from "@/mappers/bookmark.mapper";
import { getBookmarksForUser, toggleBookmark } from "@/services/bookmark.service";

const bookmarkSchema = z.object({
    lessonId: z.string().cuid("Invalid lesson id."),
});

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const bookmarks = await getBookmarksForUser(session.user.id);

        return successResponse(
            mapBookmarks(bookmarks),
            "Bookmarks fetched successfully.",
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

        const body = bookmarkSchema.parse(await request.json());

        const result = await toggleBookmark(session.user.id, body.lessonId);

        return successResponse(result, "Bookmark toggled successfully.");
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}
