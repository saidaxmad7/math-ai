import { cookies } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/auth';
import { errorResponse, successResponse, validationErrorResponse } from '@/lib/api/response';
import { updateUserRoleInDb } from '@/repositories/admin.repository';

const verifyPinSchema = z.object({
    pin: z.string().min(1, "Maxfiy kodni kiriting."),
});

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan. Avval tizimga kiring.", 401);
        }

        const body = await request.json();
        const { pin } = verifyPinSchema.parse(body);

        const correctCode = (process.env.ADMIN_SECURITY_CODE || '7777').trim();

        if (pin.trim() !== correctCode) {
            return errorResponse("Noto'g'ri maxfiy kod! Qayta urinib ko'ring.", 401);
        }

        // If user is not yet an admin in database, grant ADMIN role upon correct secret code
        if (session.user.role !== 'ADMIN') {
            await updateUserRoleInDb(session.user.id, 'ADMIN');
        }

        const cookieStore = await cookies();
        cookieStore.set('admin_pin_verified', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return successResponse(
            { isUnlocked: true },
            "Xavfsizlik kodi to'g'ri. Admin panel ochildi.",
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return validationErrorResponse(error.flatten());
        }

        return errorResponse(
            error instanceof Error ? error.message : "Xatolik yuz berdi.",
        );
    }
}
