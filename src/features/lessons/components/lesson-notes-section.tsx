'use client';

import { useState } from 'react';
import { PenLine, ChevronDown, ChevronUp, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { NotesList } from '@/components/notes/NotesList';

type LessonNotesSectionProps = {
    lessonId: string;
};

export function LessonNotesSection({ lessonId }: LessonNotesSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='overflow-hidden rounded-2xl border bg-card shadow-xs transition-all'>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='flex cursor-pointer items-center justify-between p-5 hover:bg-muted/30 transition-colors'
            >
                <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                        <PenLine className='h-4 w-4' />
                    </div>
                    <div>
                        <h3 className='font-heading text-lg font-semibold text-foreground'>
                            Mavzu bo‘yicha shaxsiy konspekt va eslatmalar
                        </h3>
                        <p className='text-xs text-muted-foreground'>
                            O‘zingiz uchun muhim qoidalar yoki eslab qolish lozim bo‘lgan formulalarni yozib qo‘ying
                        </p>
                    </div>
                </div>

                <Button
                    variant='ghost'
                    size='sm'
                    className='gap-1 text-xs font-medium'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                >
                    <span>{isOpen ? 'Yopish' : 'Konspekt yozish'}</span>
                    {isOpen ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
                </Button>
            </div>

            {isOpen && (
                <div className='border-t bg-muted/10 p-5 space-y-6 animate-in fade-in-50 duration-200'>
                    <div>
                        <h4 className='text-sm font-semibold text-foreground mb-3'>
                            Yangi eslatma qo‘shish:
                        </h4>
                        <NoteEditor lessonId={lessonId} />
                    </div>

                    <div className='pt-2'>
                        <h4 className='text-sm font-semibold text-foreground mb-3'>
                            Saqlangan eslatmalaringiz:
                        </h4>
                        <NotesList lessonId={lessonId} />
                    </div>
                </div>
            )}
        </section>
    );
}
