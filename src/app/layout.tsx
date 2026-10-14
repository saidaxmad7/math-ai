import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/i18n/language-context";
import AuthSessionProvider from "@/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import "./globals.css";
import "katex/dist/katex.min.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    ],
};

export const metadata: Metadata = {
    title: {
        default: "Math AI",
        template: "%s | Math AI",
    },
    description: "AI-powered mathematics learning platform",
    applicationName: "Math AI",
    keywords: [
        "Mathematics",
        "AI",
        "Education",
        "Learning",
        "Next.js",
        "Practice",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='uz'
            suppressHydrationWarning
            className={`${inter.variable} ${spaceGrotesk.variable}`}
        >
            <body className='min-h-screen bg-background font-sans antialiased'>
                <AuthSessionProvider>
                    <QueryProvider>
                        <ThemeProvider>
                            <LanguageProvider>
                                {children}
                                <Toaster richColors />
                            </LanguageProvider>
                        </ThemeProvider>
                    </QueryProvider>
                </AuthSessionProvider>
            </body>
        </html>
    );
}
