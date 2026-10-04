import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
} from '@/lib/api/response';
import { parseBookContent } from '@/services/book.service';

type RouteContext = {
    params: Promise<{
        bookId: string;
    }>;
};

export async function POST(request: Request, context: RouteContext) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Kitobni tahlil qilish faqat administratorlar uchun.",
                403,
            );
        }

        const { bookId } = await context.params;

        if (!bookId) {
            return errorResponse('Kitob ID si ko\'rsatilmadi.', 400);
        }

        const result = await parseBookContent(bookId);

        return successResponse(
            result,
            'Kitob Google Gemini orqali muvaffaqiyatli tahlil qilindi va bazaga saqlandi.',
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error
                ? error.message
                : 'Kitobni tahlil qilishda xatolik yuz berdi.',
            500,
        );
    }
}
