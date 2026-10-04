import Link from "next/link";
import { ChevronRight } from "lucide-react";

type GradeCardProps = {
    id: string;
    name: string;
    subjectCount: number;
};

export function GradeCard({ id, name, subjectCount }: GradeCardProps) {
    return (
        <Link
            href={`/dashboard/grades/${id}`}
            className='group rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg'
        >
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-semibold'>{name}</h3>

                <ChevronRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
            </div>

            <p className='mt-3 text-sm text-muted-foreground'>
                {subjectCount} subjects
            </p>
        </Link>
    );
}
