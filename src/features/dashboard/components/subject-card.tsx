import Link from "next/link";
import { ChevronRight } from "lucide-react";

type SubjectCardProps = {
    gradeId: string;
    id: string;
    name: string;
    color: string;
};

export function SubjectCard({ gradeId, id, name, color }: SubjectCardProps) {
    return (
        <Link
            href={`/dashboard/grades/${gradeId}/subjects/${id}`}
            className='group rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg'
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div
                        className='h-4 w-4 rounded-full'
                        style={{ backgroundColor: color }}
                    />

                    <h2 className='text-2xl font-semibold'>{name}</h2>
                </div>

                <ChevronRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
            </div>

            <p className='mt-2 text-sm text-muted-foreground'>Open subject</p>
        </Link>
    );
}
