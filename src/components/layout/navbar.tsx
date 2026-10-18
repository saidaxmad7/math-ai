"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Settings,
    UserCircle2,
    Menu,
    X,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-context";
import { LanguageSwitcher } from "@/components/common/language-switcher";

function getUserInitials(name?: string | null, email?: string | null): string {
    if (name) {
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    }

    if (email) {
        return email[0].toUpperCase();
    }

    return "U";
}

export function Navbar() {
    const { translations } = useLanguage();
    const { data: session, status } = useSession();
    const user = session?.user;
    const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
    const initials = getUserInitials(user?.name, user?.email);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const navItems = [
        {
            label: translations.landing.features,
            href: "#features",
        },
        {
            label: translations.landing.grades,
            href: "#grades",
        },
        {
            label: translations.landing.advantages,
            href: "#advantages",
        },
    ];

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleDocumentClick(event: MouseEvent) {
            const target = event.target as Node | null;
            if (
                target &&
                panelRef.current &&
                triggerRef.current &&
                !panelRef.current.contains(target) &&
                !triggerRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleDocumentClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (href.startsWith("#")) {
            const targetId = href.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                e.preventDefault();
                const navbarOffset = 76;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.pageYOffset - navbarOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });

                window.history.pushState(null, "", href);
            }
        }
    };

    return (
        <motion.header
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl'
        >
            <Container className='flex h-16 items-center justify-between gap-4'>
                <Link href='/' className='group flex items-center gap-2.5'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105'>
                        <GraduationCap className='h-5 w-5 text-white' />
                    </div>

                    <div className='flex items-center gap-1.5'>
                        <span className='text-xl font-bold tracking-tight text-white'>
                            Math <span className='bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent'>AI</span>
                        </span>
                        <span className='rounded-full border border-violet-400/30 bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300'>
                            2.0
                        </span>
                    </div>
                </Link>

                <nav className='hidden flex-1 items-center justify-center md:flex'>
                    <div className='flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5 transition-colors'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className='rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className='flex items-center gap-3'>
                    <LanguageSwitcher sideOffset={26} />

                    {status === "loading" ? (
                        <div className='h-9 w-24 animate-pulse rounded-full bg-muted/70' />
                    ) : status === "authenticated" && user ? (
                        <>
                            <div className='relative'>
                                <button
                                    ref={triggerRef}
                                    type='button'
                                    aria-expanded={isOpen}
                                    aria-controls='profile-popover'
                                    aria-haspopup='menu'
                                    onClick={() => setIsOpen((value) => !value)}
                                    className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40'
                                >
                                    <Avatar size='sm' className='h-8 w-8'>
                                        {user.image ? (
                                            <AvatarImage
                                                src={user.image}
                                                alt={displayName}
                                            />
                                        ) : null}
                                        <AvatarFallback>
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='hidden sm:inline'>
                                        {displayName}
                                    </span>
                                    <ChevronDown className='h-4 w-4 text-muted-foreground' />
                                </button>

                                {isOpen ? (
                                    <div
                                        id='profile-popover'
                                        ref={panelRef}
                                        role='menu'
                                        className='absolute right-0 z-50 mt-4 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl'
                                    >
                                        <div className='flex items-center gap-3 rounded-3xl bg-slate-900/70 p-3'>
                                            <Avatar
                                                size='lg'
                                                className='h-12 w-12'
                                            >
                                                {user.image ? (
                                                    <AvatarImage
                                                        src={user.image}
                                                        alt={displayName}
                                                    />
                                                ) : null}
                                                <AvatarFallback>
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='min-w-0 overflow-hidden'>
                                                <p className='truncate text-sm font-semibold text-white'>
                                                    {displayName}
                                                </p>
                                                <p className='truncate text-xs text-muted-foreground'>
                                                    {user.email ?? "No email"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-4 space-y-1 text-sm'>
                                            <Link
                                                href='/dashboard'
                                                className='flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/5'
                                            >
                                                <LayoutDashboard className='h-4 w-4 text-muted-foreground' />
                                                {translations.navigation.dashboard}
                                            </Link>
                                            <Link
                                                href='/dashboard/settings'
                                                className='flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/5'
                                            >
                                                <UserCircle2 className='h-4 w-4 text-muted-foreground' />
                                                {translations.common.profile}
                                            </Link>
                                            <Link
                                                href='/dashboard/settings'
                                                className='flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/5'
                                            >
                                                <Settings className='h-4 w-4 text-muted-foreground' />
                                                {translations.common.settings}
                                            </Link>
                                        </div>

                                        <div className='mt-4 border-t border-white/10 pt-4'>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    if (typeof window !== 'undefined') {
                                                        localStorage.removeItem('math_gemini_api_key');
                                                    }
                                                    void signOut({
                                                        callbackUrl: "/",
                                                    });
                                                }}
                                                className='flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition-all duration-150 hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-destructive/30'
                                            >
                                                <LogOut className='h-4 w-4' />
                                                {translations.common.logout}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <Link href='/login'>
                            <Button
                                size='sm'
                                className='rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-indigo-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5'
                            >
                                {translations.common.login}
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button
                        type='button'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 md:hidden hover:text-white hover:bg-white/10 transition-colors'
                        aria-label='Toggle menu'
                    >
                        {mobileMenuOpen ? (
                            <X className='h-5 w-5' />
                        ) : (
                            <Menu className='h-5 w-5' />
                        )}
                    </button>
                </div>
            </Container>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className='border-b border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-150'>
                    <nav className='flex flex-col gap-2'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    handleNavClick(e, item.href);
                                    setMobileMenuOpen(false);
                                }}
                                className='rounded-xl px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors'
                            >
                                {item.label}
                            </Link>
                        ))}
                        {!user && (
                            <div className='pt-2 border-t border-white/10'>
                                <Link
                                    href='/login'
                                    onClick={() => setMobileMenuOpen(false)}
                                    className='flex h-10 w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-500 via-fuchsia-500 to-indigo-500 text-sm font-semibold text-white shadow-md'
                                >
                                    {translations.common.login}
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </motion.header>
    );
}
