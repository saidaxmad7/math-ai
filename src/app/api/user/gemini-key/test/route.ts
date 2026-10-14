import { z } from 'zod';
import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/api/response';

const testKeySchema = z.object({
    apiKey: z.string().trim().min(10, "API kaliti kamida 10 ta belgidan iborat bo'lishi kerak."),
});

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse('Avtorizatsiyadan o‘tilmagan.', 401);
        }

        const body = await request.json();
        const { apiKey } = testKeySchema.parse(body);

        // Ping Google Gemini endpoint with a tiny request
        const modelsToTry = ['gemini-2.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
        let lastError = '';
        let connected = false;
        let successfulModel = '';

        for (const model of modelsToTry) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: '1+1' }] }],
                    }),
                });

                if (res.ok) {
                    connected = true;
                    successfulModel = model;
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
                `Google Gemini bilan bog'lanib bo'lmadi. Xato: ${lastError}`,
                400,
            );
        }

        return successResponse(
            { valid: true, model: successfulModel },
            "API kalit muvaffaqiyatli tekshirildi va Google Gemini bilan aloqa o'rnatildi!",
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
