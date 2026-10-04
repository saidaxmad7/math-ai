import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
};

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: StatCardProps) {
    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{title}</CardTitle>

                <Icon className='h-5 w-5 text-muted-foreground' />
            </CardHeader>

            <CardContent>
                <div className='text-3xl font-bold'>{value}</div>

                <p className='mt-2 text-sm text-muted-foreground'>
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
