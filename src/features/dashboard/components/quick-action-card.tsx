import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type QuickActionCardProps = {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
};

export function QuickActionCard({
    title,
    description,
    href,
    icon: Icon,
}: QuickActionCardProps) {
    return (
        <Link href={href}>
            <Card className='h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
                <CardContent className='flex h-full flex-col justify-between p-6'>
                    <div>
                        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
                            <Icon className='h-6 w-6 text-primary' />
                        </div>

                        <h3 className='font-heading text-lg font-semibold'>
                            {title}
                        </h3>

                        <p className='mt-2 text-sm text-muted-foreground'>
                            {description}
                        </p>
                    </div>

                    <div className='mt-6 flex items-center gap-2 text-sm font-medium text-primary'>
                        <span>Open</span>
                        <ArrowRight className='h-4 w-4' />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
