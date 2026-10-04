"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function Hero() {
    const { status } = useSession();
    const showLoginButton = status !== "authenticated";
    return (
        <section
            id='grades'
            className='relative overflow-hidden py-24 sm:py-28 lg:py-36'
        >
            <div className='absolute inset-0 -z-10'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.3),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.24),transparent_28%),linear-gradient(135deg,rgba(9,9,11,0.98),rgba(17,24,39,0.92))]' />
                <div className='absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px]' />
                <div className='absolute left-1/2 top-0 h-120 w-120 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]' />
            </div>

            <Container>
                <div className='mx-auto flex max-w-5xl flex-col items-center text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className='inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 shadow-lg shadow-violet-950/20 backdrop-blur'
                    >
                        <Sparkles className='h-4 w-4' />
                        <span>AI yordamidagi ta&apos;lim</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className='mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl'
                    >
                        AI yordamidagi
                        <br />
                        <span className='bg-linear-to-r from-violet-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent'>
                            matematika o&apos;rganish
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl'
                    >
                        9–11-sinflar uchun barcha matematika mavzularini AI
                        yordamida o&apos;rganing. Sun&apos;iy intellekt
                        yordamida tushuntirishlar, mashqlar va
                        rivojlanishingizni kuzating.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className='mt-10 flex flex-col gap-3 sm:flex-row'
                    >
                        <Link href='/dashboard'>
                            <Button className='rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-indigo-500 px-6 py-6 text-sm font-semibold text-white shadow-2xl shadow-violet-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-950/40'>
                                Boshlash
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                        </Link>

                        {showLoginButton ? (
                            <Link href='/login'>
                                <Button
                                    variant='outline'
                                    className='rounded-full border-white/15 bg-white/5 px-6 py-6 text-sm font-semibold text-white shadow-lg shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10'
                                >
                                    Kirish
                                </Button>
                            </Link>
                        ) : null}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className='mt-14 grid w-full gap-3 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-violet-950/20 backdrop-blur md:grid-cols-3'
                    >
                        <div className='rounded-2xl border border-white/10 bg-black/20 p-4 text-left'>
                            <p className='text-sm font-semibold text-violet-200'>
                                Realtime
                            </p>
                            <p className='mt-1 text-sm text-slate-300'>
                                AI bilan zamonaviy tushuntirishlar
                            </p>
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-black/20 p-4 text-left'>
                            <p className='text-sm font-semibold text-violet-200'>
                                Keng qamrov
                            </p>
                            <p className='mt-1 text-sm text-slate-300'>
                                100+ mavzu va mashq variantlari
                            </p>
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-black/20 p-4 text-left'>
                            <p className='text-sm font-semibold text-violet-200'>
                                Natija
                            </p>
                            <p className='mt-1 text-sm text-slate-300'>
                                Rivojlanishni kuzatish va tahlil
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
