"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant='ghost' size='icon' aria-label='Toggle theme'>
                <Sun className='h-5 w-5' />
            </Button>
        );
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            aria-label='Toggle theme'
        >
            {resolvedTheme === "dark" ? (
                <Sun className='h-5 w-5' />
            ) : (
                <Moon className='h-5 w-5' />
            )}
        </Button>
    );
}
