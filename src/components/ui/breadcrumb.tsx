import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={`${item.label}-${index}`} className='flex items-center gap-2'>
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className='transition-colors hover:text-foreground'
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className='font-medium text-foreground'>
                                {item.label}
                            </span>
                        )}

                        {!isLast && <ChevronRight className='h-4 w-4' />}
                    </div>
                );
            })}
        </nav>
    );
}
