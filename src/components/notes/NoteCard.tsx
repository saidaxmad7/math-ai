import type { NoteResponse } from '@/mappers/note.mapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type NoteCardProps = {
    note: NoteResponse;
    className?: string;
};

function formatUpdatedDate(date: Date | string | null | undefined) {
    if (!date) {
        return 'Sana mavjud emas';
    }

    const parsed = typeof date === 'object' && date instanceof Date ? date : new Date(date);
    if (isNaN(parsed.getTime())) {
        return 'Sana mavjud emas';
    }

    try {
        return new Intl.DateTimeFormat('uz-UZ', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(parsed);
    } catch {
        return 'Sana mavjud emas';
    }
}


export function NoteCard({ note, className }: NoteCardProps) {
    return (
        <Card className={cn('h-full', className)}>
            <CardHeader>
                <CardTitle>{note.title || 'Nomsiz eslatma'}</CardTitle>
                <p className='text-xs text-muted-foreground'>
                    Yangilangan: {formatUpdatedDate(note.updatedAt)}
                </p>
            </CardHeader>

            <CardContent>
                <p className='whitespace-pre-wrap text-sm leading-6 text-muted-foreground'>
                    {note.content}
                </p>
            </CardContent>
        </Card>
    );
}
