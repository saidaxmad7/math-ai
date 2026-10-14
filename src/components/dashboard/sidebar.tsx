"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    BookOpen,
    Bookmark,
    Brain,
    ChartColumn,
    GraduationCap,
    Home,
    Library,
    MessageCircle,
    Settings,
    ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useLanguage } from "@/i18n/language-context";

export function Sidebar() {
    const pathname = usePathname();
    const { collapsed } = useSidebarStore();
    const { data: session } = useSession();
    const { translations } = useLanguage();

    const standardLinks = [
        {
            title: translations.navigation.dashboard,
            href: "/dashboard",
            icon: Home,
        },
        {
            title: translations.navigation.classes,
            href: "/dashboard/classes",
            icon: GraduationCap,
        },
        {
            title: translations.navigation.subjects,
            href: "/dashboard/subjects",
            icon: BookOpen,
        },
        {
            title: translations.navigation.bookmarks,
            href: "/dashboard/bookmarks",
            icon: Bookmark,
        },
        {
            title: translations.navigation.practice,
            href: "/dashboard/practice",
            icon: Brain,
        },
        {
            title: translations.navigation.aiAssistant,
            href: "/dashboard/ai",
            icon: MessageCircle,
        },
        {
            title: translations.navigation.statistics,
            href: "/dashboard/statistics",
            icon: ChartColumn,
        },
        {
            title: translations.navigation.settings,
            href: "/dashboard/settings",
            icon: Settings,
        },
    ];

    const adminOnlyLinks = [
        {
            title: translations.navigation.adminPanel,
            href: "/dashboard/admin",
            icon: ShieldCheck,
        },
        {
            title: translations.navigation.adminBooks,
            href: "/dashboard/admin/books",
            icon: Library,
        },
    ];

    const isAdmin = session?.user?.role === 'ADMIN';
    const allLinks = isAdmin
        ? [
              ...standardLinks.slice(0, 5),
              ...adminOnlyLinks,
              ...standardLinks.slice(5),
          ]
        : standardLinks;

    return (
        <aside
            className={cn(
                "sticky top-0 flex h-screen shrink-0 flex-col border-r bg-background transition-all duration-300",
                collapsed ? "w-24" : "w-72",
            )}
        >
            <div className='border-b px-6 py-6'>
                <Link href='/' className='flex items-center gap-3'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground'>
                        ∑
                    </div>

                    {!collapsed && (
                        <div>
                            <h2 className='font-heading text-xl font-bold'>
                                {translations.common.appName}
                            </h2>

                            <p className='text-sm text-muted-foreground'>
                                {translations.common.tagline}
                            </p>
                        </div>
                    )}
                </Link>
            </div>

            <nav className='flex-1 space-y-2 overflow-y-auto p-4'>
                {allLinks.map((link) => {
                    const Icon = link.icon;

                    const isActive =
                        link.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname === link.href ||
                              pathname.startsWith(`${link.href}/`);


                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                            )}
                        >
                            <Icon className='h-5 w-5 shrink-0' />

                            {!collapsed && <span>{link.title}</span>}
                        </Link>
                    );
                })}
            </nav>

            {!collapsed && (
                <div className='border-t p-6'>
                    <p className='text-xs text-muted-foreground'>
                        Math AI v1.0.0
                    </p>
                </div>
            )}
        </aside>
    );
}
