"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebarStore } from "@/store/sidebar-store";

export function Header() {
    const { toggle } = useSidebarStore();
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
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-8 backdrop-blur">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={toggle}>
                    <Menu className="h-5 w-5" />
                </Button>

                <SearchBar />
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>

                <div className="hidden items-center gap-3 md:flex">
                    <Avatar>
                        <AvatarImage
                            src={user?.image ?? ""}
                            alt={user?.name ?? "User"}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className="text-right">
                        <p className="text-sm font-medium">{user?.name}</p>

                        <p className="text-xs text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                        signOut({
                            callbackUrl: "/login",
                        })
                    }
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}