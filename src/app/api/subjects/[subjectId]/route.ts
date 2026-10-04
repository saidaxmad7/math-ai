import { errorResponse, successResponse } from "@/lib/api/response";
import { toSubjectResponse } from "@/mappers/subject.mapper";
import { getSubjectById } from "@/services/subject.service";

type RouteContext = {
    params: Promise<{
        subjectId: string;
    }>;
};

export async function GET(_: Request, { params }: RouteContext) {
    try {
        const { subjectId } = await params;

        const subject = await getSubjectById(subjectId);

        if (!subject) {
            return errorResponse("Subject not found.", 404);
        }

        return successResponse(
            toSubjectResponse(subject),
            "Subject fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}
