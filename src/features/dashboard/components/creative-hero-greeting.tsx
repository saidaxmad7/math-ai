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
    tagRu: string;
    tagEn: string;
    textUz: string;
    textRu: string;
    textEn: string;
    icon: typeof Sparkles;
};

const MATH_INSIGHTS: MathInsight[] = [
    {
        tagUz: '💡 Qiziqarli fakt',
        tagRu: '💡 Интересный факт',
        tagEn: '💡 Fun Fact',
        textUz: 'Al-Xorazmiy "Algebra" atamasini "Al-Jabr" (tiklash, tenglashtirish) so‘zidan kashf etgan. Siz buyuk allomalar vorisisiz!',
        textRu: 'Аль-Хорезми ввел термин «Алгебра» от слова «Аль-Джабр» (восполнение, уравнивание). Вы продолжатели великих ученых!',
        textEn: 'Al-Khwarizmi derived the term "Algebra" from "Al-Jabr" (restoration and balancing). You follow the steps of legends!',
        icon: Sparkles,
    },
    {
        tagUz: '🧠 Fikr & Layfxak',
        tagRu: '🧠 Мысль и Лайфхак',
        tagEn: '🧠 Brain Spark',
        textUz: 'Har bir yechilgan masala — miyangizda yangi neyron yo‘lini ochadi. Har kuni atigi 1 ta dars katta farq qiladi!',
        textRu: 'Каждая решенная задача создает новые нейронные связи в мозгу. Всего 1 урок в день ведет к мастерству!',
        textEn: 'Every solved equation builds new neural pathways in your brain. Just 1 lesson a day creates compound mastery!',
        icon: Brain,
    },
    {
        tagUz: '🚀 Ilhom',
        tagRu: '🚀 Вдохновение',
        tagEn: '🚀 Inspiration',
        textUz: 'Kvadrat tenglamani yechish — bu fazoga uchirilgan raketaning trayektoriyasini hisoblash bilan bir xil qudratga ega!',
        textRu: 'Решение квадратных уравнений лежит в основе расчета траекторий космических ракет!',
        textEn: 'Solving quadratic equations is the foundation for calculating rocket trajectories into space!',
        icon: Zap,
    },
    {
        tagUz: '🎯 Kunning qoidasi',
        tagRu: '🎯 Совет дня',
        tagEn: '🎯 Daily Tip',
        textUz: 'Xato qilishdan qo‘rqmang! Buyuk matematiklar yangi qonuniyatlarni aynan xatolarni tahlil qilish orqali topishgan.',
        textRu: 'Не бойтесь ошибок! Великие математики открывали фундаментальные законы, именно анализируя ошибки.',
        textEn: "Don't fear mistakes! The greatest mathematical laws were discovered by investigating surprising errors.",
        icon: Target,
    },
    {
        tagUz: '🌌 Koinot tili',
        tagRu: '🌌 Язык Вселенной',
        tagEn: '🌌 Universal Language',
        textUz: 'Galileo Galiley aytganidek: "Tabiat buyuk kitob bo‘lib, u faqat matematika tilida yozilgan".',
        textRu: 'Как говорил Галилео Галилей: «Книга природы написана на языке математики».',
        textEn: 'As Galileo Galilei said: "Nature is a vast book written in the language of mathematics."',
        icon: Sparkles,
    },
    {
        tagUz: '📐 Geometriya siri',
        tagRu: '📐 Секрет геометрии',
        tagEn: '📐 Geometry Secret',
        textUz: 'Pifagor teoremasi faqat uchburchak emas, balki 3D video o‘yinlar va kompyuter grafikasi fizikasining negizidir.',
        textRu: 'Теорема Пифагора — это не просто треугольник, а основа 3D-видеоигр, компьютерной графики и физики.',
        textEn: 'The Pythagorean theorem is the bedrock of 3D video game engines, physics simulations, and GPS navigation.',
        icon: Brain,
    },
    {
        tagUz: '⏳ Kichik odat',
        tagRu: '⏳ Сила привычки',
        tagEn: '⏳ Power of Habit',
        textUz: 'Kunda 15 daqiqa matematika — bir yilda 90 soatlik shaxsiy repetitor darsiga teng bilim beradi!',
        textRu: '15 минут математики в день за год дают знания, равные 90 часам занятий с репетитором!',
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
        const fallbackName =
            language === 'uz' ? 'O‘quvchi' : language === 'ru' ? 'Ученик' : 'Learner';
        const firstName = rawName.trim().split(' ')[0] || fallbackName;

        if (hour >= 5 && hour < 12) {
            return {
                title:
                    language === 'uz'
                        ? `Xayrli tong, ${firstName}! ☀️`
                        : language === 'ru'
                        ? `Доброе утро, ${firstName}! ☀️`
                        : `Good morning, ${firstName}! ☀️`,
                sub:
                    language === 'uz'
                        ? 'Bugungi kunni yangi matematik kashfiyotlar bilan boshlaymiz!'
                        : language === 'ru'
                        ? 'Начнем сегодняшний день с новых математических открытий!'
                        : 'Start your day with mathematical superpowers!',
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                title:
                    language === 'uz'
                        ? `Kuningiz unumli o‘tsin, ${firstName}! ⚡️`
                        : language === 'ru'
                        ? `Продуктивного дня, ${firstName}! ⚡️`
                        : `Productive afternoon, ${firstName}! ⚡️`,
                sub:
                    language === 'uz'
                        ? 'Miyani charxlash va misollar yechish uchun ajoyib vaqt!'
                        : language === 'ru'
                        ? 'Отличное время для тренировки ума и решения задач!'
                        : 'A fantastic time to sharpen your problem-solving skills!',
            };
        } else if (hour >= 18 && hour < 23) {
            return {
                title:
                    language === 'uz'
                        ? `Xayrli oqshom, ${firstName}! 🌆`
                        : language === 'ru'
                        ? `Добрый вечер, ${firstName}! 🌆`
                        : `Good evening, ${firstName}! 🌆`,
                sub:
                    language === 'uz'
                        ? 'Bugungi o‘rganganlaringizni mustahkamlab, AI bilan mashq qiling.'
                        : language === 'ru'
                        ? 'Закрепите сегодняшние успехи интерактивной практикой с AI.'
                        : 'Reinforce today’s achievements with interactive AI practice.',
            };
        } else {
            return {
                title:
                    language === 'uz'
                        ? `Tungi daho, ${firstName}! 🌌`
                        : language === 'ru'
                        ? `Ночной гений, ${firstName}! 🌌`
                        : `Night owl genius, ${firstName}! 🌌`,
                sub:
                    language === 'uz'
                        ? 'Tungi sokinlikda eng murakkab formulalar ham osonroq tushuniladi.'
                        : language === 'ru'
                        ? 'В ночной тишине даже самые сложные формулы становятся понятнее.'
                        : 'In the calm of the night, profound concepts become crystal clear.',
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

    const insightTag =
        language === 'uz'
            ? currentInsight.tagUz
            : language === 'ru'
            ? currentInsight.tagRu
            : currentInsight.tagEn;

    const insightText =
        language === 'uz'
            ? currentInsight.textUz
            : language === 'ru'
            ? currentInsight.textRu
            : currentInsight.textEn;

    const shuffleTooltip =
        language === 'uz'
            ? 'Yangi fikr / fakt olish'
            : language === 'ru'
            ? 'Получить другой факт / мысль'
            : 'Get another insight';

    const startLearningText =
        language === 'uz'
            ? 'Darsni boshlash'
            : language === 'ru'
            ? 'Начать обучение'
            : 'Start Learning';

    const aiTutorText =
        language === 'uz' ? 'AI Ustoz' : language === 'ru' ? 'AI Репетитор' : 'AI Tutor';

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
                                    {insightTag}
                                </span>
                            </div>
                            <p className='mt-0.5 text-xs sm:text-sm text-foreground/90 leading-relaxed'>
                                {insightText}
                            </p>
                        </div>
                        <button
                            type='button'
                            onClick={handleShuffleInsight}
                            className='flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95'
                            title={shuffleTooltip}
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
                            <span>{startLearningText}</span>
                            <ArrowRight className='size-4' />
                        </Button>
                    </Link>

                    <Link href='/dashboard/ai'>
                        <Button variant='outline' className='h-11 gap-2 rounded-2xl border-border/80 bg-background/80 px-4 text-xs sm:text-sm font-semibold shadow-2xs transition-all hover:bg-accent/60 hover:scale-[1.02]'>
                            <Sparkles className='size-4 text-primary' />
                            <span>{aiTutorText}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
