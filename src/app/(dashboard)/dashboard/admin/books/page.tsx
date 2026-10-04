'use client';

import { useState } from 'react';
import {
    AlertCircle,
    BookCheck,
    BookOpen,
    CheckCircle2,
    FileUp,
    GraduationCap,
    Loader2,
    Play,
    Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { AccessDenied } from '@/features/admin/components/access-denied';
import { AdminPinGate } from '@/features/admin/components/admin-pin-gate';
import { useBooks, useParseBook, useUploadBook } from '@/hooks/use-books';


// The 6 standard required curriculum books
const STANDARD_BOOKS = [
    { grade: '9-sinf', subject: 'Algebra', title: '9-sinf Algebra darsligi' },
    { grade: '9-sinf', subject: 'Geometriya', title: '9-sinf Geometriya darsligi' },
    { grade: '10-sinf', subject: 'Algebra', title: '10-sinf Matematika (Algebra) darsligi' },
    { grade: '10-sinf', subject: 'Geometriya', title: '10-sinf Geometriya darsligi' },
    { grade: '11-sinf', subject: '1-qism', title: '11-sinf Matematika (1-qism)' },
    { grade: '11-sinf', subject: '2-qism', title: '11-sinf Matematika (2-qism)' },
];

export default function AdminBooksPage() {
    const { data: session, status } = useSession();
    const { data: books = [], isLoading, isError } = useBooks();
    const uploadBook = useUploadBook();
    const parseBook = useParseBook();

    const [selectedBookForUpload, setSelectedBookForUpload] = useState<{
        grade: string;
        subject: string;
        title: string;
    } | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    if (status === 'loading') {
        return (
            <div className='flex h-64 items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
        );
    }

    if (!session?.user || session.user.role !== 'ADMIN') {
        return <AccessDenied />;
    }


    function handleUploadAndRegister(
        gradeName: string,
        subjectName: string,
        title: string,
    ) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('gradeId', gradeName);
        formData.append('subjectId', subjectName);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        uploadBook.mutate(formData, {
            onSuccess: () => {
                setStatusMessage(`"${title}" muvaffaqiyatli saqlandi!`);
                setSelectedBookForUpload(null);
                setSelectedFile(null);
            },
        });
    }

    function handleTriggerParse(bookId: string, title: string) {
        setStatusMessage(`"${title}" Google Gemini orqali tahlil qilinmoqda...`);
        parseBook.mutate(bookId, {
            onSuccess: () => {
                setStatusMessage(
                    `"${title}" tahlili yakunlandi! Barcha mavzular, formulalar va testlar bazaga saqlandi.`,
                );
            },
            onError: (err) => {
                setStatusMessage(`Xatolik: ${err.message}`);
            },
        });
    }

    return (
        <AdminPinGate>
            <div className='space-y-8'>
            <div>
                <div className='flex items-center gap-2 text-primary'>
                    <GraduationCap className='h-6 w-6' />
                    <span className='text-sm font-semibold uppercase tracking-wider'>
                        Admin Boshqaruvi
                    </span>
                </div>
                <h1 className='font-heading mt-1 text-3xl font-bold'>
                    Matematika darsliklari (6 ta kitob)
                </h1>
                <p className='mt-2 text-muted-foreground'>
                    9–11 sinf matematika va geometriya darsliklarini yuklang. AI darslikni bir marta tahlil qilib, barcha mavzular, qoidalar, namunaviy misollar va test savollarini avtomatik ajratib oladi.
                </p>
            </div>

            {statusMessage && (
                <div className='flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm font-medium'>
                    <Sparkles className='h-5 w-5 text-primary shrink-0' />
                    <p>{statusMessage}</p>
                </div>
            )}

            {/* List of 6 Books */}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {STANDARD_BOOKS.map((std, idx) => {
                    const existingBook = books.find(
                        (b) =>
                            b.gradeName.toLowerCase() === std.grade.toLowerCase() &&
                            b.subjectName.toLowerCase() === std.subject.toLowerCase(),
                    );

                    const isParsingThis =
                        parseBook.isPending &&
                        existingBook &&
                        parseBook.variables === existingBook.id;

                    return (
                        <Card
                            key={idx}
                            className={`flex flex-col justify-between transition-all hover:shadow-md ${
                                existingBook?.status === 'COMPLETED'
                                    ? 'border-emerald-500/40 bg-emerald-50/5 dark:bg-emerald-950/10'
                                    : 'border-border'
                            }`}
                        >
                            <CardHeader>
                                <div className='flex items-start justify-between gap-2'>
                                    <Badge variant='outline'>
                                        {std.grade} · {std.subject}
                                    </Badge>
                                    {existingBook?.status === 'COMPLETED' && (
                                        <Badge variant='secondary' className='border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'>
                                            <CheckCircle2 className='mr-1 h-3 w-3 text-emerald-500' />
                                            Tahlil qilingan
                                        </Badge>
                                    )}
                                    {existingBook?.status === 'PARSING' && (
                                        <Badge variant='secondary' className='animate-pulse bg-amber-50 text-amber-700 dark:bg-amber-950/40'>
                                            <Loader2 className='mr-1 h-3 w-3 animate-spin' />
                                            Tahlil jarayonida
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className='mt-2 text-lg font-bold'>
                                    {std.title}
                                </CardTitle>
                                <CardDescription>
                                    {existingBook
                                        ? `Fayl: ${existingBook.fileName} (${(existingBook.fileSize / 1024).toFixed(0)} KB)`
                                        : 'Kitob hali yuklanmagan'}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className='space-y-4 pt-2'>
                                {existingBook?.status === 'COMPLETED' ? (
                                    <div className='rounded-lg bg-muted/40 p-3 text-xs space-y-1'>
                                        <p className='font-semibold text-emerald-600 dark:text-emerald-400'>
                                            ✓ {existingBook.topicsCount} ta mavzu to&apos;liq ajratilgan
                                        </p>
                                        <p className='text-muted-foreground'>
                                            Qoidalar, namunaviy misollar va testlar bazada tayyor.
                                        </p>
                                    </div>
                                ) : (
                                    <div className='rounded-lg border border-dashed p-3 text-xs text-muted-foreground'>
                                        PDF faylni yuklang va Google Gemini orqali tahlil qilishni ishga tushiring.
                                    </div>
                                )}

                                <div className='flex flex-wrap items-center gap-2 pt-2'>
                                    {!existingBook ? (
                                        <Button
                                            size='sm'
                                            variant='outline'
                                            onClick={() =>
                                                setSelectedBookForUpload({
                                                    grade: std.grade,
                                                    subject: std.subject,
                                                    title: std.title,
                                                })
                                            }
                                            className='gap-1.5 w-full'
                                        >
                                            <FileUp className='h-4 w-4' />
                                            Kitobni yuklash (PDF)
                                        </Button>
                                    ) : (
                                        <Button
                                            size='sm'
                                            onClick={() =>
                                                handleTriggerParse(
                                                    existingBook.id,
                                                    existingBook.title,
                                                )
                                            }
                                            disabled={isParsingThis}
                                            className='gap-1.5 w-full bg-primary text-primary-foreground'
                                        >
                                            {isParsingThis ? (
                                                <>
                                                    <Loader2 className='h-4 w-4 animate-spin' />
                                                    Gemini tahlil qilmoqda...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className='h-4 w-4' />
                                                    {existingBook.status === 'COMPLETED'
                                                        ? 'Qayta tahlil qilish'
                                                        : 'AI orqali tahlil qilish'}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Upload Modal / Panel */}
            {selectedBookForUpload && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                    <Card className='w-full max-w-md shadow-2xl'>
                        <CardHeader>
                            <CardTitle className='text-lg font-bold'>
                                {selectedBookForUpload.title}
                            </CardTitle>
                            <CardDescription>
                                Darslikning PDF faylini tanlang
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div>
                                <label className='text-xs font-semibold uppercase text-muted-foreground'>
                                    PDF Fayl
                                </label>
                                <Input
                                    type='file'
                                    accept='.pdf'
                                    onChange={(e) =>
                                        setSelectedFile(e.target.files?.[0] || null)
                                    }
                                    className='mt-1'
                                />
                            </div>

                            <div className='flex justify-end gap-2 pt-4'>
                                <Button
                                    variant='outline'
                                    onClick={() => setSelectedBookForUpload(null)}
                                >
                                    Bekor qilish
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleUploadAndRegister(
                                            selectedBookForUpload.grade,
                                            selectedBookForUpload.subject,
                                            selectedBookForUpload.title,
                                        )
                                    }
                                    disabled={uploadBook.isPending}
                                    className='gap-2'
                                >
                                    {uploadBook.isPending && (
                                        <Loader2 className='h-4 w-4 animate-spin' />
                                    )}
                                    Saqlash
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            </div>
        </AdminPinGate>
    );
}
