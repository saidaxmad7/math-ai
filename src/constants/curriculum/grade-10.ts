import { DifficultyLevel } from '@prisma/client';
import type { ParsedTopicInput } from '@/repositories/book.repository';

export const GRADE_10_ALGEBRA_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Haqiqiy sonlar va funksiyaning umumiy xossalari',
        description: 'Haqiqiy sonlar to\'plami, funksiyaning aniqlanish va qiymatlar sohasi, juft va toq funksiyalar.',
        theoryContent: `### Funksiya tushunchasi va xossalari

1. **Aniqlanish sohasi $D(f)$:** Funksiya ma'noga ega bo'ladigan barcha $x$ lar to'plami.
2. **Qiymatlar sohasi $E(f)$:** Funksiya qabul qilishi mumkin bo'lgan barcha $y$ lar to'plami.
3. **Juft va toq funksiyalar:**
   - Juft: $f(-x) = f(x)$, grafigi $Oy$ o'qiga nisbatan simmetrik (masalan, $y = x^2, y = \\cos x$).
   - Toq: $f(-x) = -f(x)$, grafigi koordinata boshiga nisbatan simmetrik (masalan, $y = x^3, y = \\sin x$).
4. **Davriy funksiya:** $f(x + T) = f(x)$ ($T > 0$ — eng kichik musbat davr).`,
        order: 1,
        workedExamples: [
            {
                title: 'Juft-toqlikni tekshirish',
                question: '$f(x) = x^4 - 2x^2$ funksiyaning juft yoki toqligini aniqlang.',
                solution: '$f(-x) = (-x)^4 - 2(-x)^2 = x^4 - 2x^2 = f(x)$. Funksiya juft.',
                ruleSummary: 'f(-x) = f(x) bo\'lsa juft funksiya.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = \\frac{1}{x - 3}$ funksiyaning aniqlanish sohasini toping.',
                options: ['A) x != 3', 'B) x > 3', 'C) x >= 3', 'D) R'],
                correctAnswer: 'A',
                correctCustomAnswer: 'x != 3',
                explanation: 'Kasr maxraji nolga teng bo\'la olmaydi: $x - 3 \\neq 0 \\Rightarrow x \\neq 3$.',
                hint: 'Maxraj nolga teng bo\'lmasligi shart.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Burchak va yoyning radian o\'lchovi',
        description: 'Gradus va radian o\'lchovlari orasidagi bog\'lanish, sonli aylanada nuqtalar.',
        theoryContent: `### Radian o'lchovi

1. **Radian ta'rifi:** Uzunligi aylana radiusiga teng bo'lgan yoyga tiralgan markaziy burchak $1$ radian deb ataladi.
2. **O'tish formulalari:**
   $$\\pi \\text{ rad} = 180^\\circ$$
   $$\\alpha^\\circ = \\frac{\\pi}{180^\\circ} \\cdot \\alpha \\text{ rad}$$
   $$\\alpha \\text{ rad} = \\frac{180^\\circ}{\\pi} \\cdot \\alpha$$
3. Muhim qiymatlar: $30^\\circ = \\frac{\\pi}{6}$, $45^\\circ = \\frac{\\pi}{4}$, $60^\\circ = \\frac{\\pi}{3}$, $90^\\circ = \\frac{\\pi}{2}$, $180^\\circ = \\pi$.`,
        order: 2,
        workedExamples: [
            {
                title: 'Gradusni radianga aylantirish',
                question: '$150^\\circ$ ni radianda ifodalang.',
                solution: '$150^\\circ = 150 \\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{6}$ rad.',
                ruleSummary: 'Gradusni pi/180 ga ko\'paytiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\frac{3\\pi}{4}$ radian necha gradusga teng?',
                options: ['A) 120°', 'B) 135°', 'C) 150°', 'D) 105°'],
                correctAnswer: 'B',
                correctCustomAnswer: '135',
                explanation: '$\\frac{3 \\cdot 180^\\circ}{4} = 3 \\cdot 45^\\circ = 135^\\circ$.',
                hint: 'pi o\'rniga 180° qo\'ying.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Asosiy trigonometrik funksiyalar va ayniyatlar',
        description: 'Sinus, kosinus, tangens, kotangens va ular orasidagi asosiy ayniyatlar.',
        theoryContent: `### Trigonometrik ayniyatlar

1. $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$
2. $\\text{tg } \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$, $\\text{ctg } \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$
3. $\\text{tg } \\alpha \\cdot \\text{ctg } \\alpha = 1$
4. $1 + \\text{tg}^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}$
5. $1 + \\text{ctg}^2 \\alpha = \\frac{1}{\\sin^2 \\alpha}$`,
        order: 3,
        workedExamples: [
            {
                title: 'Ayniyatni qo\'llash',
                question: 'Agar $\\sin \\alpha = \\frac{3}{5}$ va $\\frac{\\pi}{2} < \\alpha < \\pi$ bo\'lsa, $\\cos \\alpha$ ni toping.',
                solution: 'II chorakda $\\cos \\alpha < 0$. $\\cos \\alpha = -\\sqrt{1 - \\sin^2 \\alpha} = -\\sqrt{1 - 9/25} = -\\frac{4}{5}$.',
                ruleSummary: 'II chorakda kosinus manfiy.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$(1 - \\sin \\alpha)(1 + \\sin \\alpha)$ ifodani soddalashtiring.',
                options: ['A) \\cos^2 \\alpha', 'B) \\sin^2 \\alpha', 'C) 1', 'D) \\text{tg}^2 \\alpha'],
                correctAnswer: 'A',
                correctCustomAnswer: 'cos^2(alpha)',
                explanation: '$(1 - \\sin \\alpha)(1 + \\sin \\alpha) = 1 - \\sin^2 \\alpha = \\cos^2 \\alpha$.',
                hint: 'Kvadratlar ayirmasi va asosiy trigonometrik ayniyatni eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Keltirish formulalari',
        description: 'Koordinata choraklarida ishoralar va 90°, 180°, 270°, 360° orqali keltirish qoidalari.',
        theoryContent: `### Keltirish qoidasi (Mnemonik qoida)

1. **Nom o'zgarishi:** Agar argument $\\frac{\\pi}{2}$ yoki $\\frac{3\\pi}{2}$ karrali bo'lsa (vertikal o'q), funksiya o'zining kofunksiyasiga o'zgaradi ($\\sin \\leftrightarrow \\cos, \\text{tg } \\leftrightarrow \\text{ctg}$). Agar $\\pi, 2\\pi$ (gorizontal o'q) bo'lsa, nom o'zgarmaydi!
2. **Ishora:** Boshlang'ich funksiyaning keltirilayotgan chorakdagi ishorasi saqlanadi.
   - $\\sin(\\pi - \\alpha) = \\sin \\alpha$
   - $\\cos(\\pi - \\alpha) = -\\cos \\alpha$
   - $\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos \\alpha$`,
        order: 4,
        workedExamples: [
            {
                title: 'Keltirish formulasini qo\'llash',
                question: '$\\cos(120^\\circ)$ ni hisoblang.',
                solution: '$\\cos(120^\\circ) = \\cos(180^\\circ - 60^\\circ) = -\\cos(60^\\circ) = -\\frac{1}{2}$.',
                ruleSummary: 'II chorakda kosinus manfiy.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\sin(150^\\circ)$ ning qiymatini toping.',
                options: ['A) 1/2', 'B) -1/2', 'C) \\sqrt{3}/2', 'D) -\\sqrt{3}/2'],
                correctAnswer: 'A',
                correctCustomAnswer: '0.5',
                explanation: '$\\sin(150^\\circ) = \\sin(180^\\circ - 30^\\circ) = \\sin(30^\\circ) = 1/2$.',
                hint: 'II chorakda sinus musbat.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Qo\'shish va ikkilangan burchak formulalari',
        description: 'Burchaklar yig\'indisi va ayirmasi, ikkilangan burchak formulalari.',
        theoryContent: `### Qo'shish formulalari

1. $\\sin(\\alpha \\pm \\beta) = \\sin \\alpha \\cos \\beta \\pm \\cos \\alpha \\sin \\beta$
2. $\\cos(\\alpha \\pm \\beta) = \\cos \\alpha \\cos \\beta \\mp \\sin \\alpha \\sin \\beta$

### Ikkilangan burchak formulalari
1. $\\sin(2\\alpha) = 2\\sin \\alpha \\cos \\alpha$
2. $\\cos(2\\alpha) = \\cos^2 \\alpha - \\sin^2 \\alpha = 2\\cos^2 \\alpha - 1 = 1 - 2\\sin^2 \\alpha$`,
        order: 5,
        workedExamples: [
            {
                title: 'Ikkilangan burchak formulasi',
                question: 'Agar $\\sin \\alpha = \\frac{1}{2}$ va $\\cos \\alpha = \\frac{\\sqrt{3}}{2}$ bo\'lsa, $\\sin(2\\alpha)$ ni toping.',
                solution: '$\\sin(2\\alpha) = 2\\sin \\alpha \\cos \\alpha = 2 \\cdot \\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}$.',
                ruleSummary: 'sin(2a) = 2*sin(a)*cos(a).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\cos^2(15^\\circ) - \\sin^2(15^\\circ)$ ifodaning qiymatini toping.',
                options: ['A) 1/2', 'B) \\sqrt{3}/2', 'C) 1', 'D) \\sqrt{2}/2'],
                correctAnswer: 'B',
                correctCustomAnswer: 'sqrt(3)/2',
                explanation: '$\\cos(2 \\cdot 15^\\circ) = \\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}$.',
                hint: 'cos^2(a) - sin^2(a) = cos(2a) ekanini qo\'llang.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
    },
    {
        title: 'Trigonometrik tenglamalar',
        description: 'Sodda trigonometrik tenglamalar: sin x = a, cos x = a, tg x = a.',
        theoryContent: `### Sodda trigonometrik tenglamalar

1. $\\sin x = a$ ($|a| \\le 1$):
   $$x = (-1)^k \\arcsin a + \\pi k, \\quad k \\in \\mathbb{Z}$$
2. $\\cos x = a$ ($|a| \\le 1$):
   $$x = \\pm \\arccos a + 2\\pi k, \\quad k \\in \\mathbb{Z}$$
3. $\\text{tg } x = a$:
   $$x = \\text{arctg } a + \\pi k, \\quad k \\in \\mathbb{Z}$$`,
        order: 6,
        workedExamples: [
            {
                title: 'Kosinusli tenglama',
                question: '$\\cos x = 1$ tenglamaning yechimini toping.',
                solution: '$x = 2\\pi k, \\quad k \\in \\mathbb{Z}$.',
                ruleSummary: 'Kosinus 1 ga faqat 2*pi*k nuqtalarda teng bo\'ladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\sin x = 0$ tenglamaning yechimi qaysi?',
                options: ['A) x = pi*k', 'B) x = pi/2 + pi*k', 'C) x = 2*pi*k', 'D) x = pi/4 + pi*k'],
                correctAnswer: 'A',
                correctCustomAnswer: 'pi*k',
                explanation: 'Sinus nolga aylanadigan nuqtalar $x = \\pi k, k \\in \\mathbb{Z}$.',
                hint: 'Sonli aylanada sinus 0 bo\'ladigan gorizontal o\'q nuqtalari.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ratsional ko\'rsatkichli daraja',
        description: 'n-darajali ildiz xossalari, ratsional ko\'rsatkichli daraja ta\'rifi.',
        theoryContent: `### Ratsional ko'rsatkichli daraja

1. $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$ ($a > 0, m \\in \\mathbb{Z}, n \\in \\mathbb{N}, n > 1$).
2. Barcha daraja xossalari ratsional ko'rsatkichlar uchun ham to'liq o'rinlidir:
   - $a^p \\cdot a^q = a^{p+q}$
   - $(a^p)^q = a^{p \\cdot q}$
   - $(ab)^p = a^p b^p$`,
        order: 7,
        workedExamples: [
            {
                title: 'Ratsional darajani hisoblash',
                question: '$27^{2/3}$ ni hisoblang.',
                solution: '$27^{2/3} = (3^3)^{2/3} = 3^{3 \\cdot (2/3)} = 3^2 = 9$.',
                ruleSummary: '27 ni 3^3 shaklida yozib soddalashtiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$16^{3/4}$ ning qiymatini toping.',
                options: ['A) 4', 'B) 8', 'C) 12', 'D) 16'],
                correctAnswer: 'B',
                correctCustomAnswer: '8',
                explanation: '$16 = 2^4$. $(2^4)^{3/4} = 2^3 = 8$.',
                hint: '16 = 2^4 ekanligidan foydalaning.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ko\'rsatkichli funksiya va uning grafigi',
        description: 'y = a^x funksiya, uning monotonligi, aniqlanish va qiymatlar sohasi.',
        theoryContent: `### Ko'rsatkichli funksiya

$y = a^x$ ($a > 0, a \\neq 1$).
1. Aniqlanish sohasi: $D(f) = \\mathbb{R}$.
2. Qiymatlar sohasi: $E(f) = (0; +\\infty)$.
3. Monotonlik:
   - Agar $a > 1$ bo'lsa, funksiya butun sonlar o'qida qat'iy o'suvchi.
   - Agar $0 < a < 1$ bo'lsa, funksiya butun sonlar o'qida qat'iy kamayuvchi.
4. Har doim $(0; 1)$ nuqtadan o'tadi ($a^0 = 1$).`,
        order: 8,
        workedExamples: [
            {
                title: 'O\'sish va kamayishni aniqlash',
                question: '$y = (0.5)^x$ funksiya o\'suvchimi yoki kamayuvchimi?',
                solution: 'Asos $a = 0.5 < 1$ bo\'lgani sababli funksiya qat\'iy kamayuvchi.',
                ruleSummary: '0 < a < 1 bo\'lganda ko\'rsatkichli funksiya kamayadi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = 3^x$ funksiyaning qiymatlar sohasini toping.',
                options: ['A) [0; +\\infty)', 'B) (0; +\\infty)', 'C) R', 'D) [1; +\\infty)'],
                correctAnswer: 'B',
                correctCustomAnswer: '(0; +inf)',
                explanation: 'Ko\'rsatkichli ifoda har doim qat\'iy musbat qiymatlar qabul qiladi: $(0; +\\infty)$.',
                hint: 'Har qanday x uchun 3^x > 0 bo\'ladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ko\'rsatkichli tenglamalar va tengsizliklar',
        description: 'Bir xil asosga keltirish va yangi o\'zgaruvchi kiritish usullari.',
        theoryContent: `### Ko'rsatkichli tenglamalar va tengsizliklar

1. $a^{f(x)} = a^{g(x)} \\Leftrightarrow f(x) = g(x)$ ($a > 0, a \\neq 1$).
2. Tengsizliklar:
   - Agar $a > 1$ bo'lsa: $a^{f(x)} > a^{g(x)} \\Leftrightarrow f(x) > g(x)$ (ishora saqlanadi).
   - Agar $0 < a < 1$ bo'lsa: $a^{f(x)} > a^{g(x)} \\Leftrightarrow f(x) < g(x)$ (ishora teskarisiga o'zgaradi!).`,
        order: 9,
        workedExamples: [
            {
                title: 'Ko\'rsatkichli tenglama',
                question: '$2^{3x - 1} = 32$ tenglamani yeching.',
                solution: '$32 = 2^5$. $2^{3x - 1} = 2^5 \\Rightarrow 3x - 1 = 5 \\Rightarrow 3x = 6 \\Rightarrow x = 2$.',
                ruleSummary: 'Ikkala tomonni 2 asosga keltirib, darajalarni tenglashtiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$5^{x+2} = 125$ tenglamaning ildizini toping.',
                options: ['A) 1', 'B) 2', 'C) 3', 'D) 0'],
                correctAnswer: 'A',
                correctCustomAnswer: '1',
                explanation: '$125 = 5^3$. $x + 2 = 3 \\Rightarrow x = 1$.',
                hint: '125 = 5^3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Logarifm tushunchasi va asosiy xossalari',
        description: 'Logarifm ta\'rifi, o\'nli va natural logarifmlar, asosiy xossalar.',
        theoryContent: `### Logarifm

1. **Ta'rif:** $\\log_a b = c \\Leftrightarrow a^c = b$ ($a > 0, a \\neq 1, b > 0$).
2. **Asosiy logarifmik ayniyat:** $a^{\\log_a b} = b$.
3. **Xossalar:**
   - $\\log_a (xy) = \\log_a x + \\log_a y$
   - $\\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$
   - $\\log_a (x^p) = p \\log_a x$
   - Boshqa asosga o'tish: $\\log_a b = \\frac{\\log_c b}{\\log_c a}$`,
        order: 10,
        workedExamples: [
            {
                title: 'Logarifmni hisoblash',
                question: '$\\log_2 16 + \\log_3 9$ ni hisoblang.',
                solution: '$\\log_2 16 = 4$, chunki $2^4 = 16$. $\\log_3 9 = 2$, chunki $3^2 = 9$. Yig\'indi: $4 + 2 = 6$.',
                ruleSummary: 'Logarifm ta\'rifiga ko\'ra daraja ko\'rsatkichini topamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\log_5 125$ nechiga teng?',
                options: ['A) 2', 'B) 3', 'C) 5', 'D) 25'],
                correctAnswer: 'B',
                correctCustomAnswer: '3',
                explanation: '$5^3 = 125$, shuning uchun $\\log_5 125 = 3$.',
                hint: '5 ning qaysi darajasi 125 bo\'ladi?',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Logarifmik tenglamalar',
        description: 'Sodda logarifmik tenglamalar va ularni yechishda aniqlanish sohasini hisobga olish.',
        theoryContent: `### Logarifmik tenglamalar

1. $\\log_a f(x) = b \\Rightarrow f(x) = a^b$.
2. $\\log_a f(x) = \\log_a g(x) \\Leftrightarrow \\begin{cases} f(x) = g(x) \\\\ f(x) > 0 \\end{cases}$
3. **Muhim:** Chiqqan ildizlarni albatta boshlang'ich logarifmning aniqlanish sohasi ($f(x) > 0$) bo'yicha tekshirish shart!`,
        order: 11,
        workedExamples: [
            {
                title: 'Logarifmik tenglama',
                question: '$\\log_3 (2x - 1) = 2$ tenglamani yeching.',
                solution: '$2x - 1 = 3^2 = 9 \\Rightarrow 2x = 10 \\Rightarrow x = 5$. Tekshirish: $2(5) - 1 = 9 > 0$. Javob: $x = 5$.',
                ruleSummary: 'f(x) = a^b formulasidan foydalanib tekshiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\log_2(x + 3) = 4$ tenglamaning yechimini toping.',
                options: ['A) 11', 'B) 13', 'C) 15', 'D) 8'],
                correctAnswer: 'B',
                correctCustomAnswer: '13',
                explanation: '$x + 3 = 2^4 = 16 \\Rightarrow x = 16 - 3 = 13$.',
                hint: '2^4 = 16.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Logarifmik tengsizliklar',
        description: 'Logarifmik tengsizliklar va asosi 1 dan katta/kichik bo\'lgan hollar.',
        theoryContent: `### Logarifmik tengsizliklar

$\\log_a f(x) > \\log_a g(x)$:
1. Agar $a > 1$ bo'lsa:
   $$\\begin{cases} f(x) > g(x) \\\\ g(x) > 0 \\end{cases}$$
2. Agar $0 < a < 1$ bo'lsa:
   $$\\begin{cases} f(x) < g(x) \\\\ f(x) > 0 \\end{cases}$$ (ishora o'zgaradi!)`,
        order: 12,
        workedExamples: [
            {
                title: 'Asosi 1 dan kichik bo\'lgan logarifmik tengsizlik',
                question: '$\\log_{0.5}(x) > -1$ tengsizlikni yeching.',
                solution: '$0.5 < 1$ bo\'lgani uchun ishora o\'zgaradi: $x < (0.5)^{-1} = 2$. Aniqlanish sohasi: $x > 0$. Javob: $(0; 2)$.',
                ruleSummary: 'Asos 1 dan kichik bo\'lsa ishora teskarisiga o\'zgaradi va x > 0 sharti olinadi.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\log_3 x \\le 2$ tengsizlikning yechimi qaysi?',
                options: ['A) (0; 9]', 'B) [0; 9]', 'C) (-\\infty; 9]', 'D) (0; 6]'],
                correctAnswer: 'A',
                correctCustomAnswer: '(0; 9]',
                explanation: '$x \\le 3^2 = 9$ va aniqlanish sohasiga ko\'ra $x > 0$. Demak: $(0; 9]$.',
                hint: 'x > 0 ekanligini unutmang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];

export const GRADE_10_GEOMETRIYA_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Planimetriyani tizimli takrorlash',
        description: 'Tekislik geometriyasining asosiy teoremalari, burchaklar, uchburchaklar va to\'rtburchaklar.',
        theoryContent: `### Planimetriya asoslari

1. Uchburchak tengsizligi: $|a - b| < c < a + b$.
2. Kosinuslar teoremasi: $c^2 = a^2 + b^2 - 2ab \\cos \\gamma$.
3. Sinuslar teoremasi: $\\frac{a}{\\sin \\alpha} = \\frac{b}{\\sin \\beta} = \\frac{c}{\\sin \\gamma} = 2R$.`,
        order: 1,
        workedExamples: [
            {
                title: 'Kosinuslar teoremasi',
                question: 'Tomonlari $a=3, b=5$ va ular orasidagi burchak $60^\\circ$ bo\'lgan uchburchakning uchinchi tomonini toping.',
                solution: '$c^2 = 3^2 + 5^2 - 2 \\cdot 3 \\cdot 5 \\cos 60^\\circ = 9 + 25 - 30 \\cdot 0.5 = 34 - 15 = 19 \\Rightarrow c = \\sqrt{19}$.',
                ruleSummary: 'c^2 = a^2 + b^2 - 2ab*cos(C).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Teng tomonli uchburchakning tomoni $a = 6$ bo\'lsa, uning yuzini toping.',
                options: ['A) 9\\sqrt{3}', 'B) 18', 'C) 36\\sqrt{3}', 'D) 12'],
                correctAnswer: 'A',
                correctCustomAnswer: '9*sqrt(3)',
                explanation: '$S = \\frac{a^2\\sqrt{3}}{4} = \\frac{36\\sqrt{3}}{4} = 9\\sqrt{3}$.',
                hint: 'S = a^2 * sqrt(3) / 4.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Stereometriyaning asosiy tushunchalari va aksiomalari',
        description: 'Nuqta, to\'g\'ri chiziq, tekislik va stereometriyaning uchta asosiy aksiomasi.',
        theoryContent: `### Stereometriya aksiomalari

1. **Aksioma 1 ($C_1$):** Bir to'g'ri chiziqda yotmagan ixtiyoriy uchta nuqta orqali faqat bitta tekislik o'tadi.
2. **Aksioma 2 ($C_2$):** Agar to'g'ri chiziqning ikki nuqtasi tekislikda yotsa, bu to'g'ri chiziqning barcha nuqtalari shu tekislikda yotadi.
3. **Aksioma 3 ($C_3$):** Agar ikki turli tekislik umumiy nuqtaga ega bo'lsa, ular shu nuqtadan o'tuvchi to'g'ri chiziq bo'yicha kesishadi.`,
        order: 2,
        workedExamples: [
            {
                title: 'Tekislikni aniqlash',
                question: 'Fazoda nechta nuqta orqali yagona tekislik o\'tkazish mumkin?',
                solution: 'Bir to\'g\'ri chiziqda yotmagan 3 ta nuqta orqali yagona tekislik o\'tadi.',
                ruleSummary: 'Stereometriyaning 1-aksiomasi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Ikki tekislik kesishganda nima hosil bo\'ladi?',
                options: ['A) Nuqta', 'B) To\'g\'ri chiziq', 'C) Kesma', 'D) Burchak'],
                correctAnswer: 'B',
                correctCustomAnswer: 'To\'g\'ri chiziq',
                explanation: 'Aksioma 3 ga ko\'ra ikki tekislik to\'g\'ri chiziq bo\'yicha kesishadi.',
                hint: 'Kitobning 3-aksiomasini eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda to\'g\'ri chiziqlarning o\'zaro joylashuvi. Ayqash to\'g\'ri chiziqlar',
        description: 'Parallel, kesishuvchi va ayqash to\'g\'ri chiziqlar, ayqashlik alomati.',
        theoryContent: `### Fazoda to'g'ri chiziqlar

1. **Kesishuvchi:** Bitta tekislikda yotadi va 1 ta umumiy nuqtaga ega.
2. **Parallel:** Bitta tekislikda yotadi va umumiy nuqtaga ega emas ($a \\parallel b$).
3. **Ayqash to'g'ri chiziqlar:** Bitta tekislikda yotmaydigan va umumiy nuqtaga ega bo'lmagan to'g'ri chiziqlar.
   - **Ayqashlik alomati:** Agar to'g'ri chiziqlardan biri tekislikda yotsa, ikkinchisi bu tekislikni birinchi to'g'ri chiziqda yotmagan nuqtada kesib o'tsa, bu to'g'ri chiziqlar ayqashdir.`,
        order: 3,
        workedExamples: [
            {
                title: 'Ayqash to\'g\'ri chiziqlarni aniqlash',
                question: 'Kubning qarama-qarshi qirralarining o\'zaro joylashuvini aniqlang.',
                solution: 'Ular turli tekisliklarda yotadi va kesishmaydi, demak ular ayqash to\'g\'ri chiziqlardir.',
                ruleSummary: 'Bir tekislikda yotmagan to\'g\'ri chiziqlar ayqash deyiladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Bitta tekislikda yotmaydigan to\'g\'ri chiziqlar nima deb ataladi?',
                options: ['A) Parallel', 'B) Ayqash', 'C) Perpendikulyar', 'D) Kesishuvchi'],
                correctAnswer: 'B',
                correctCustomAnswer: 'Ayqash',
                explanation: 'Ta\'rifga ko\'ra bitta tekislikda yotmaydigan to\'g\'ri chiziqlar ayqash to\'g\'ri chiziqlar deyiladi.',
                hint: 'Fazoda tekislikdan tashqariga chiqadigan chiziqlar.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda to\'g\'ri chiziq va tekislikning parallelligi',
        description: 'To\'g\'ri chiziq va tekislikning parallel bo\'lish alomati va xossalari.',
        theoryContent: `### To'g'ri chiziq va tekislik parallelligi

1. **Alomat:** Agar berilgan to'g'ri chiziq tekislikda yotuvchi biror to'g'ri chiziqqa parallel bo'lsa, u holda bu to'g'ri chiziq tekislikning o'ziga ham paralleldir:
   $$a \\parallel b, \\quad b \\subset \\alpha \\Rightarrow a \\parallel \\alpha$$`,
        order: 4,
        workedExamples: [
            {
                title: 'Parallellik alomatini qo\'llash',
                question: 'Trapetsiyaning o\'rta chiziqi uning asosi orqali o\'tgan tekislikka parallel bo\'ladimi?',
                solution: 'Ha, chunki o\'rta chiziq asosga parallel va asos tekislikda yotadi.',
                ruleSummary: 'Chiziq tekislikdagi chiziqqa parallel bo\'lsa, tekislikka ham parallel bo\'ladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'To\'g\'ri chiziq tekislikka parallel bo\'lishi uchun uning qanday shartni qanoatlantirishi yetarli?',
                options: ['A) Tekislikdagi biror to\'g\'ri chiziqqa parallel bo\'lishi', 'B) Tekislikka perpendikulyar bo\'lishi', 'C) Tekislikni kesib o\'tishi', 'D) Ikkita tekislikda yotishi'],
                correctAnswer: 'A',
                correctCustomAnswer: 'A',
                explanation: 'Alomatga binoan, tekislikdagi bitta to\'g\'ri chiziqqa parallel bo\'lsa yetarli.',
                hint: 'To\'g\'ri chiziq va tekislik parallellik alomatini eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda tekisliklarning o\'zaro parallelligi',
        description: 'Parallel tekisliklar alomati va parallel tekisliklar orasidagi masofa.',
        theoryContent: `### Parallel tekisliklar

1. **Alomat:** Agar bir tekislikdagi kesishuvchi ikki to'g'ri chiziq ikkinchi tekislikdagi kesishuvchi ikki to'g'ri chiziqqa mos ravishda parallel bo'lsa, bu tekisliklar o'zaro paralleldir:
   $$a_1 \\parallel a_2, \\; b_1 \\parallel b_2 \\Rightarrow \\alpha \\parallel \\beta$$
2. **Xossa:** Parallel tekisliklarni uchinchi tekislik bilan kesganda hosil bo'lgan to'g'ri chiziqlar o'zaro parallel bo'ladi.`,
        order: 5,
        workedExamples: [
            {
                title: 'Parallel tekisliklar xossasi',
                question: 'Prizmaning asoslari tekisliklari o\'zaro qanday joylashgan?',
                solution: 'To\'g\'ri prizmaning yuqori va pastki asoslari parallel tekisliklarda yotadi.',
                ruleSummary: 'Prizma asoslari parallel tekisliklardir.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Parallel tekisliklarning umumiy nuqtalari soni nechta?',
                options: ['A) 0 ta', 'B) 1 ta', 'C) Cheksiz ko\'p', 'D) 2 ta'],
                correctAnswer: 'A',
                correctCustomAnswer: '0 ta',
                explanation: 'Parallel tekisliklar ta\'rifga ko\'ra hech qanday umumiy nuqtaga ega emas.',
                hint: 'Parallel shakllar kesishmaydi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoviy geometrik shakllar va ko\'pyoqlar',
        description: 'Prizma, piramida, muntazam ko\'pyoqlar va ularning sodda kesimlarini yasash.',
        theoryContent: `### Ko'pyoqlar

1. **Prizma:** Ikki asosi teng va parallel ko'pburchaklar, yon yoqlari parallelogrammlar bo'lgan ko'pyoq.
   - To'g'ri prizma: Yon qirralari asosiga perpendikulyar.
2. **Piramida:** Asosi ko'pburchak, qolgan yoqlari umumiy uchga ega bo'lgan uchburchaklardan iborat ko'pyoq.
3. **Eyler formulasi (Qavariq ko'pyoqlar uchun):**
   $$V - E + F = 2$$
   ($V$ — uchlar, $E$ — qirralar, $F$ — yoqlar soni).`,
        order: 6,
        workedExamples: [
            {
                title: 'Eyler formulasini tekshirish',
                question: 'Kub uchun Eyler formulasini tekshiring.',
                solution: 'Kubda: $V = 8$ ta uch, $E = 12$ ta qirra, $F = 6$ ta yoq. $8 - 12 + 6 = 2$. Formula to\'g\'ri.',
                ruleSummary: 'V - E + F = 2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Oltiburchakli prizmaning nechta yoqi bor?',
                options: ['A) 6 ta', 'B) 7 ta', 'C) 8 ta', 'D) 12 ta'],
                correctAnswer: 'C',
                correctCustomAnswer: '8 ta',
                explanation: '6 ta yon yoq + 2 ta asos = 8 ta yoq.',
                hint: 'n-burchakli prizmada yoqlar soni n + 2 ga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda to\'g\'ri chiziq va tekislikning perpendikulyarligi',
        description: 'To\'g\'ri chiziq va tekislik perpendikulyarligi alomati va xossalari.',
        theoryContent: `### To'g'ri chiziq va tekislik perpendikulyarligi

1. **Ta'rif:** Agar to'g'ri chiziq tekislikda yotuvchi barcha to'g'ri chiziqlarga perpendikulyar bo'lsa, u tekislikka perpendikulyar deyiladi ($a \\perp \\alpha$).
2. **Alomat:** Agar to'g'ri chiziq tekislikdagi kesishuvchi ikki to'g'ri chiziqqa perpendikulyar bo'lsa, u bu tekislikka perpendikulyar bo'ladi:
   $$a \\perp b, \\; a \\perp c \\; (b \\cap c) \\Rightarrow a \\perp \\alpha$$`,
        order: 7,
        workedExamples: [
            {
                title: 'Perpendikulyarlik alomati',
                question: 'To\'g\'ri burchakli uchburchakning katetlari orqali o\'tgan tekislikka uning to\'g\'ri burchagidan tushirilgan perpendikulyar haqida nima deyish mumkin?',
                solution: 'U ikkala katetga perpendikulyar bo\'lgani uchun uchburchak tekisligiga ham perpendikulyar bo\'ladi.',
                ruleSummary: 'Ikkita kesishuvchi to\'g\'ri chiziqqa perpendikulyar bo\'lsa, tekislikka perpendikulyar.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'To\'g\'ri chiziq tekislikka perpendikulyar bo\'lishi uchun u tekislikdagi nechta kesishuvchi chiziqqa perpendikulyar bo\'lishi kerak?',
                options: ['A) 1 ta', 'B) 2 ta', 'C) 3 ta', 'D) 4 ta'],
                correctAnswer: 'B',
                correctCustomAnswer: '2 ta',
                explanation: 'Alomatga ko\'ra 2 ta kesishuvchi to\'g\'ri chiziqqa perpendikulyar bo\'lishi kifoya.',
                hint: 'Alomatni eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Perpendikulyar, og\'ma va ularning proyeksiyalari',
        description: 'Tekislikka tushirilgan perpendikulyar, og\'ma uzunligi va proyeksiya xossalari.',
        theoryContent: `### Perpendikulyar va og'ma

Fazodagi $A$ nuqtadan $\\alpha$ tekislikka:
1. $AB \\perp \\alpha$ — perpendikulyar ($B$ — asos).
2. $AC$ — og'ma ($C$ — og'maning asosi).
3. $BC$ — og'maning tekislikdagi proyeksiyasi.
4. To'g'ri burchakli uchburchak $\\triangle ABC$ hosil bo'ladi:
   $$AC^2 = AB^2 + BC^2$$
5. Perpendikulyar har doim har qanday og'madan qisqa bo'ladi: $AB < AC$.`,
        order: 8,
        workedExamples: [
            {
                title: 'Og\'mani hisoblash',
                question: 'Perpendikulyar $AB = 4$ cm, proyeksiya $BC = 3$ cm bo\'lsa, og\'ma $AC$ ni toping.',
                solution: '$AC = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ cm.',
                ruleSummary: 'Pifagor teoremasi bo\'yicha AC = sqrt(AB^2 + BC^2).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Tekislikdan 12 cm masofadagi nuqtadan o\'tkazilgan og\'maning proyeksiyasi 5 cm bo\'lsa, og\'maning uzunligini toping.',
                options: ['A) 13 cm', 'B) 14 cm', 'C) 15 cm', 'D) 17 cm'],
                correctAnswer: 'A',
                correctCustomAnswer: '13',
                explanation: '$\\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13$ cm.',
                hint: 'Gipotenuza formulasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Uch perpendikulyar haqidagi teorema',
        description: 'Uch perpendikulyar teoremasi (to\'g\'ri va teskari teoremalar) va ularning masalalarga tatbiqi.',
        theoryContent: `### Uch perpendikulyar haqidagi teorema

1. **To'g'ri teorema:** Tekislikda yotuvchi to'g'ri chiziq og'maning proyeksiyasiga perpendikulyar bo'lsa, u og'maning o'ziga ham perpendikulyar bo'ladi:
   $$c \\subset \\alpha, \\quad c \\perp BC \\Rightarrow c \\perp AC$$
2. **Teskari teorema:** Tekislikda yotuvchi to'g'ri chiziq og'maga perpendikulyar bo'lsa, u og'maning proyeksiyasiga ham perpendikulyar bo'ladi:
   $$c \\subset \\alpha, \\quad c \\perp AC \\Rightarrow c \\perp BC$$`,
        order: 9,
        workedExamples: [
            {
                title: 'Teoremani qo\'llash',
                question: 'Kvadrat tekisligiga uning uchidan perpendikulyar chiqarilgan. Uch perpendikulyar teoremasi orqali qaysi burchaklar to\'g\'ri burchak bo\'ladi?',
                solution: 'Kvadrat tomoni proyeksiyaga perpendikulyar bo\'lgani uchun og\'maga ham perpendikulyar bo\'ladi.',
                ruleSummary: 'Uch perpendikulyar teoremasi fazoda to\'g\'ri burchaklarni aniqlashda asosiy quroldir.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Uch perpendikulyar haqidagi teorema qaysi elementlar orasidagi bog\'lanishni ifodalaydi?',
                options: ['A) Tekislikdagi to\'g\'ri chiziq, og\'ma va uning proyeksiyasi', 'B) Uchta parallel to\'g\'ri chiziq', 'C) Uchta kesishuvchi tekislik', 'D) Uchburchakning uchta medianasi'],
                correctAnswer: 'A',
                correctCustomAnswer: 'A',
                explanation: 'Teorema tekislikdagi chiziq, og\'ma va uning proyeksiyasining o\'zaro perpendikulyarligini ifodalaydi.',
                hint: 'Teorema ta\'rifini eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda tekisliklarning perpendikulyarligi. Ikki yoqli burchak',
        description: 'Ikki yoqli burchak va uning chiziqli burchagi, perpendikulyar tekisliklar alomati.',
        theoryContent: `### Ikki yoqli burchak

1. **Ikki yoqli burchak:** Bitta to'g'ri chiziq (qirra) bilan chegaralangan ikkita yarim tekislikdan (yoqlar) tashkil topgan figura.
2. **Chiziqli burchak:** Qirraning ixtiyoriy nuqtasidan har ikkala yoqda qirraga chiqarilgan perpendikulyarlar orasidagi burchak.
3. **Perpendikulyar tekisliklar:** Chiziqli burchagi $90^\\circ$ bo'lgan tekisliklar.
4. **Alomat:** Agar bir tekislik ikkinchi tekislikka perpendikulyar to'g'ri chiziq orqali o'tsa, bu tekisliklar perpendikulyardir.`,
        order: 10,
        workedExamples: [
            {
                title: 'Chiziqli burchak',
                question: 'Ikki yoqli burchak $60^\\circ$. Uning chiziqli burchagi qancha?',
                solution: 'Ikki yoqli burchakning kattaligi uning chiziqli burchagi kattaligiga teng, ya\'ni $60^\\circ$.',
                ruleSummary: 'Ikki yoqli burchak chiziqli burchak bilan o\'lchanadi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'O\'zaro perpendikulyar tekisliklarning chiziqli burchagi necha gradus bo\'ladi?',
                options: ['A) 45°', 'B) 60°', 'C) 90°', 'D) 180°'],
                correctAnswer: 'C',
                correctCustomAnswer: '90',
                explanation: 'Perpendikulyar tekisliklar orasidagi burchak 90 gradusga teng.',
                hint: 'Perpendikulyarlik ta\'rifini eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda to\'g\'ri chiziq va tekislik orasidagi burchak',
        description: 'To\'g\'ri chiziq va uning tekislikdagi proyeksiyasi orasidagi burchak.',
        theoryContent: `### Chiziq va tekislik orasidagi burchak

1. **Ta'rif:** Tekislikni kesib o'tuvchi va unga perpendikulyar bo'lmagan to'g'ri chiziq bilan uning tekislikdagi proyeksiyasi orasidagi burchak to'g'ri chiziq va tekislik orasidagi burchak deb ataladi.
2. Burchak oralig'i: $0^\\circ \\le \\varphi \\le 90^\\circ$.
   - Agar chiziq tekislikka parallel bo'lsa: $\\varphi = 0^\\circ$.
   - Agar chiziq tekislikka perpendikulyar bo'lsa: $\\varphi = 90^\\circ$.`,
        order: 11,
        workedExamples: [
            {
                title: 'Burchakni hisoblash',
                question: 'Og\'ma $AC = 10$ cm, uning tekislikdagi proyeksiyasi $BC = 5$ cm. Og\'ma va tekislik orasidagi burchakni toping.',
                solution: '$\\cos \\varphi = \\frac{BC}{AC} = \\frac{5}{10} = \\frac{1}{2} \\Rightarrow \\varphi = 60^\\circ$.',
                ruleSummary: 'cos(phi) = proyeksiya / og\'ma.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Og\'ma tekislik bilan $45^\\circ$ li burchak hosil qiladi. Agar perpendikulyar 6 cm bo\'lsa, uning proyeksiyasi qancha?',
                options: ['A) 6 cm', 'B) 6\\sqrt{2} cm', 'C) 3 cm', 'D) 12 cm'],
                correctAnswer: 'A',
                correctCustomAnswer: '6',
                explanation: 'Burchak $45^\\circ$ bo\'lsa, to\'g\'ri burchakli teng yonli uchburchak hosil bo\'ladi, demak proyeksiya = perpendikulyar = 6 cm.',
                hint: '45-45-90 to\'g\'ri burchakli uchburchak xossasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ortogonal proyeksiya va ko\'pyoqlar yuzini proyeksiyalash',
        description: 'Ortogonal proyeksiyalash xossalari va ko\'pburchak yuzi proyeksiyasi formulasi.',
        theoryContent: `### Ortogonal proyeksiya

1. **Tekis shaklning proyeksiyasi yuzi:** Agar tekis ko'pburchak $\\alpha$ tekislik bilan $\\varphi$ burchak hosil qilsa, uning $\\alpha$ dagi ortogonal proyeksiyasining yuzi:
   $$S_{\\text{proyeksiya}} = S \\cdot \\cos \\varphi$$
   bu yerda $S$ — ko'pburchakning o'z yuzi, $\\varphi$ — ko'pburchak tekisligi va proyeksiya tekisligi orasidagi burchak.`,
        order: 12,
        workedExamples: [
            {
                title: 'Proyeksiyalash formulasini qo\'llash',
                question: 'Yuzi $S = 40 \\text{ cm}^2$ bo\'lgan ko\'pburchak tekislik bilan $60^\\circ$ li burchak hosil qiladi. Uning proyeksiyasining yuzini toping.',
                solution: '$S_{\\text{proyeksiya}} = 40 \\cdot \\cos 60^\\circ = 40 \\cdot 0.5 = 20 \\text{ cm}^2$.',
                ruleSummary: 'S_proy = S * cos(phi).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Yuzi 50 bo\'lgan shakl tekislik bilan 0° burchak hosil qilsa, proyeksiyasining yuzi nechiga teng bo\'ladi?',
                options: ['A) 0', 'B) 25', 'C) 50', 'D) 100'],
                correctAnswer: 'C',
                correctCustomAnswer: '50',
                explanation: '$\\cos(0^\\circ) = 1$, shuning uchun $S_{\\text{proyeksiya}} = 50 \\cdot 1 = 50$.',
                hint: 'Parallel tekisliklarda yuz o\'zgarmaydi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];
