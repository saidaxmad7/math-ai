import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { errorResponse, successResponse } from '@/lib/api/response';

const registerSchema = z.object({
    name: z.string().trim().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak."),
    email: z.string().trim().email("Noto'g'ri email formati."),
    password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak."),
    role: z.enum(['USER', 'ADMIN']).default('USER'),
    teacherCode: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = registerSchema.parse(body);
        const email = data.email.toLowerCase();

        // Email mavjudligini tekshirish
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return errorResponse(
                "Ushbu email bilan allaqachon hisob ochilgan. Iltimos, 'Kirish' bo'limidan tizimga kiring.",
                400,
            );
        }

        // Agar O'qituvchi / Admin bo'lmoqchi bo'lsa, maxfiy kodni tekshirish
        let finalRole: 'USER' | 'ADMIN' = 'USER';
        if (data.role === 'ADMIN') {
            const expectedPin = (process.env.ADMIN_SECURITY_CODE || '7777').trim();
            if (!data.teacherCode || data.teacherCode.trim() !== expectedPin) {
                return errorResponse(
                    "O'qituvchi / Admin maxfiy tasdiqlash kodi noto'g'ri. Ruxsat berilmadi.",
                    403,
                );
            }
            finalRole = 'ADMIN';
        }

        // Parolni xavfsiz heshlash
        const hashedPassword = hashPassword(data.password);

        // Yangi foydalanuvchini yaratish
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email,
                password: hashedPassword,
                role: finalRole,
            },
        });

        return successResponse(
            {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            "Hisob muvaffaqiyatli yaratildi! Endi tizimga kirishingiz mumkin.",
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.issues[0]?.message || "Ma'lumotlar noto'g'ri.", 400);
        }
        return errorResponse(
            error instanceof Error ? error.message : "Serverda xatolik yuz berdi.",
            500,
        );
    }
}
