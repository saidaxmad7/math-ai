"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Bot,
    BookOpen,
    CheckCircle2,
    Zap,
    GraduationCap,
    TrendingUp,
    ShieldCheck,
    Cpu,
    Compass,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-context";

type DemoTabKey = "pythagoras" | "quadratic" | "derivative";

interface DemoSample {
    id: DemoTabKey;
    label: string;
    icon: string;
    question: string;
    gradeTag: string;
    steps: {
        title: string;
        formula: string;
        explanation: string;
    }[];
    result: string;
}

const DEMO_SAMPLES_UZ: Record<DemoTabKey, DemoSample> = {
    pythagoras: {
        id: "pythagoras",
        label: "Pifagor teoremasi",
        icon: "📐",
        gradeTag: "8–9-sinf Geometriya",
        question: "To'g'ri burchakli uchburchakning katetlari a = 6 sm va b = 8 sm bo'lsa, gipotenuzasi c ni va yuzini toping.",
        steps: [
            {
                title: "1-qadam: Pifagor formulasini qo'llash",
                formula: "c² = a² + b² ⟹ c = √(6² + 8²)",
                explanation: "To'g'ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig'indisiga teng.",
            },
            {
                title: "2-qadam: Kvadrat ildizni hisoblash",
                formula: "c = √(36 + 64) = √100 = 10 sm",
                explanation: "Katetlar kvadratlari yig'indisi 100 ga teng, uning ildizi 10 sm bo'ladi.",
            },
        ],
        result: "Gipotenuza c = 10 sm. Uchburchak yuzi: S = ½ · 6 · 8 = 24 sm² ✅",
    },
    quadratic: {
        id: "quadratic",
        label: "Kvadrat tenglama",
        icon: "🔢",
        gradeTag: "8–9-sinf Algebra",
        question: "Kvadrat tenglamani yeching: 2x² - 8x + 6 = 0",
        steps: [
            {
                title: "1-qadam: Diskriminantni topish",
                formula: "D = b² - 4ac = (-8)² - 4 · 2 · 6 = 64 - 48 = 16 > 0",
                explanation: "Diskriminant noldan katta bo'lgani uchun tenglama 2 ta haqiqiy ildizga ega.",
            },
            {
                title: "2-qadam: Ildizlar formulasini qo'llash",
                formula: "x = (-b ± √D) / (2a) = (8 ± 4) / 4 ⟹ x₁ = 3,  x₂ = 1",
                explanation: "Viyet teoremasi bo'yicha ham tekshirish: x₁ + x₂ = 4 va x₁ · x₂ = 3.",
            },
        ],
        result: "Tenglama ildizlari: x₁ = 3 va x₂ = 1 ✅",
    },
    derivative: {
        id: "derivative",
        label: "Funksiya hosilasi",
        icon: "📈",
        gradeTag: "10–11-sinf Matematika",
        question: "f(x) = 3x³ - 5x² + 7x - 4 funksiyaning hosilasini f'(x) toping.",
        steps: [
            {
                title: "1-qadam: Darajali funksiya hosilasi qoidasi",
                formula: "(xⁿ)' = n · xⁿ⁻¹ va (c · u)' = c · u'",
                explanation: "Har bir haddan alohida-alohida daraja qoidasi bo'yicha hosila olinadi.",
            },
            {
                title: "2-qadam: Hadma-had hosila olish",
                formula: "f'(x) = 3·(3x²) - 5·(2x) + 7·(1) - 0 = 9x² - 10x + 7",
                explanation: "Ozod sonning (-4) hosilasi doim 0 ga teng bo'ladi.",
            },
        ],
        result: "Hosila: f'(x) = 9x² - 10x + 7 ✅",
    },
};

const DEMO_SAMPLES_EN: Record<DemoTabKey, DemoSample> = {
    pythagoras: {
        id: "pythagoras",
        label: "Pythagorean Theorem",
        icon: "📐",
        gradeTag: "Grade 8–9 Geometry",
        question: "In a right triangle with legs a = 6 cm and b = 8 cm, find hypotenuse c and the area.",
        steps: [
            {
                title: "Step 1: Apply Pythagorean formula",
                formula: "c² = a² + b² ⟹ c = √(6² + 8²)",
                explanation: "In any right-angled triangle, the hypotenuse squared equals the sum of squares of the legs.",
            },
            {
                title: "Step 2: Calculate square root",
                formula: "c = √(36 + 64) = √100 = 10 cm",
                explanation: "Sum of squares is 100, its square root yields 10 cm.",
            },
        ],
        result: "Hypotenuse c = 10 cm. Area: S = ½ · 6 · 8 = 24 cm² ✅",
    },
    quadratic: {
        id: "quadratic",
        label: "Quadratic Equation",
        icon: "🔢",
        gradeTag: "Grade 8–9 Algebra",
        question: "Solve the quadratic equation: 2x² - 8x + 6 = 0",
        steps: [
            {
                title: "Step 1: Calculate discriminant",
                formula: "D = b² - 4ac = (-8)² - 4 · 2 · 6 = 64 - 48 = 16 > 0",
                explanation: "Since D > 0, the equation has two distinct real roots.",
            },
            {
                title: "Step 2: Apply quadratic formula",
                formula: "x = (-b ± √D) / (2a) = (8 ± 4) / 4 ⟹ x₁ = 3,  x₂ = 1",
                explanation: "Checked with Vieta's formulas: x₁ + x₂ = 4 and x₁ · x₂ = 3.",
            },
        ],
        result: "Roots: x₁ = 3 and x₂ = 1 ✅",
    },
    derivative: {
        id: "derivative",
        label: "Calculus Derivative",
        icon: "📈",
        gradeTag: "Grade 10–11 Calculus",
        question: "Find the derivative f'(x) for f(x) = 3x³ - 5x² + 7x - 4.",
        steps: [
            {
                title: "Step 1: Power rule for differentiation",
                formula: "(xⁿ)' = n · xⁿ⁻¹ and (c · u)' = c · u'",
                explanation: "Differentiate each polynomial term using the standard power rule.",
            },
            {
                title: "Step 2: Term-by-term calculation",
                formula: "f'(x) = 3·(3x²) - 5·(2x) + 7·(1) - 0 = 9x² - 10x + 7",
                explanation: "The derivative of constant term (-4) is 0.",
            },
        ],
        result: "Derivative: f'(x) = 9x² - 10x + 7 ✅",
    },
};

const DEMO_SAMPLES_RU: Record<DemoTabKey, DemoSample> = {
    pythagoras: {
        id: "pythagoras",
        label: "Теорема Пифагора",
        icon: "📐",
        gradeTag: "8–9 класс Геометрия",
        question: "В прямоугольном треугольнике с катетами a = 6 см и b = 8 см найдите гипотенузу c и площадь.",
        steps: [
            {
                title: "Шаг 1: Применение теоремы Пифагора",
                formula: "c² = a² + b² ⟹ c = √(6² + 8²)",
                explanation: "В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов.",
            },
            {
                title: "Шаг 2: Вычисление квадратного корня",
                formula: "c = √(36 + 64) = √100 = 10 см",
                explanation: "Сумма квадратов равна 100, корень из 100 равен 10 см.",
            },
        ],
        result: "Гипотенуза c = 10 см. Площадь: S = ½ · 6 · 8 = 24 см² ✅",
    },
    quadratic: {
        id: "quadratic",
        label: "Квадратное уравнение",
        icon: "🔢",
        gradeTag: "8–9 класс Алгебра",
        question: "Решите квадратное уравнение: 2x² - 8x + 6 = 0",
        steps: [
            {
                title: "Шаг 1: Нахождение дискриминанта",
                formula: "D = b² - 4ac = (-8)² - 4 · 2 · 6 = 64 - 48 = 16 > 0",
                explanation: "Так как дискриминант больше нуля, уравнение имеет 2 действительных корня.",
            },
            {
                title: "Шаг 2: Применение формулы корней",
                formula: "x = (-b ± √D) / (2a) = (8 ± 4) / 4 ⟹ x₁ = 3,  x₂ = 1",
                explanation: "Проверка по теореме Виета: x₁ + x₂ = 4 и x₁ · x₂ = 3.",
            },
        ],
        result: "Корни уравнения: x₁ = 3 и x₂ = 1 ✅",
    },
    derivative: {
        id: "derivative",
        label: "Производная функции",
        icon: "📈",
        gradeTag: "10–11 класс Математика",
        question: "Найдите производную f'(x) для функции f(x) = 3x³ - 5x² + 7x - 4.",
        steps: [
            {
                title: "Шаг 1: Правило дифференцирования степени",
                formula: "(xⁿ)' = n · xⁿ⁻¹ и (c · u)' = c · u'",
                explanation: "Берем производную от каждого члена по правилу степенной функции.",
            },
            {
                title: "Шаг 2: Почленное дифференцирование",
                formula: "f'(x) = 3·(3x²) - 5·(2x) + 7·(1) - 0 = 9x² - 10x + 7",
                explanation: "Производная постоянного числа (-4) равна 0.",
            },
        ],
        result: "Производная: f'(x) = 9x² - 10x + 7 ✅",
    },
};

export function Hero() {
    const { status } = useSession();
    const { translations, language } = useLanguage();
    const showLoginButton = status !== "authenticated";
    const [activeTab, setActiveTab] = useState<DemoTabKey>("pythagoras");

    const samples =
        language === "uz"
            ? DEMO_SAMPLES_UZ
            : language === "ru"
            ? DEMO_SAMPLES_RU
            : DEMO_SAMPLES_EN;
    const currentSample = samples[activeTab];

    return (
        <section
            id='hero'
            className='relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-36'
        >
            {/* Multi-layer Ambient Glow Background */}
            <div className='absolute inset-0 -z-10 pointer-events-none overflow-hidden'>
                <div className='absolute -top-32 left-1/2 -translate-x-1/2 h-[650px] w-[1100px] rounded-full bg-gradient-to-tr from-violet-600/35 via-fuchsia-600/25 to-indigo-600/30 blur-[130px]' />
                <div className='absolute top-1/4 -left-20 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]' />
                <div className='absolute top-1/2 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-600/25 blur-[130px]' />
                <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_70%,transparent_100%)]' />

                {/* Floating mathematical formula badges */}
                <div className='absolute top-24 left-[7%] hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-sm font-semibold text-violet-200/60 backdrop-blur-md shadow-sm select-none'>
                    <span>∫ f(x)dx = F(x) + C</span>
                </div>
                <div className='absolute top-48 right-[8%] hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-sm font-semibold text-fuchsia-200/60 backdrop-blur-md shadow-sm select-none'>
                    <span>lim (1 + 1/n)ⁿ = e</span>
                </div>
                <div className='absolute bottom-36 left-[10%] hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-sm font-semibold text-indigo-200/60 backdrop-blur-md shadow-sm select-none'>
                    <span>a² + b² = c²</span>
                </div>
                <div className='absolute bottom-44 right-[10%] hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-sm font-semibold text-violet-200/60 backdrop-blur-md shadow-sm select-none'>
                    <span>D = b² - 4ac</span>
                </div>
            </div>

            <Container>
                <div className='mx-auto flex max-w-5xl flex-col items-center text-center'>
                    {/* Top Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className='inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-200 shadow-lg shadow-violet-950/20 backdrop-blur-md'
                    >
                        <span className='flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                        <Sparkles className='h-3.5 w-3.5 text-violet-300' />
                        <span>
                            {language === "uz"
                                ? "Math AI 2.0 • 9–11-sinf maktab o'quv dasturi asosida"
                                : language === "ru"
                                ? "Math AI 2.0 • На основе школьной программы 9–11 классов"
                                : "Math AI 2.0 • Based on National Curriculum (Grades 9–11)"}
                        </span>
                    </motion.div>

                    {/* Main Hero Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className='mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.12]'
                    >
                        <span>
                            {language === "uz"
                                ? "Sun'iy intellekt yordamida"
                                : language === "ru"
                                ? "Изучайте математику с"
                                : "Learn Mathematics with"}
                        </span>
                        <br />
                        <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm'>
                            {language === "uz"
                                ? "matematikani oson o'rganing"
                                : language === "ru"
                                ? "искусственным интеллектом легко"
                                : "Artificial Intelligence"}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14 }}
                        className='mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8'
                    >
                        {language === "uz"
                            ? "9–11-sinf davlat darsliklari, shaxsiy AI repetitor, qadamma-qadam formulalar tahlili va interaktiv mashqlar — barchasi bitta zamonaviy platformada."
                            : language === "ru"
                            ? "Школьные учебники 9–11 классов, персональный AI репетитор, пошаговый анализ формул и интерактивные упражнения — всё на одной платформе."
                            : "Comprehensive Grade 9–11 curriculum textbooks, personal 24/7 AI tutor, step-by-step formula analysis, and interactive practice questions."}
                    </motion.p>

                    {/* Primary CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row'
                    >
                        <Link href='/dashboard' className='w-full sm:w-auto'>
                            <Button className='w-full sm:w-auto h-12 sm:h-13 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 text-sm sm:text-base font-semibold text-white shadow-xl shadow-violet-600/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-600/40 cursor-pointer'>
                                <Zap className='mr-2 h-4 w-4' />
                                <span>
                                    {language === "uz"
                                        ? "O'rganishni boshlash (Bepul)"
                                        : language === "ru"
                                        ? "Начать обучение (Бесплатно)"
                                        : "Get Started (Free)"}
                                </span>
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                        </Link>

                        <Link href='/dashboard/classes' className='w-full sm:w-auto'>
                            <Button
                                variant='outline'
                                className='w-full sm:w-auto h-12 sm:h-13 rounded-full border-white/15 bg-white/[0.06] px-6 text-sm sm:text-base font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 cursor-pointer'
                            >
                                <BookOpen className='mr-2 h-4 w-4 text-violet-300' />
                                <span>
                                    {language === "uz"
                                        ? "Darsliklar va Sinflar"
                                        : language === "ru"
                                        ? "Учебники и Классы"
                                        : "Curriculum & Grades"}
                                </span>
                            </Button>
                        </Link>

                        {showLoginButton && (
                            <Link href='/login' className='w-full sm:w-auto'>
                                <Button
                                    variant='ghost'
                                    className='w-full sm:w-auto h-12 sm:h-13 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer'
                                >
                                    <span>{translations.landing.login} ➜</span>
                                </Button>
                            </Link>
                        )}
                    </motion.div>

                    {/* Grade Shortcut Chips */}
                    <motion.div
                        id='grades'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className='scroll-mt-28 mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400'
                    >
                        <span className='font-medium text-slate-400'>
                            {language === "uz" ? "Darsliklar:" : language === "ru" ? "Учебники:" : "Textbooks:"}
                        </span>
                        <Link
                            href='/dashboard/grades'
                            className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 hover:border-violet-400/50 hover:text-white transition-colors'
                        >
                            📘 {language === "uz" ? "9-sinf (Algebra & Geometriya)" : language === "ru" ? "9 класс (Алгебра и Геометрия)" : "Grade 9 (Algebra & Geometry)"}
                        </Link>
                        <Link
                            href='/dashboard/grades'
                            className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 hover:border-violet-400/50 hover:text-white transition-colors'
                        >
                            📙 {language === "uz" ? "10-sinf (Algebra & Geometriya)" : language === "ru" ? "10 класс (Алгебра и Геометрия)" : "Grade 10 (Algebra & Geometry)"}
                        </Link>
                        <Link
                            href='/dashboard/grades'
                            className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 hover:border-violet-400/50 hover:text-white transition-colors'
                        >
                            📗 {language === "uz" ? "11-sinf (Matematika)" : language === "ru" ? "11 класс (Математика)" : "Grade 11 (Mathematics)"}
                        </Link>
                    </motion.div>

                    {/* LIVE INTERACTIVE AI DEMO PREVIEW WINDOW */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='mt-12 sm:mt-16 w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-violet-500/25 bg-slate-950/80 p-3 sm:p-5 shadow-2xl shadow-violet-950/40 backdrop-blur-xl text-left'
                    >
                        {/* Demo Window Top Bar */}
                        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4'>
                            <div className='flex items-center gap-2'>
                                <div className='flex gap-1.5'>
                                    <div className='h-3 w-3 rounded-full bg-rose-500/80' />
                                    <div className='h-3 w-3 rounded-full bg-amber-500/80' />
                                    <div className='h-3 w-3 rounded-full bg-emerald-500/80' />
                                </div>
                                <div className='ml-2 flex items-center gap-2 text-xs font-semibold text-slate-300'>
                                    <Bot className='h-4 w-4 text-violet-400' />
                                    <span>
                                        Math AI Tutor •{" "}
                                        {language === "uz"
                                            ? "Jonli misol tahlili"
                                            : language === "ru"
                                            ? "Живой разбор примера"
                                            : "Live Solving Demo"}
                                    </span>
                                </div>
                            </div>

                            {/* Demo Sample Tabs */}
                            <div className='flex flex-wrap items-center gap-1.5'>
                                {(Object.keys(samples) as DemoTabKey[]).map((key) => {
                                    const sample = samples[key];
                                    const isActive = activeTab === key;
                                    return (
                                        <button
                                            key={key}
                                            type='button'
                                            onClick={() => setActiveTab(key)}
                                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                                                isActive
                                                    ? "bg-violet-500 text-white shadow-md shadow-violet-600/25"
                                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            <span>{sample.icon}</span>
                                            <span>{sample.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Interactive Demo Content Area */}
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className='mt-4 space-y-3.5'
                            >
                                {/* User Question Card */}
                                <div className='flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4'>
                                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600/20 text-violet-300 text-sm font-bold'>
                                        👤
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xs font-semibold text-violet-300'>
                                                {language === "uz"
                                                    ? "O'quvchi savoli"
                                                    : language === "ru"
                                                    ? "Вопрос ученика"
                                                    : "Student Question"}
                                            </span>
                                            <span className='rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-slate-400'>
                                                {currentSample.gradeTag}
                                            </span>
                                        </div>
                                        <p className='mt-1 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed'>
                                            {currentSample.question}
                                        </p>
                                    </div>
                                </div>

                                {/* AI Response Card */}
                                <div className='flex items-start gap-3 rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 sm:p-4'>
                                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-900/30'>
                                        <Bot className='h-4 w-4' />
                                    </div>
                                    <div className='min-w-0 flex-1 space-y-3'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-xs font-bold text-white'>Math AI Repetitor</span>
                                                <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300'>
                                                    <Sparkles className='h-2.5 w-2.5' />
                                                    {language === "uz"
                                                        ? "Qadamma-qadam yechim"
                                                        : language === "ru"
                                                        ? "Пошаговое решение"
                                                        : "Step-by-step solution"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Formula Steps */}
                                        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2'>
                                            {currentSample.steps.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className='rounded-lg border border-white/10 bg-slate-900/60 p-2.5'
                                                >
                                                    <p className='text-[11px] font-semibold text-violet-300'>{step.title}</p>
                                                    <p className='mt-1 font-mono text-xs text-white bg-black/40 px-2 py-1 rounded border border-white/5'>
                                                        {step.formula}
                                                    </p>
                                                    <p className='mt-1 text-[11px] text-slate-400 leading-tight'>
                                                        {step.explanation}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Result Banner */}
                                        <div className='rounded-lg border border-emerald-500/30 bg-emerald-950/25 px-3 py-2 text-xs font-semibold text-emerald-200 flex items-center justify-between'>
                                            <span>{currentSample.result}</span>
                                            <Link
                                                href='/dashboard/ai'
                                                className='text-[11px] text-violet-300 hover:text-white underline underline-offset-2 ml-2 shrink-0'
                                            >
                                                {language === "uz"
                                                    ? "AI ga o'z savolingizni bering ➜"
                                                    : language === "ru"
                                                    ? "Задайте свой вопрос AI ➜"
                                                    : "Ask your own question ➜"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* 3 Modern Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.35 }}
                        className='mt-8 sm:mt-12 grid w-full gap-4 grid-cols-1 md:grid-cols-3'
                    >
                        <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 text-left shadow-lg backdrop-blur-md hover:border-violet-500/40 hover:-translate-y-0.5 transition-all duration-300'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 mb-3'>
                                <Zap className='h-5 w-5' />
                            </div>
                            <h3 className='text-base font-semibold text-white'>
                                {language === "uz"
                                    ? "24/7 Shaxsiy AI Repetitor"
                                    : language === "ru"
                                    ? "24/7 Персональный AI Репетитор"
                                    : "24/7 Personal AI Tutor"}
                            </h3>
                            <p className='mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed'>
                                {language === "uz"
                                    ? "Har qanday murakkab misol, teorema yoki formulalarni kechayu-kunduz sabr bilan, bosqichma-bosqich tushuntiradi."
                                    : language === "ru"
                                    ? "Терпеливо и пошагово объясняет любые сложные задачи, теоремы и формулы 24 часа в сутки."
                                    : "Explains any complex math problem, theorem, or proof patiently step-by-step around the clock."}
                            </p>
                        </div>

                        <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 text-left shadow-lg backdrop-blur-md hover:border-fuchsia-500/40 hover:-translate-y-0.5 transition-all duration-300'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300 mb-3'>
                                <BookOpen className='h-5 w-5' />
                            </div>
                            <h3 className='text-base font-semibold text-white'>
                                {language === "uz"
                                    ? "9–11-sinf Davlat Darsliklari"
                                    : language === "ru"
                                    ? "Учебники 9–11 классов"
                                    : "Grades 9–11 Textbooks"}
                            </h3>
                            <p className='mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed'>
                                {language === "uz"
                                    ? "O‘zbekiston maktab darsliklarining barcha boblari, teoremalari, qoidalari va namunaviy misollar bazasi."
                                    : language === "ru"
                                    ? "База всех глав, теорем, правил и типовых примеров из школьных учебников."
                                    : "Official school textbooks for Algebra and Geometry with chapter-by-chapter theory and worked examples."}
                            </p>
                        </div>

                        <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 text-left shadow-lg backdrop-blur-md hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 mb-3'>
                                <TrendingUp className='h-5 w-5' />
                            </div>
                            <h3 className='text-base font-semibold text-white'>
                                {language === "uz"
                                    ? "Interaktiv Mashq va Natija"
                                    : language === "ru"
                                    ? "Интерактивная практика и результат"
                                    : "Interactive Practice & Mastery"}
                            </h3>
                            <p className='mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed'>
                                {language === "uz"
                                    ? "Cheksiz AI mashqlar, testlar, yo‘l qo‘yilgan xatolar tahlili va o‘zlashtirish darajangiz statistikasi."
                                    : language === "ru"
                                    ? "Бесконечные тесты от ИИ, разбор ошибок и подробная статистика усвоения материала."
                                    : "Unlimited AI-generated practice problems, mistake-review quizzes, and learning mastery analytics."}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
