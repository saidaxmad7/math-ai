import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";

type TopicCardProps = {
    gradeId: string;
    subjectId: string;
    id: string;
    title: string;
    description: string | null;
    lessonSlug?: string | null;
    order?: number;
};

export function TopicCard({
    gradeId,
    subjectId,
    id,
    title,
    description,
    lessonSlug,
    order,
}: TopicCardProps) {
    const destination = lessonSlug
        ? `/dashboard/lessons/${lessonSlug}`
        : `/dashboard/grades/${gradeId}/subjects/${subjectId}/topics/${id}`;

    return (
        <Link
            href={destination}
            className='group flex flex-col justify-between rounded-xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md'
        >
            <div>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-2.5'>
                        {typeof order === 'number' && (
                            <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary'>
                                {order}
                            </span>
                        )}
                        <h2 className='text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary'>
                            {title}
                        </h2>
                    </div>

                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground'>
                        <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                    </div>
                </div>

                {description && (
                    <p className='mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2'>
                        {description}
                    </p>
                )}
            </div>

            <div className='mt-4 flex items-center gap-2 pt-3 border-t text-xs font-medium text-primary'>
                <BookOpen className='h-3.5 w-3.5' />
                <span>Darsni o‘rganish</span>
            </div>
        </Link>
    );
}
