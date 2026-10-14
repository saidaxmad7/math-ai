import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api/response';

const saveKeySchema = z.object({
    apiKey: z.string().trim().min(10, "API kaliti kamida 10 ta belgidan iborat bo'lishi kerak."),
});

// GET: Holatni olish (foydalanuvchi shaxsiy kalit ulaganmi yoki yo'q)
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Avtorizatsiyadan o‘tilmagan.', 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { geminiApiKey: true },
        });

        const key = user?.geminiApiKey;
        const hasCustomKey = Boolean(key && key.trim().length > 0);
        const maskedKey = hasCustomKey && key
            ? `${key.slice(0, 6)}••••••••${key.slice(-4)}`
            : null;

        return successResponse({
            hasCustomKey,
            maskedKey,
        });
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Serverda xatolik yuz berdi.',
            500,
        );
    }
}

// POST: Kalitni tekshirib saqlash
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Avtorizatsiyadan o‘tilmagan.', 401);
        }

        const body = await request.json();
        const { apiKey } = saveKeySchema.parse(body);

        // Ping Gemini to verify key
        const modelsToTry = ['gemini-2.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
        let connected = false;
        let lastError = '';

        for (const model of modelsToTry) {
            try {
                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ role: 'user', parts: [{ text: 'test' }] }],
                        }),
                    },
                );

                if (res.ok) {
                    connected = true;
                    break;
                } else {
                    const data = await res.json().catch(() => null);
                    lastError = data?.error?.message || `Status: ${res.status}`;
                }
            } catch (err) {
                lastError = err instanceof Error ? err.message : String(err);
            }
        }

        if (!connected) {
            return errorResponse(
                `Google Gemini kaliti qabul qilinmadi: ${lastError}`,
                400,
            );
        }

        // Kalitni ma'lumotlar bazasida saqlash
        await prisma.user.update({
            where: { id: session.user.id },
            data: { geminiApiKey: apiKey.trim() },
        });

        const maskedKey = `${apiKey.slice(0, 6)}••••••••${apiKey.slice(-4)}`;

        return successResponse(
            { hasCustomKey: true, maskedKey },
            'Shaxsiy Gemini API kaliti muvaffaqiyatli saqlandi!',
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.issues[0]?.message || 'Noto‘g‘ri ma’lumot.', 400);
        }
        return errorResponse(
            error instanceof Error ? error.message : 'Serverda xatolik yuz berdi.',
            500,
        );
    }
}

// DELETE: Shaxsiy kalitni o'chirish (standart tizim kalitiga qaytish)
export async function DELETE() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Avtorizatsiyadan o‘tilmagan.', 401);
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: { geminiApiKey: null },
        });

        return successResponse(
            { hasCustomKey: false, maskedKey: null },
            'Shaxsiy kalit o‘chirildi. Tizim standart kalitiga qaytildi.',
        );
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Serverda xatolik yuz berdi.',
            500,
        );
    }
}
