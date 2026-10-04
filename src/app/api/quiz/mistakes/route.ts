import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { getOrCreateDefaultUser } from '@/repositories/quiz.repository';
import { getTopicMistakesWithRemedial } from '@/services/quiz.service';

export async function GET(request: Request) {
    try {
        const session = await auth();
        const userId = await getOrCreateDefaultUser(session?.user?.id);

        const { searchParams } = new URL(request.url);
        const topicId = searchParams.get('topicId') || undefined;

        const mistakes = await getTopicMistakesWithRemedial(userId, topicId);

        return successResponse(
            mistakes,
            'Xatolar ustida ishlash ma\'lumotlari olindi.',
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Xatoliklarni olishda muammo.',
        );
    }
}
