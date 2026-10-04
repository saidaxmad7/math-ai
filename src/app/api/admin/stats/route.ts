import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';
import { getAdminDashboardStats } from '@/services/admin.service';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Ushbu statistika faqat administratorlar uchun.",
                403,
            );
        }

        const stats = await getAdminDashboardStats();

        return successResponse(
            stats,
            'Admin statistikasi muvaffaqiyatli olindi.',
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Xatolik yuz berdi.',
        );
    }
}
