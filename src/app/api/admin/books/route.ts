import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { ZodError } from 'zod';

import { auth } from '@/auth';
import {
    errorResponse,
    successResponse,
    validationErrorResponse,
} from '@/lib/api/response';
import { getAllBooks, uploadAndRegisterBook } from '@/services/book.service';
import { uploadBookSchema } from '@/validations/book.validation';

export async function GET() {
    try {
        const books = await getAllBooks();
        return successResponse(books, 'Kitoblar ro\'yxati olindi.');
    } catch (error) {
        return errorResponse(
            error instanceof Error ? error.message : 'Xatolik yuz berdi.',
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Avtorizatsiyadan o'tilmagan.", 401);
        }

        if (session.user.role !== 'ADMIN') {
            return errorResponse(
                "Ruxsat berilmagan. Kitob yuklash faqat administratorlar uchun.",
                403,
            );
        }

        const formData = await request.formData();
        const gradeId = formData.get('gradeId') as string;

        const subjectId = formData.get('subjectId') as string;
        const title = formData.get('title') as string;
        const file = formData.get('file') as File | null;

        const validation = uploadBookSchema.parse({ gradeId, subjectId, title });

        let filePath = 'manual_or_standard';
        let fileName = 'standart_darslik.pdf';
        let fileSize = 1024 * 1024;

        if (file && typeof file.arrayBuffer === 'function') {
            fileName = file.name;
            fileSize = file.size;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'books');
            await mkdir(uploadDir, { recursive: true });

            const savedFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            filePath = `/uploads/books/${savedFileName}`;
            await writeFile(join(uploadDir, savedFileName), buffer);
        }

        const book = await uploadAndRegisterBook({
            ...validation,
            filePath,
            fileName,
            fileSize,
        });

        return successResponse(book, 'Kitob muvaffaqiyatli saqlandi.', 201);
    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.flatten());
        }
        return errorResponse(
            error instanceof Error ? error.message : 'Kitobni yuklashda xatolik.',
        );
    }
}
