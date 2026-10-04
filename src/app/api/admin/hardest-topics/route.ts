import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { getAdminHardestTopics } from '@/services/admin.service';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Ushbu ma'lumot faqat administratorlar uchun.",
                403,
            );
        }

        const topics = await getAdminHardestTopics();

        return successResponse(
            topics,
            "Eng qiyin mavzular ro'yxati olindi.",
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Xatolik yuz berdi.',
        );
    }
}
