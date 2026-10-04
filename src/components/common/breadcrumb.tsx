import Link from "next/link";

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
            {items.map((item, index) => (
                <div key={item.label} className='flex items-center gap-2'>
                    {item.href ? (
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

                    {index !== items.length - 1 && <span>/</span>}
                </div>
            ))}
        </nav>
    );
}
