import { errorResponse, successResponse } from "@/lib/api/response";
import { toTopicResponse } from "@/mappers/topic.mapper";
import { getTopicById } from "@/services/topic.service";

type RouteContext = {
    params: Promise<{
        topicId: string;
    }>;
};

export async function GET(_: Request, { params }: RouteContext) {
    try {
        const { topicId } = await params;

        const topic = await getTopicById(topicId);

        if (!topic) {
            return errorResponse("Topic not found.", 404);
        }

        return successResponse(
            toTopicResponse(topic),
            "Topic fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}
