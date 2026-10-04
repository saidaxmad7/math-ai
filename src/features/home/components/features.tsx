"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Brain,
    ChartColumn,
    Sparkles,
    type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/common/container";

type FeatureItem = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const features: FeatureItem[] = [
    {
        icon: Brain,
        title: "9–11-sinflar",
        description: "Barcha matematika mavzulari.",
    },
    {
        icon: Sparkles,
        title: "AI mashqlar",
        description: "Cheksiz AI yaratgan misollar.",
    },
    {
        icon: ChartColumn,
        title: "Rivojlanishni kuzatish",
        description: "Statistika va natijalar.",
    },
    {
        icon: BookOpen,
        title: "AI yordamchi",
        description: "Har bir mavzuni tushuntiruvchi AI.",
    },
];

export function Features() {
    return (
        <section id='features' className='relative py-24 sm:py-28'>
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_40%)]' />

            <Container>
                <div className='mx-auto max-w-3xl text-center'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-violet-300'>
                        Imkoniyatlar
                    </p>
                    <h2 className='mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
                        O&apos;zingizga mos ta&apos;lim muhiti
                    </h2>
                </div>

                <div
                    id='advantages'
                    className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4'
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                whileHover={{ y: -8, scale: 1.01 }}
                                transition={{
                                    duration: 0.35,
                                    delay: index * 0.05,
                                }}
                                className='group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.32)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/40 hover:shadow-[0_24px_90px_rgba(139,92,246,0.24)]'
                            >
                                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 text-violet-200 ring-1 ring-white/10'>
                                    <Icon className='h-6 w-6' />
                                </div>

                                <h3 className='mt-6 text-xl font-semibold text-white'>
                                    {feature.title}
                                </h3>

                                <p className='mt-3 text-sm leading-7 text-slate-300'>
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
