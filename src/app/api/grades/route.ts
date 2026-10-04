import { toGradesResponse } from "@/mappers/grade.mapper";
import { successResponse, errorResponse } from "@/lib/api/response";
import { getGrades } from "@/services/grade.service";

export async function GET() {
    try {
        const grades = await getGrades();

        return successResponse(
            toGradesResponse(grades),
            "Grades fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}
