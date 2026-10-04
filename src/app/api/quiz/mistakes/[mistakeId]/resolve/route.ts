import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { getOrCreateDefaultUser } from '@/repositories/quiz.repository';
import { markMistakeResolved } from '@/services/quiz.service';

type RouteContext = {
    params: Promise<{
        mistakeId: string;
    }>;
};

export async function POST(request: Request, context: RouteContext) {
    try {
        const session = await auth();
        const userId = await getOrCreateDefaultUser(session?.user?.id);
        const { mistakeId } = await context.params;

        await markMistakeResolved(mistakeId, userId);

        return successResponse(
            { resolved: true },
            'Xatolik muvaffaqiyatli o\'zlashtirildi deb belgilandi.',
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Xatolikni belgilashda muammo.',
        );
    }
}
