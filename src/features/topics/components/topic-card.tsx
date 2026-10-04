import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
    classId: number;
    subjectId: string;
    id: string;
    title: string;
    description: string;
};

export function TopicCard({
    classId,
    subjectId,
    id,
    title,
    description,
}: Props) {
    return (
        <Link
            href={`/dashboard/classes/${classId}/subjects/${subjectId}/topics/${id}`}
        >
            <Card className='group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
                <CardContent className='flex h-full flex-col justify-between p-6'>
                    <div>
                        <h3 className='font-heading text-xl font-semibold'>
                            {title}
                        </h3>

                        <p className='mt-2 text-sm text-muted-foreground'>
                            {description}
                        </p>
                    </div>

                    <div className='mt-6 flex items-center gap-2 text-primary'>
                        <span className='text-sm font-medium'>Open Topic</span>

                        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
