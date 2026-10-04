import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LessonCardProps = {
    title: string;
    description: string | null;
    slug: string;
};

export function LessonCard({ title, description, slug }: LessonCardProps) {
    return (
        <Link href={`/dashboard/lessons/${slug}`}>
            <Card className='transition-all hover:border-primary hover:shadow-md'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent>
                    {description && (
                        <p className='text-sm text-muted-foreground'>
                            {description}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
