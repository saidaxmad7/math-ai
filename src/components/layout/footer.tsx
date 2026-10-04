import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/container";

export function Footer() {
    return (
        <footer className='border-t border-white/10 bg-black/20 py-8'>
            <Container className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <p className='text-sm text-slate-400'>© 2026 Math AI</p>

                <Link
                    href='/'
                    className='inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white'
                >
                    Designed & Developed by Saidaxmad
                    <ArrowUpRight className='h-4 w-4' />
                </Link>
            </Container>
        </footer>
    );
}
