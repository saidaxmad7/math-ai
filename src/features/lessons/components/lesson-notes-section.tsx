'use client';

import { useState } from 'react';
import { PenLine, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { NotesList } from '@/components/notes/NotesList';
import { useLanguage } from '@/i18n/language-context';

type LessonNotesSectionProps = {
    lessonId: string;
};

export function LessonNotesSection({ lessonId }: LessonNotesSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { translations, language } = useLanguage();

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
                            {language === 'uz'
                                ? 'Mavzu bo‘yicha shaxsiy konspekt va eslatmalar'
                                : 'Personal Study Notes & Key Formulas'}
                        </h3>
                        <p className='text-xs text-muted-foreground'>
                            {language === 'uz'
                                ? 'O‘zingiz uchun muhim qoidalar yoki eslab qolish lozim bo‘lgan formulalarni yozib qo‘ying'
                                : 'Jot down important rules, formulas, or reminders for quick reference'}
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
                    <span>
                        {isOpen
                            ? translations.common.close
                            : translations.lesson.addNote}
                    </span>
                    {isOpen ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
                </Button>
            </div>

            {isOpen && (
                <div className='border-t bg-muted/10 p-5 space-y-6 animate-in fade-in-50 duration-200'>
                    <div>
                        <h4 className='text-sm font-semibold text-foreground mb-3'>
                            {language === 'uz' ? 'Yangi eslatma qo‘shish:' : 'Add new note:'}
                        </h4>
                        <NoteEditor lessonId={lessonId} />
                    </div>

                    <div className='pt-2'>
                        <h4 className='text-sm font-semibold text-foreground mb-3'>
                            {language === 'uz' ? 'Saqlangan eslatmalaringiz:' : 'Your saved notes:'}
                        </h4>
                        <NotesList lessonId={lessonId} />
                    </div>
                </div>
            )}
        </section>
    );
}
