import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { toStatisticsResponse } from '@/mappers/statistics.mapper';
import { getStatistics } from '@/services/statistics.service';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Unauthorized.', 401);
        }

        const statistics = await getStatistics(session.user.id);

        return successResponse(
            toStatisticsResponse(statistics),
            'Statistics fetched successfully.',
        );
    } catch {
        return errorResponse();
    }
}
