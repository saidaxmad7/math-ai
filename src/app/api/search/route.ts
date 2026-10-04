import { errorResponse, successResponse } from "@/lib/api/response";
import { toSearchResponse } from "@/mappers/search.mapper";
import { search } from "@/services/search.service";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q") ?? "";

        if (!query.trim()) {
            return successResponse(
                { topics: [], lessons: [] },
                "Search completed successfully.",
            );
        }

        const results = await search(query);

        return successResponse(
            toSearchResponse(results),
            "Search completed successfully.",
        );
    } catch {
        return errorResponse();
    }
}
