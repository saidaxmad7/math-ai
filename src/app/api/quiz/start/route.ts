import { ZodError } from 'zod';

import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from '@/lib/api/response';
import { getOrCreateDefaultUser } from '@/repositories/quiz.repository';
import { startOrResumeQuiz } from '@/services/quiz.service';
import { startQuizSchema } from '@/validations/quiz.validation';

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userId = await getOrCreateDefaultUser(session?.user?.id);

        const body = await request.json();
        const { topicId } = startQuizSchema.parse(body);

        const quizSession = await startOrResumeQuiz(userId, topicId);

        return successResponse(
            quizSession,
            'Test sessiyasi muvaffaqiyatli boshlandi.',
            201,
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }
        return errorResponse(
            error instanceof Error ? error.message : 'Testni boshlashda xatolik.',
        );
    }
}
