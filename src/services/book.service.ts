import { BookStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { toBookResponse, type BookResponse } from '@/mappers/book.mapper';
import {
    findAllBooks,
    findBookById,
    saveParsedBookData,
    updateBookStatus,
    upsertBookRecord,
} from '@/repositories/book.repository';
import { parseBookWithAI } from '@/services/gemini-parser.service';
import type { UploadBookInput } from '@/validations/book.validation';

export async function getAllBooks(): Promise<BookResponse[]> {
    const books = await findAllBooks();
    return books.map(toBookResponse);
}

export async function getBookById(id: string) {
    const book = await findBookById(id);
    if (!book) {
        throw new Error('Kitob topilmadi.');
    }
    return book;
}

export async function uploadAndRegisterBook(
    input: UploadBookInput & {
        filePath: string;
        fileName: string;
        fileSize: number;
        totalPages?: number;
    },
) {
    // Resolve Grade by ID or Name
    let grade = await prisma.grade.findFirst({
        where: {
            OR: [
                { id: input.gradeId },
                { name: input.gradeId },
            ],
        },
    });

    if (!grade) {
        const orderMatch = input.gradeId.match(/\d+/);
        const order = orderMatch ? parseInt(orderMatch[0], 10) : 9;
        grade = await prisma.grade.create({
            data: {
                name: input.gradeId,
                order,
            },
        });
    }

    // Resolve Subject by ID or Name under this Grade
    let subject = await prisma.subject.findFirst({
        where: {
            gradeId: grade.id,
            OR: [
                { id: input.subjectId },
                { name: input.subjectId },
            ],
        },
    });

    if (!subject) {
        const isGeometry = input.subjectId.toLowerCase().includes('geom');
        const color = input.subjectId === '1-qism'
            ? '#3b82f6'
            : input.subjectId === '2-qism'
            ? '#8b5cf6'
            : isGeometry
            ? '#22c55e'
            : '#3b82f6';

        subject = await prisma.subject.create({
            data: {
                name: input.subjectId,
                gradeId: grade.id,
                icon: isGeometry ? 'Triangle' : 'BookOpen',
                color,
            },
        });
    }

    const book = await upsertBookRecord({
        gradeId: grade.id,
        subjectId: subject.id,
        title: input.title,
        filePath: input.filePath,
        fileName: input.fileName,
        fileSize: input.fileSize,
        totalPages: input.totalPages,
    });

    return toBookResponse(book);
}

export async function parseBookContent(bookId: string) {
    const book = await findBookById(bookId);
    if (!book) {
        throw new Error('Kitob topilmadi.');
    }

    // Set status to PARSING
    await updateBookStatus(bookId, BookStatus.PARSING);

    try {
        const parsedTopics = await parseBookWithAI({
            gradeName: book.grade.name,
            subjectName: book.subject.name,
            bookTitle: book.title,
        });

        const gradeOrderMatch = book.grade.name.match(/\d+/);
        const gradeOrder = gradeOrderMatch ? parseInt(gradeOrderMatch[0], 10) : 9;

        const updatedBook = await saveParsedBookData(
            book.id,
            book.subjectId,
            gradeOrder,
            parsedTopics,
        );

        return updatedBook;
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Tahlil jarayonida xatolik yuz berdi.';
        await updateBookStatus(bookId, BookStatus.FAILED, message);
        throw error;
    }
}
