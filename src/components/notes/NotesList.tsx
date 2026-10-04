'use client';

import { useNotes } from '@/hooks/use-notes';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { NoteCard } from './NoteCard';

type NotesListProps = {
    lessonId: string;
    className?: string;
};

function NotesListSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('grid gap-4 md:grid-cols-2', className)}>
            {Array.from({ length: 2 }, (_, index) => (
                <Card key={index}>
                    <CardContent className='space-y-3'>
                        <Skeleton className='h-5 w-2/3' />
                        <Skeleton className='h-3 w-1/3' />
                        <Skeleton className='h-20 w-full' />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function NotesList({ lessonId, className }: NotesListProps) {
    const { data: notes, isLoading } = useNotes(lessonId);

    if (isLoading) {
        return <NotesListSkeleton className={className} />;
    }

    if (!notes || notes.length === 0) {
        return (
            <Card className={cn(className)}>
                <CardContent className='py-8 text-center text-sm text-muted-foreground'>
                    Hozircha eslatmalar yo&apos;q
                </CardContent>
            </Card>
        );
    }

    return (
        <div className={cn('grid gap-4 md:grid-cols-2', className)}>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}
