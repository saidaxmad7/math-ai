"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Brain,
    ChartColumn,
    CheckCircle2,
    GraduationCap,
    Sparkles,
    Zap,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { useLanguage } from "@/i18n/language-context";
import { Button } from "@/components/ui/button";

export function Features() {
    const { translations, language } = useLanguage();

    const features = [
        {
            icon: GraduationCap,
            badge:
                language === "uz"
                    ? "9–11-sinf darsliklari"
                    : language === "ru"
                    ? "Учебники 9–11 классов"
                    : "Grades 9–11 Textbooks",
            title: translations.landing.gradesFeatureTitle,
            description: translations.landing.gradesFeatureDesc,
            gradient: "from-violet-500 via-indigo-500 to-purple-600",
            borderHover: "hover:border-violet-500/50",
            tag:
                language === "uz"
                    ? "Davlat dasturi"
                    : language === "ru"
                    ? "Гос. программа"
                    : "National Curriculum",
        },
        {
            icon: Sparkles,
            badge:
                language === "uz"
                    ? "Sun'iy intellekt"
                    : language === "ru"
                    ? "Искусственный интеллект"
                    : "AI Powered",
            title: translations.landing.aiPracticeFeatureTitle,
            description: translations.landing.aiPracticeFeatureDesc,
            gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
            borderHover: "hover:border-pink-500/50",
            tag:
                language === "uz"
                    ? "Cheksiz mashqlar"
                    : language === "ru"
                    ? "Бесконечные задачи"
                    : "Unlimited Practice",
        },
        {
            icon: ChartColumn,
            badge:
                language === "uz"
                    ? "Analitika"
                    : language === "ru"
                    ? "Аналитика"
                    : "Analytics",
            title: translations.landing.progressFeatureTitle,
            description: translations.landing.progressFeatureDesc,
            gradient: "from-emerald-500 via-teal-500 to-cyan-500",
            borderHover: "hover:border-emerald-500/50",
            tag:
                language === "uz"
                    ? "Real-vaqt tahlili"
                    : language === "ru"
                    ? "Анализ в реальном времени"
                    : "Real-time Stats",
        },
        {
            icon: Brain,
            badge:
                language === "uz"
                    ? "24/7 Repetitor"
                    : language === "ru"
                    ? "24/7 Репетитор"
                    : "24/7 AI Tutor",
            title: translations.landing.tutorFeatureTitle,
            description: translations.landing.tutorFeatureDesc,
            gradient: "from-amber-500 via-orange-500 to-rose-500",
            borderHover: "hover:border-amber-500/50",
            tag:
                language === "uz"
                    ? "Qadamma-qadam"
                    : language === "ru"
                    ? "Пошагово"
                    : "Step-by-step",
        },
    ];

    return (
        <section id='features' className='relative py-24 sm:py-32 scroll-mt-20'>
            {/* Ambient Background Aura specifically for the Features & Advantages section */}
            <div className='absolute inset-0 -z-10 pointer-events-none overflow-hidden'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-violet-600/20 via-indigo-600/15 to-fuchsia-600/15 blur-[140px] rounded-full' />
                {/* Floating mathematical watermarks */}
                <span className='absolute top-10 left-[5%] text-2xl font-mono font-bold text-violet-300/[0.08] select-none hidden lg:block'>
                    sin²α + cos²α = 1
                </span>
                <span className='absolute bottom-20 right-[6%] text-2xl font-mono font-bold text-indigo-300/[0.08] select-none hidden lg:block'>
                    e^(iπ) + 1 = 0
                </span>
            </div>

            <Container>
                {/* Section Header */}
                <div className='mx-auto max-w-3xl text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className='inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-md'
                    >
                        <Zap className='h-3.5 w-3.5 text-violet-300' />
                        <span>{translations.landing.featuresSubtitle}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className='mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight'
                    >
                        {language === "uz" ? (
                            <>
                                Matematikani o&apos;rganishning{" "}
                                <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent'>
                                    eng qulay va samarali
                                </span>{" "}
                                muhiti
                            </>
                        ) : language === "ru" ? (
                            <>
                                Самый эффективный способ{" "}
                                <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent'>
                                    освоить математику
                                </span>
                            </>
                        ) : (
                            <>
                                The Most Effective Way to{" "}
                                <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent'>
                                    Master Mathematics
                                </span>
                            </>
                        )}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.14 }}
                        className='mt-4 text-base text-slate-300 sm:text-lg max-w-2xl mx-auto leading-relaxed'
                    >
                        {language === "uz"
                            ? "Darsliklar, cheksiz testlar, qadamma-qadam formulalar tahlili va interaktiv AI repetitor o'quvchilarga chuqur bilim berish uchun birlashtirildi."
                            : language === "ru"
                            ? "Учебники, бесконечные практические тесты, пошаговый разбор формул и персональный AI репетитор объединены на одной современной платформе."
                            : "Comprehensive textbook lessons, endless practice tests, formula walkthroughs, and personal AI tutoring unified in one modern app."}
                    </motion.p>
                </div>

                {/* Grid of 4 Elevated Cards in #advantages */}
                <div
                    id='advantages'
                    className='scroll-mt-28 mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                whileHover={{ y: -8, scale: 1.015 }}
                                transition={{
                                    duration: 0.35,
                                    delay: index * 0.06,
                                    ease: "easeOut",
                                }}
                                className={`group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 ${feature.borderHover} hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)]`}
                            >
                                {/* Top hairline glow accent */}
                                <div className='absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                                <div>
                                    {/* Icon Box with Tag */}
                                    <div className='flex items-center justify-between gap-2'>
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg ring-1 ring-white/20`}
                                        >
                                            <Icon className='h-6 w-6' />
                                        </div>
                                        <span className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors'>
                                            {feature.tag}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className='mt-6 text-xl font-bold text-white group-hover:text-violet-200 transition-colors'>
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className='mt-2.5 text-sm leading-relaxed text-slate-300/90'>
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Bottom Pill Status */}
                                <div className='mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-violet-300 font-medium'>
                                    <Sparkles className='h-3.5 w-3.5' />
                                    <span>{feature.badge}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Call to Action Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='mt-16 sm:mt-20 relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-violet-950/60 via-slate-900/80 to-indigo-950/60 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl'
                >
                    <div className='absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-600/30 blur-[90px]' />
                    <div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-600/30 blur-[90px]' />

                    <div className='relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row text-center md:text-left'>
                        <div className='max-w-2xl space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300'>
                                <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                                <span>
                                    {language === "uz"
                                        ? "Bepul kirish ochiq"
                                        : language === "ru"
                                        ? "Бесплатный доступ открыт"
                                        : "Free Access Open"}
                                </span>
                            </div>
                            <h3 className='text-2xl sm:text-3xl font-extrabold text-white'>
                                {language === "uz"
                                    ? "Bugunoq AI bilan matematikani oson o'rganing"
                                    : language === "ru"
                                    ? "Изучайте математику с ИИ легко уже сегодня"
                                    : "Start Learning Mathematics with AI Today"}
                            </h3>
                            <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
                                {language === "uz"
                                    ? "Ro'yxatdan o'ting va 9–11-sinf darsliklari, mashqlar hamda shaxsiy AI repetitordan darhol foydalaning."
                                    : language === "ru"
                                    ? "Зарегистрируйтесь и получите мгновенный доступ к учебникам 9–11 классов, упражнениям и личному AI репетитору."
                                    : "Sign up and get instant access to Grade 9–11 national curriculum, practice problems, and personal AI tutor."}
                            </p>
                            <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-300'>
                                <div className='flex items-center gap-1.5'>
                                    <CheckCircle2 className='h-4 w-4 text-emerald-400' />
                                    <span>
                                        {language === "uz"
                                            ? "9–11-sinf darsliklari"
                                            : language === "ru"
                                            ? "Учебники 9–11 классов"
                                            : "Grades 9–11 Textbooks"}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <CheckCircle2 className='h-4 w-4 text-emerald-400' />
                                    <span>
                                        {language === "uz"
                                            ? "Cheksiz AI misollar"
                                            : language === "ru"
                                            ? "Бесконечные AI задачи"
                                            : "Unlimited AI Problems"}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <CheckCircle2 className='h-4 w-4 text-emerald-400' />
                                    <span>
                                        {language === "uz"
                                            ? "O'zbek, Rus va Ingliz tillarida"
                                            : language === "ru"
                                            ? "На узбекском, русском и английском"
                                            : "In Uzbek, Russian & English"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='shrink-0'>
                            <Link href='/login'>
                                <Button
                                    size='lg'
                                    className='h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 text-base font-bold text-white shadow-xl shadow-violet-950/50 hover:opacity-95 hover:scale-[1.02] transition-all'
                                >
                                    <span>{translations.landing.getStarted}</span>
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
