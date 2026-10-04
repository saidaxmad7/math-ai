'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateNote, useUpdateNote } from '@/hooks/use-notes';
import type { NoteResponse } from '@/mappers/note.mapper';
import {
    createNoteSchema,
    type CreateNoteSchema,
} from '@/validations/note.validation';
import { cn } from '@/lib/utils';

type NoteFormValues = CreateNoteSchema;

type NoteEditorProps = {
    lessonId: string;
    initialNote?: NoteResponse;
    className?: string;
    onSuccess?: (note: NoteResponse) => void;
};

function getDefaultValues(initialNote?: NoteResponse): NoteFormValues {
    return {
        title: initialNote?.title ?? '',
        content: initialNote?.content ?? '',
    };
}

export function NoteEditor({
    lessonId,
    initialNote,
    className,
    onSuccess,
}: NoteEditorProps) {
    const createNote = useCreateNote();
    const updateNote = useUpdateNote();
    const formId = useId();
    const titleId = `${formId}-title`;
    const contentId = `${formId}-content`;
    const isEditing = Boolean(initialNote);
    const isSaving = createNote.isPending || updateNote.isPending;

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<NoteFormValues>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: getDefaultValues(initialNote),
    });

    useEffect(() => {
        reset(getDefaultValues(initialNote));
        clearErrors();
    }, [clearErrors, initialNote, reset]);

    async function onSubmit(values: NoteFormValues) {
        clearErrors('root');

        try {
            const title = values.title?.trim() || undefined;

            const note =
                isEditing && initialNote
                    ? await updateNote.mutateAsync({
                          id: initialNote.id,
                          title,
                          content: values.content,
                      })
                    : await createNote.mutateAsync({
                          lessonId,
                          title,
                          content: values.content,
                      });

            if (!isEditing) {
                reset(getDefaultValues());
            }

            onSuccess?.(note);
        } catch (error) {
            setError('root', {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Eslatmani saqlashda xatolik yuz berdi.',
            });
        }
    }

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>
                    {isEditing ? 'Eslatmani tahrirlash' : 'Yangi eslatma'}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-2'>
                        <label
                            className='text-sm font-medium'
                            htmlFor={titleId}
                        >
                            Sarlavha
                        </label>
                        <Input
                            id={titleId}
                            placeholder='Eslatma sarlavhasi'
                            aria-invalid={Boolean(errors.title)}
                            {...register('title')}
                        />
                        {errors.title?.message && (
                            <p className='text-sm text-destructive'>
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <label
                            className='text-sm font-medium'
                            htmlFor={contentId}
                        >
                            Mazmuni
                        </label>
                        <Textarea
                            id={contentId}
                            rows={6}
                            placeholder='Eslatma mazmunini yozing...'
                            aria-invalid={Boolean(errors.content)}
                            {...register('content')}
                        />
                        {errors.content?.message && (
                            <p className='text-sm text-destructive'>
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    {errors.root?.message && (
                        <p className='text-sm text-destructive'>
                            {errors.root.message}
                        </p>
                    )}

                    <Button type='submit' disabled={isSaving}>
                        {isSaving
                            ? 'Saqlanmoqda...'
                            : isEditing
                              ? 'Saqlash'
                              : 'Eslatmani yaratish'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
