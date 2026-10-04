import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from '@/lib/api/response';
import { getAdminUsersList } from '@/services/admin.service';
import { adminUsersQuerySchema } from '@/validations/admin.validation';
import { ZodError } from 'zod';

export async function GET(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Ushbu bo'lim faqat administratorlar uchun.",
                403,
            );
        }

        const { searchParams } = new URL(request.url);
        const query = adminUsersQuerySchema.parse({
            search: searchParams.get('search') || undefined,
            role: searchParams.get('role') || 'ALL',
            page: searchParams.get('page') || 1,
            limit: searchParams.get('limit') || 50,
        });

        const result = await getAdminUsersList(query);

        return successResponse(
            result,
            "Foydalanuvchilar ro'yxati muvaffaqiyatli olindi.",
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse(
            error instanceof Error ? error.message : 'Xatolik yuz berdi.',
        );
    }
}
