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
    metadataBase: new URL(
        process.env.AUTH_URL ||
        process.env.NEXTAUTH_URL ||
        "https://math-ai-u65y.vercel.app"
    ),
    title: {
        default: "Math AI — 9–11-sinflar uchun AI matematika platformasi",
        template: "%s | Math AI",
    },
    description: "Sun'iy intellekt yordamida matematikani oson va qiziqarli o'rganing. 9–11-sinf darsliklari, shaxsiy AI repetitor, qadamma-qadam formulalar va interaktiv mashqlar.",
    applicationName: "Math AI",
    keywords: [
        "Math AI",
        "Matematika AI",
        "Sun'iy intellekt matematika",
        "9-sinf algebra",
        "10-sinf geometriya",
        "11-sinf matematika",
        "AI repetitor",
        "O'zbekiston maktab darsliklari",
        "Interaktiv matematika",
    ],
    authors: [{ name: "Math AI Team" }],
    creator: "Math AI",
    publisher: "Math AI",
    openGraph: {
        type: "website",
        locale: "uz_UZ",
        url: "https://math-ai-u65y.vercel.app",
        siteName: "Math AI",
        title: "Math AI — 9–11-sinflar uchun AI matematika platformasi",
        description: "Sun'iy intellekt yordamida matematikani oson va qiziqarli o'rganing. 9–11-sinf darsliklari, shaxsiy AI repetitor, qadamma-qadam formulalar va interaktiv mashqlar.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Math AI — 9–11-sinflar uchun AI matematika platformasi",
        description: "Sun'iy intellekt yordamida matematikani oson va qiziqarli o'rganing. 9–11-sinf darsliklari, shaxsiy AI repetitor, qadamma-qadam formulalar va interaktiv mashqlar.",
    },
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
