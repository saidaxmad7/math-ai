import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from '@/lib/api/response';
import { changeUserRole } from '@/services/admin.service';
import { updateUserRoleSchema } from '@/validations/admin.validation';
import { ZodError } from 'zod';

type RouteContext = {
    params: Promise<{
        userId: string;
    }>;
};

export async function PATCH(request: Request, context: RouteContext) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Rolni o'zgartirish faqat administratorlar uchun.",
                403,
            );
        }

        const { userId } = await context.params;
        const body = await request.json();
        const { role } = updateUserRoleSchema.parse(body);

        const updatedUser = await changeUserRole(
            userId,
            role,
            session.user.id,
        );

        return successResponse(
            updatedUser,
            `Foydalanuvchi roli muvaffaqiyatli ${role} qilib o'zgartirildi.`,
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse(
            error instanceof Error ? error.message : 'Xatolik yuz berdi.',
            400,
        );
    }
}
