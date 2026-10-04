import { ZodError } from 'zod';

import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from '@/lib/api/response';
import { getOrCreateDefaultUser } from '@/repositories/quiz.repository';
import { processAnswerSubmission } from '@/services/quiz.service';
import { submitAnswerSchema } from '@/validations/quiz.validation';

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userId = await getOrCreateDefaultUser(session?.user?.id);

        const body = await request.json();
        const validation = submitAnswerSchema.parse(body);

        const result = await processAnswerSubmission(userId, validation);

        return successResponse(result, 'Javob muvaffaqiyatli tekshirildi.');
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }
        return errorResponse(
            error instanceof Error ? error.message : 'Javobni tekshirishda xatolik.',
        );
    }
}
