"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Settings,
    UserCircle2,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
    {
        label: "Imkoniyatlar",
        href: "#features",
    },
    {
        label: "Sinflar",
        href: "#grades",
    },
    {
        label: "Afzalliklar",
        href: "#advantages",
    },
];

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
    const { data: session, status } = useSession();
    const user = session?.user;
    const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
    const initials = getUserInitials(user?.name, user?.email);
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

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

    return (
        <motion.header
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl'
        >
            <Container className='flex h-16 items-center justify-between gap-4'>
                <Link href='/' className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 via-fuchsia-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-violet-950/20'>
                        M
                    </div>

                    <span className='text-xl font-semibold tracking-tight text-foreground'>
                        Math AI
                    </span>
                </Link>

                <nav className='hidden flex-1 items-center justify-center md:flex'>
                    <div className='flex items-center gap-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className='text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className='flex items-center gap-3'>
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
                                        className='absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl'
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
                                                Dashboard
                                            </Link>
                                            <Link
                                                href='/dashboard'
                                                className='flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/5'
                                            >
                                                <UserCircle2 className='h-4 w-4 text-muted-foreground' />
                                                Profil
                                            </Link>
                                            <Link
                                                href='/dashboard/settings'
                                                className='flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/5'
                                            >
                                                <Settings className='h-4 w-4 text-muted-foreground' />
                                                Sozlamalar
                                            </Link>
                                        </div>

                                        <div className='mt-4 border-t border-white/10 pt-4'>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    void signOut({
                                                        callbackUrl: "/",
                                                    });
                                                }}
                                                className='flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition-all duration-150 hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-destructive/30'
                                            >
                                                <LogOut className='h-4 w-4' />
                                                Chiqish
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
                                Kirish
                            </Button>
                        </Link>
                    )}
                </div>
            </Container>
        </motion.header>
    );
}
