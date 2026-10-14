"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebarStore } from "@/store/sidebar-store";

export function Header() {
    const { toggle, toggleMobile } = useSidebarStore();
    const { data: session } = useSession();

    const user = session?.user;

    const initials =
        user?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "U";

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-3 sm:px-6 lg:px-8 backdrop-blur-md transition-all">
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Mobile hamburger button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-9 w-9 shrink-0"
                    onClick={toggleMobile}
                    aria-label="Toggle mobile navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Desktop collapse button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex h-9 w-9 shrink-0"
                    onClick={toggle}
                    aria-label="Toggle sidebar collapse"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <SearchBar />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
                <LanguageSwitcher />

                <ThemeToggle />

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label="Notifications"
                >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <div className="hidden items-center gap-2.5 lg:flex pl-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user?.image ?? ""}
                            alt={user?.name ?? "User"}
                        />
                        <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
                    </Avatar>

                    <div className="text-left max-w-[130px] xl:max-w-[180px]">
                        <p className="text-xs font-semibold text-foreground truncate">{user?.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Chiqish / Sign out"
                    onClick={() =>
                        signOut({
                            callbackUrl: "/login",
                        })
                    }
                >
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>
        </header>
    );
}