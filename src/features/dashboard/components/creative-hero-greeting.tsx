'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Sparkles, Dices, ArrowRight, Brain, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/i18n/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MathInsight = {
    tagUz: string;
    tagEn: string;
    textUz: string;
    textEn: string;
    icon: typeof Sparkles;
};

const MATH_INSIGHTS: MathInsight[] = [
    {
        tagUz: '💡 Qiziqarli fakt',
        tagEn: '💡 Fun Fact',
        textUz: 'Al-Xorazmiy "Algebra" atamasini "Al-Jabr" (tiklash, tenglashtirish) so‘zidan kashf etgan. Siz buyuk allomalar vorisisiz!',
        textEn: 'Al-Khwarizmi derived the term "Algebra" from "Al-Jabr" (restoration and balancing). You follow the steps of legends!',
        icon: Sparkles,
    },
    {
        tagUz: '🧠 Fikr & Layfxak',
        tagEn: '🧠 Brain Spark',
        textUz: 'Har bir yechilgan masala — miyangizda yangi neyron yo‘lini ochadi. Har kuni atigi 1 ta dars katta farq qiladi!',
        textEn: 'Every solved equation builds new neural pathways in your brain. Just 1 lesson a day creates compound mastery!',
        icon: Brain,
    },
    {
        tagUz: '🚀 Ilhom',
        tagEn: '🚀 Inspiration',
        textUz: 'Kvadrat tenglamani yechish — bu fazoga uchirilgan raketaning trayektoriyasini hisoblash bilan bir xil qudratga ega!',
        textEn: 'Solving quadratic equations is the foundation for calculating rocket trajectories into space!',
        icon: Zap,
    },
    {
        tagUz: '🎯 Kunning qoidasi',
        tagEn: '🎯 Daily Tip',
        textUz: 'Xato qilishdan qo‘rqmang! Buyuk matematiklar yangi qonuniyatlarni aynan xatolarni tahlil qilish orqali topishgan.',
        textEn: "Don't fear mistakes! The greatest mathematical laws were discovered by investigating surprising errors.",
        icon: Target,
    },
    {
        tagUz: '🌌 Koinot tili',
        tagEn: '🌌 Universal Language',
        textUz: 'Galileo Galiley aytganidek: "Tabiat buyuk kitob bo‘lib, u faqat matematika tilida yozilgan".',
        textEn: 'As Galileo Galilei said: "Nature is a vast book written in the language of mathematics."',
        icon: Sparkles,
    },
    {
        tagUz: '📐 Geometriya siri',
        tagEn: '📐 Geometry Secret',
        textUz: 'Pifagor teoremasi faqat uchburchak emas, balki 3D video o‘yinlar va kompyuter grafikasi fizikasining negizidir.',
        textEn: 'The Pythagorean theorem is the bedrock of 3D video game engines, physics simulations, and GPS navigation.',
        icon: Brain,
    },
    {
        tagUz: '⏳ Kichik odat',
        tagEn: '⏳ Power of Habit',
        textUz: 'Kunda 15 daqiqa matematika — bir yilda 90 soatlik shaxsiy repetitor darsiga teng bilim beradi!',
        textEn: '15 minutes of math daily equals 90 hours of focused personal tutoring over a single year!',
        icon: Zap,
    },
];

export function CreativeHeroGreeting() {
    const { data: session } = useSession();
    const { language } = useLanguage();
    const [insightIndex, setInsightIndex] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    // Initial random insight on component mount
    useEffect(() => {
        const randomIdx = Math.floor(Math.random() * MATH_INSIGHTS.length);
        setInsightIndex(randomIdx);
    }, []);

    // Get time-of-day greeting
    const getGreetingDetails = () => {
        const hour = new Date().getHours();
        const rawName = session?.user?.name || '';
        const firstName = rawName.trim().split(' ')[0] || (language === 'uz' ? 'O‘quvchi' : 'Learner');

        if (hour >= 5 && hour < 12) {
            return {
                title: language === 'uz' ? `Xayrli tong, ${firstName}! ☀️` : `Good morning, ${firstName}! ☀️`,
                sub: language === 'uz' ? 'Bugungi kunni yangi matematik kashfiyotlar bilan boshlaymiz!' : 'Start your day with mathematical superpowers!',
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                title: language === 'uz' ? `Kuningiz unumli o‘tsin, ${firstName}! ⚡️` : `Productive afternoon, ${firstName}! ⚡️`,
                sub: language === 'uz' ? 'Miyani charxlash va misollar yechish uchun ajoyib vaqt!' : 'A fantastic time to sharpen your problem-solving skills!',
            };
        } else if (hour >= 18 && hour < 23) {
            return {
                title: language === 'uz' ? `Xayrli oqshom, ${firstName}! 🌆` : `Good evening, ${firstName}! 🌆`,
                sub: language === 'uz' ? 'Bugungi o‘rganganlaringizni mustahkamlab, AI bilan mashq qiling.' : 'Reinforce today’s achievements with interactive AI practice.',
            };
        } else {
            return {
                title: language === 'uz' ? `Tungi daho, ${firstName}! 🌌` : `Night owl genius, ${firstName}! 🌌`,
                sub: language === 'uz' ? 'Tungi sokinlikda eng murakkab formulalar ham osonroq tushuniladi.' : 'In the calm of the night, profound concepts become crystal clear.',
            };
        }
    };

    const handleShuffleInsight = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 300);
        setInsightIndex((prev) => (prev + 1) % MATH_INSIGHTS.length);
    };

    const greeting = getGreetingDetails();
    const currentInsight = MATH_INSIGHTS[insightIndex] || MATH_INSIGHTS[0];
    const InsightIcon = currentInsight.icon;

    return (
        <div className='relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/[0.08] via-card to-card p-5 sm:p-7 lg:p-8 shadow-xs backdrop-blur-md transition-all'>
            {/* Background mathematical watermarks */}
            <div className='pointer-events-none absolute -right-6 -top-8 select-none font-mono text-7xl font-extrabold text-primary/[0.04] sm:text-9xl dark:text-primary/[0.07]'>
                ∑
            </div>
            <div className='pointer-events-none absolute right-24 -bottom-6 select-none font-mono text-6xl font-extrabold text-primary/[0.03] sm:text-8xl dark:text-primary/[0.06]'>
                π
            </div>
            <div className='pointer-events-none absolute right-56 top-1/2 -translate-y-1/2 select-none font-mono text-5xl font-extrabold text-primary/[0.03] sm:text-7xl dark:text-primary/[0.05]'>
                ∞
            </div>

            <div className='relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
                {/* Left: Personalized Greeting & Math Insight */}
                <div className='max-w-2xl space-y-3.5'>
                    <div>
                        <h1 className='font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground'>
                            {greeting.title}
                        </h1>
                        <p className='mt-1 text-xs sm:text-sm text-muted-foreground'>
                            {greeting.sub}
                        </p>
                    </div>

                    {/* Creative Dynamic Insight Capsule */}
                    <div className='group flex items-start gap-3 rounded-2xl border border-primary/15 bg-background/70 p-3.5 shadow-2xs backdrop-blur-sm sm:items-center'>
                        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-2xs'>
                            <InsightIcon className='size-4.5' />
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2'>
                                <span className='text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary'>
                                    {language === 'uz' ? currentInsight.tagUz : currentInsight.tagEn}
                                </span>
                            </div>
                            <p className='mt-0.5 text-xs sm:text-sm text-foreground/90 leading-relaxed'>
                                {language === 'uz' ? currentInsight.textUz : currentInsight.textEn}
                            </p>
                        </div>
                        <button
                            type='button'
                            onClick={handleShuffleInsight}
                            className='flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95'
                            title={language === 'uz' ? 'Yangi fikr / fakt olish' : 'Get another insight'}
                            aria-label='Shuffle insight'
                        >
                            <Dices className={cn('size-4 transition-transform duration-300', isRotating && 'rotate-180')} />
                        </button>
                    </div>
                </div>

                {/* Right: Quick Action Buttons */}
                <div className='flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0'>
                    <Link href='/dashboard/classes'>
                        <Button className='h-11 gap-2 rounded-2xl px-5 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02]'>
                            <span>{language === 'uz' ? 'Darsni boshlash' : 'Start Learning'}</span>
                            <ArrowRight className='size-4' />
                        </Button>
                    </Link>

                    <Link href='/dashboard/ai'>
                        <Button variant='outline' className='h-11 gap-2 rounded-2xl border-border/80 bg-background/80 px-4 text-xs sm:text-sm font-semibold shadow-2xs transition-all hover:bg-accent/60 hover:scale-[1.02]'>
                            <Sparkles className='size-4 text-primary' />
                            <span>{language === 'uz' ? 'AI Ustoz' : 'AI Tutor'}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
