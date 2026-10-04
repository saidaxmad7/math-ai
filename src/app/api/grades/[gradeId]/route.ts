import { ZodError } from "zod";

import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from "@/lib/api/response";
import { gradeIdSchema } from "@/lib/validations/grade.validation";
import { toGradeResponse } from "@/mappers/grade.mapper";
import { getGradeById } from "@/services/grade.service";

type RouteContext = {
    params: Promise<{
        gradeId: string;
    }>;
};

export async function GET(_: Request, { params }: RouteContext) {
    try {
        const validatedParams = gradeIdSchema.parse(await params);

        const grade = await getGradeById(validatedParams.gradeId);

        if (!grade) {
            return errorResponse("Grade not found.", 404);
        }

        return successResponse(
            toGradeResponse(grade),
            "Grade fetched successfully.",
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse();
    }
}
