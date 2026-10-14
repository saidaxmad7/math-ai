"use client";

import { useEffect } from "react";
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
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useLanguage } from "@/i18n/language-context";
import { Button } from "@/components/ui/button";

export function Sidebar() {
    const pathname = usePathname();
    const { collapsed, mobileOpen, closeMobile } = useSidebarStore();
    const { data: session } = useSession();
    const { translations } = useLanguage();

    // Auto-close mobile drawer on route change
    useEffect(() => {
        closeMobile();
    }, [pathname, closeMobile]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && mobileOpen) {
                closeMobile();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen, closeMobile]);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileOpen]);

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

    const isAdmin = session?.user?.role === "ADMIN";
    const allLinks = isAdmin
        ? [
              ...standardLinks.slice(0, 5),
              ...adminOnlyLinks,
              ...standardLinks.slice(5),
          ]
        : standardLinks;

    const renderNavContent = (isMobile: boolean = false) => (
        <>
            <div className="flex items-center justify-between border-b px-5 py-5 sm:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => isMobile && closeMobile()}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-xs">
                        ∑
                    </div>

                    {(!collapsed || isMobile) && (
                        <div>
                            <h2 className="font-heading text-lg font-bold leading-tight">
                                {translations.common.appName}
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                {translations.common.tagline}
                            </p>
                        </div>
                    )}
                </Link>

                {isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={closeMobile}
                        aria-label="Menyuni yopish"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto p-3 sm:p-4">
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
                            onClick={() => isMobile && closeMobile()}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-xs"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                        >
                            <Icon className="h-4.5 w-4.5 shrink-0" />
                            {(!collapsed || isMobile) && <span>{link.title}</span>}
                        </Link>
                    );
                })}
            </nav>

            {(!collapsed || isMobile) && (
                <div className="border-t p-4 sm:p-5">
                    <p className="text-[11px] text-muted-foreground">
                        Math AI • 2026
                    </p>
                </div>
            )}
        </>
    );

    return (
        <>
            {/* Desktop & Tablet Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex sticky top-0 h-screen shrink-0 flex-col border-r bg-card/60 backdrop-blur-md transition-all duration-300",
                    collapsed ? "w-20" : "w-64 lg:w-72",
                )}
            >
                {renderNavContent(false)}
            </aside>

            {/* Mobile Drawer (Slide-over overlay) */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
                        onClick={closeMobile}
                    />

                    {/* Drawer */}
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r bg-background shadow-2xl animate-in slide-in-from-left duration-200">
                        {renderNavContent(true)}
                    </aside>
                </div>
            )}
        </>
    );
}
