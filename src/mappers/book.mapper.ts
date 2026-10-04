export type BookResponse = {
    id: string;
    title: string;
    gradeId: string;
    gradeName: string;
    subjectId: string;
    subjectName: string;
    filePath: string;
    fileName: string;
    fileSize: number;
    totalPages: number | null;
    status: string;
    errorMessage: string | null;
    parsedAt: Date | null;
    topicsCount: number;
    createdAt: Date;
};

export type BookWithRelations = {
    id: string;
    title: string;
    gradeId: string;
    grade: {
        name: string;
    };
    subjectId: string;
    subject: {
        name: string;
    };
    filePath: string;
    fileName: string;
    fileSize: number;
    totalPages: number | null;
    status: string;
    errorMessage: string | null;
    parsedAt: Date | null;
    _count?: {
        topics: number;
    };
    createdAt: Date;
};

export function toBookResponse(book: BookWithRelations): BookResponse {
    return {
        id: book.id,
        title: book.title,
        gradeId: book.gradeId,
        gradeName: book.grade.name,
        subjectId: book.subjectId,
        subjectName: book.subject.name,
        filePath: book.filePath,
        fileName: book.fileName,
        fileSize: book.fileSize,
        totalPages: book.totalPages,
        status: book.status,
        errorMessage: book.errorMessage,
        parsedAt: book.parsedAt,
        topicsCount: book._count?.topics ?? 0,
        createdAt: book.createdAt,
    };
}
