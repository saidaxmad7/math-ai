import { ZodError } from 'zod';

import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { toPracticeResponse } from '@/mappers/practice.mapper';
import { getPracticeLessons } from '@/services/practice.service';
import { practiceQuerySchema } from '@/validations/practice.validation';

export async function GET(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const searchParams = new URL(request.url).searchParams;
        const filters = practiceQuerySchema.parse(
            Object.fromEntries(searchParams.entries()),
        );
        const practice = await getPracticeLessons(session.user.id, filters);

        return successResponse(
            toPracticeResponse(practice),
            'Practice lessons fetched successfully.',
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return errorResponse(
                'Invalid practice filters.',
                400,
                error.flatten(),
            );
        }

        return errorResponse();
    }
}
