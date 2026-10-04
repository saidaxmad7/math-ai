import { DifficultyLevel } from '@prisma/client';
import type { ParsedTopicInput } from '@/repositories/book.repository';

export const GRADE_11_PART1_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Ketma-ketlik va funksiya limiti',
        description: 'Cheksiz kichik va cheksiz katta miqdorlar, limitning ta\'rifi va xossalari.',
        theoryContent: `### Funksiya limiti

1. **Ta'rif:** Agar $x \\to a$ da $f(x)$ qiymatlari $A$ soniga cheksiz yaqinlashsa, $A$ soni $f(x)$ funksiyaning $x \\to a$ dagi limiti deyiladi:
   $$\\lim_{x \\to a} f(x) = A$$
2. **Asosiy qoidalar:**
   - $\\lim (f(x) \\pm g(x)) = \\lim f(x) \\pm \\lim g(x)$
   - $\\lim (f(x) \\cdot g(x)) = \\lim f(x) \\cdot \\lim g(x)$
   - $\\lim \\frac{f(x)}{g(x)} = \\frac{\\lim f(x)}{\\lim g(x)}$ (agar $\\lim g(x) \\neq 0$)
3. **Birinchi ajoyib limit:**
   $$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$`,
        order: 1,
        workedExamples: [
            {
                title: 'Limitni hisoblash',
                question: '$\\lim_{x \\to 2} (3x^2 - 4x + 1)$ ni hisoblang.',
                solution: '$x = 2$ ni to\'g\'ridan-to\'g\'ri qo\'yamiz: $3(2^2) - 4(2) + 1 = 12 - 8 + 1 = 5$.',
                ruleSummary: 'Ko\'phadlar uchun limit qiymatni to\'g\'ridan-to\'g\'ri qo\'yish orqali hisoblanadi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ ning qiymatini toping.',
                options: ['A) 0', 'B) 3', 'C) 6', 'D) 9'],
                correctAnswer: 'C',
                correctCustomAnswer: '6',
                explanation: '$\\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3$. $x \\to 3$ da: $3 + 3 = 6$.',
                hint: 'Suratni kvadratlar ayirmasi formulasi bilan ko\'paytuvchilarga ajrating.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Funksiya hosilasi tushunchasi va hosila jadvali',
        description: 'Hosilaning ta\'rifi, orttirmalar nisbati va asosiy elementar funksiyalar hosilalari.',
        theoryContent: `### Funksiya hosilasi

1. **Ta'rif:**
   $$f'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}$$
2. **Asosiy hosilalar:**
   - $(C)' = 0$
   - $(x^n)' = n x^{n-1}$
   - $(\\sin x)' = \\cos x$
   - $(\\cos x)' = -\\sin x$
   - $(e^x)' = e^x$
   - $(\\ln x)' = \\frac{1}{x}$`,
        order: 2,
        workedExamples: [
            {
                title: 'Hosila hisoblash',
                question: '$f(x) = x^4 - 3x^2 + 5$ ning hosilasini toping.',
                solution: '$f\'(x) = (x^4)\' - 3(x^2)\' + (5)\' = 4x^3 - 3(2x) + 0 = 4x^3 - 6x$.',
                ruleSummary: '(x^n)\' = n*x^(n-1).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = x^5$ funksiyaning hosilasini toping.',
                options: ['A) 5x^4', 'B) x^4', 'C) 5x^5', 'D) 4x^5'],
                correctAnswer: 'A',
                correctCustomAnswer: '5x^4',
                explanation: '$(x^5)\' = 5x^{5-1} = 5x^4$.',
                hint: 'Daraja qoidasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Differensiallash qoidalari va murakkab funksiya hosilasi',
        description: 'Yig\'indi, ko\'paytma, bo\'linma va murakkab funksiyalarni differensiallash qoidalari.',
        theoryContent: `### Differensiallash qoidalari

1. $(u \\pm v)' = u' \\pm v'$
2. $(u \\cdot v)' = u'v + uv'$
3. $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$ ($v \\neq 0$)
4. **Murakkab funksiya:**
   $$(f(g(x)))' = f'(g(x)) \\cdot g'(x)$$`,
        order: 3,
        workedExamples: [
            {
                title: 'Murakkab funksiya hosilasi',
                question: '$y = \\sin(3x)$ ning hosilasini toping.',
                solution: '$y\' = \\cos(3x) \\cdot (3x)\' = 3\\cos(3x)$.',
                ruleSummary: 'Tashqi va ichki funksiyalar hosilalarini ko\'paytiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = (2x + 1)^3$ funksiyaning hosilasi qaysi?',
                options: ['A) 3(2x+1)^2', 'B) 6(2x+1)^2', 'C) 2(2x+1)^2', 'D) 6x(2x+1)'],
                correctAnswer: 'B',
                correctCustomAnswer: '6*(2x+1)^2',
                explanation: '$y\' = 3(2x+1)^2 \\cdot (2x+1)\' = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$.',
                hint: 'Ichki funksiya hosilasi (2x+1)\' = 2 ni ko\'paytirishni unutmang.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
    },
    {
        title: 'Hosilaning geometrik va fizik ma\'nosi. Urinma tenglamasi',
        description: 'Hosilaning burchak koeffitsiyenti sifatidagi talqini, urinma tenglamasi, tezlik va tezlanish.',
        theoryContent: `### Urinma tenglamasi

1. **Geometrik ma'no:** $f'(x_0) = k = \\text{tg } \\alpha$ — funksiya grafigiga $x_0$ nuqtada o'tkazilgan urinmaning burchak koeffitsiyenti.
2. **Urinma tenglamasi:**
   $$y = f(x_0) + f'(x_0)(x - x_0)$$
3. **Fizik ma'no:** Harakat qonuni $s(t)$ bo'lsa:
   - Tezlik: $v(t) = s'(t)$
   - Tezlanish: $a(t) = v'(t) = s''(t)$`,
        order: 4,
        workedExamples: [
            {
                title: 'Urinma burchak koeffitsiyenti',
                question: '$y = x^2$ grafigiga $x_0 = 3$ nuqtada o\'tkazilgan urinmaning burchak koeffitsiyentini toping.',
                solution: '$y\' = 2x$. $k = y\'(3) = 2 \\cdot 3 = 6$.',
                ruleSummary: 'k = f\'(x_0).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$s(t) = 3t^2 + 2t$ qonun bo\'yicha harakatlanayotgan jismning $t = 2$ vaqtdagi tezligini toping.',
                options: ['A) 12', 'B) 14', 'C) 16', 'D) 10'],
                correctAnswer: 'B',
                correctCustomAnswer: '14',
                explanation: '$v(t) = s\'(t) = 6t + 2$. $v(2) = 6(2) + 2 = 14$.',
                hint: 'Harakat tenglamasidan hosila oling.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Funksiyaning o\'sish va kamayish oraliqlari hamda ekstremumlari',
        description: 'Monotonlik oraliqlari, statsionar nuqtalar, maksimum va minimum shartlari.',
        theoryContent: `### Ekstremumlar

1. **O'sish va kamayish:**
   - $f'(x) > 0$ bo'lgan oraliqda funksiya o'sadi.
   - $f'(x) < 0$ bo'lgan oraliqda funksiya kamayadi.
2. **Ferma teoremasi:** Agar $x_0$ ekstremum nuqtasi bo'lsa, $f'(x_0) = 0$ (yoki mavjud emas).
3. **Ekstremum yetarli sharti:**
   - $f'(x)$ ishorasi $+$ dan $-$ ga o'zgarsa: maksimum nuqta ($x_{\\max}$).
   - $f'(x)$ ishorasi $-$ dan $+$ ga o'zgarsa: minimum nuqta ($x_{\\min}$).`,
        order: 5,
        workedExamples: [
            {
                title: 'Ekstremumni topish',
                question: '$y = x^2 - 6x + 8$ funksiyaning minimum nuqtasini toping.',
                solution: '$y\' = 2x - 6 = 0 \\Rightarrow 2x = 6 \\Rightarrow x = 3$. Demak, $x_{\\min} = 3$.',
                ruleSummary: 'Hosilani nolga tenglashtirib statsionar nuqtani topamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$f(x) = 2x^3 - 6x$ funksiyaning statsionar nuqtalarini toping.',
                options: ['A) x = 0', 'B) x = 1 va x = -1', 'C) x = 2 va x = -2', 'D) x = 3'],
                correctAnswer: 'B',
                correctCustomAnswer: '+-1',
                explanation: '$f\'(x) = 6x^2 - 6 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.',
                hint: 'f\'(x) = 0 tenglamani yeching.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Funksiyaning eng katta va eng kichik qiymatlarini topish',
        description: 'Kesmadagi eng katta va eng kichik qiymatlar, optimallashtirish masalalari.',
        theoryContent: `### Kesmada eng katta va eng kichik qiymat

$f(x)$ funksiyaning $[a; b]$ kesmadagi eng katta va eng kichik qiymatini topish:
1. Kesma ichidagi statsionar nuqtalar topiladi ($f'(x) = 0$).
2. Funksiyaning ushbu nuqtalardagi va kesmaning chetki nuqtalaridagi ($f(a), f(b)$) qiymatlari hisoblanadi.
3. Hisoblangan qiymatlarning eng kattasi va eng kichigi tanlanadi.`,
        order: 6,
        workedExamples: [
            {
                title: 'Eng katta qiymatni topish',
                question: '$f(x) = x^2 - 4x + 5$ ning $[0; 3]$ kesmadagi eng katta qiymatini toping.',
                solution: '$f\'(x) = 2x - 4 = 0 \\Rightarrow x = 2 \\in [0; 3]$. $f(0) = 5, f(2) = 1, f(3) = 2$. Eng katta qiymat: $5$.',
                ruleSummary: 'Statsionar va chetki nuqtalardagi qiymatlarni solishtiramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = 3 - x^2$ funksiyaning butun sonlar o\'qidagi eng katta qiymatini toping.',
                options: ['A) 0', 'B) 3', 'C) 9', 'D) Mavjud emas'],
                correctAnswer: 'B',
                correctCustomAnswer: '3',
                explanation: '$x^2 \\ge 0$ bo\'lgani uchun $3 - x^2 \\le 3$. Eng katta qiymat $x=0$ da 3 ga teng.',
                hint: 'x=0 da qiymat maksimal bo\'ladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda to\'g\'ri burchakli koordinatalar sistemasi',
        description: 'Fazoda koordinata o\'qlari (Ox, Oy, Oz), nuqta koordinatalari, simmetriya.',
        theoryContent: `### Fazoda koordinatalar

1. Har bir nuqta uchta koordinata bilan aniqlanadi: $M(x; y; z)$.
2. Koordinata tekisliklari: $Oxy$ ($z = 0$), $Oxz$ ($y = 0$), $Oyz$ ($x = 0$).
3. Koordinata boshiga nisbatan simmetrik nuqta: $M(-x; -y; -z)$.`,
        order: 7,
        workedExamples: [
            {
                title: 'Nuqtaning proyeksiyasi',
                question: '$A(3; -2; 5)$ nuqtaning $Oxy$ tekisligidagi proyeksiyasini toping.',
                solution: '$Oxy$ tekisligida $z = 0$, demak proyeksiya $A\'(3; -2; 0)$.',
                ruleSummary: 'Oxy tekisligida z koordinata 0 ga teng bo\'ladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$B(1; 4; -3)$ nuqtaning $Ox$ o\'qidagi proyeksiyasi qaysi?',
                options: ['A) (1; 0; 0)', 'B) (0; 4; 0)', 'C) (0; 0; -3)', 'D) (1; 4; 0)'],
                correctAnswer: 'A',
                correctCustomAnswer: '(1; 0; 0)',
                explanation: 'Ox o\'qida y = 0 va z = 0 bo\'ladi: (1; 0; 0).',
                hint: 'Ox o\'qidagi nuqtalarning y va z lari nolga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda ikki nuqta orasidagi masofa va kesmani bo\'lish',
        description: 'Masofa formulasi va kesma o\'rtasining koordinatalari.',
        theoryContent: `### Masofa va kesma o'rtasi

1. **Ikki nuqta $A(x_1; y_1; z_1)$ va $B(x_2; y_2; z_2)$ orasidagi masofa:**
   $$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$
2. **Kesma o'rtasining koordinatalari:**
   $$x = \\frac{x_1 + x_2}{2}, \\quad y = \\frac{y_1 + y_2}{2}, \\quad z = \\frac{z_1 + z_2}{2}$$`,
        order: 8,
        workedExamples: [
            {
                title: 'Masofani hisoblash',
                question: '$A(1; 0; 2)$ va $B(4; 0; 6)$ nuqtalar orasidagi masofani toping.',
                solution: '$d = \\sqrt{(4-1)^2 + (0-0)^2 + (6-2)^2} = \\sqrt{3^2 + 0 + 4^2} = \\sqrt{9 + 16} = 5$.',
                ruleSummary: 'Pifagor formulasining fazoviy ko\'rinishi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$M(2; 4; 6)$ va $N(4; 8; 10)$ kesma o\'rtasining koordinatalarini toping.',
                options: ['A) (3; 6; 8)', 'B) (6; 12; 16)', 'C) (2; 4; 4)', 'D) (1; 2; 3)'],
                correctAnswer: 'A',
                correctCustomAnswer: '(3; 6; 8)',
                explanation: '$((2+4)/2; (4+8)/2; (6+10)/2) = (3; 6; 8)$.',
                hint: 'Har bir koordinatani qo\'shib 2 ga bo\'ling.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda vektorlar va ular ustida amallar',
        description: 'Vektor koordinatalari, vektor uzunligi, qo\'shish, ayirish va songa ko\'paytirish.',
        theoryContent: `### Fazoda vektorlar

1. $\\vec{a} = (x; y; z)$.
2. **Uzunligi:** $|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$.
3. **Amallar:**
   - $\\vec{a} \\pm \\vec{b} = (x_1 \\pm x_2; y_1 \\pm y_2; z_1 \\pm z_2)$
   - $\\lambda \\vec{a} = (\\lambda x; \\lambda y; \\lambda z)$`,
        order: 9,
        workedExamples: [
            {
                title: 'Fazoviy vektor uzunligi',
                question: '$\\vec{a} = (2; 3; 6)$ vektorning modulini toping.',
                solution: '$|\\vec{a}| = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.',
                ruleSummary: '|a| = sqrt(x^2 + y^2 + z^2).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\vec{c} = (1; -2; 2)$ vektorning uzunligini toping.',
                options: ['A) 3', 'B) 5', 'C) 9', 'D) 1'],
                correctAnswer: 'A',
                correctCustomAnswer: '3',
                explanation: '$\\sqrt{1^2 + (-2)^2 + 2^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$.',
                hint: 'Modul formulasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda vektorlarning skalyar ko\'paytmasi va burchak',
        description: 'Skalyar ko\'paytma, ikki vektor orasidagi burchak kosinusi, kollinearlik va perpendikulyarlik.',
        theoryContent: `### Skalyar ko'paytma va burchak

1. $\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2$.
2. **Ikki vektor orasidagi burchak kosinusi:**
   $$\\cos \\varphi = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|} = \\frac{x_1x_2 + y_1y_2 + z_1z_2}{\\sqrt{x_1^2+y_1^2+z_1^2} \\cdot \\sqrt{x_2^2+y_2^2+z_2^2}}$$
3. **Perpendikulyarlik sharti:** $x_1x_2 + y_1y_2 + z_1z_2 = 0$.`,
        order: 10,
        workedExamples: [
            {
                title: 'Perpendikulyarlikni tekshirish',
                question: '$\\vec{a} = (1; 2; -1)$ va $\\vec{b} = (2; 1; 4)$ vektorlar perpendikulyarmi?',
                solution: '$\\vec{a} \\cdot \\vec{b} = 1(2) + 2(1) + (-1)(4) = 2 + 2 - 4 = 0$. Ha, ular o\'zaro perpendikulyar.',
                ruleSummary: 'Skalyar ko\'paytma nol bo\'lsa vektorlar perpendikulyar.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\vec{a} = (2; 0; 3)$ va $\\vec{b} = (1; 4; 2)$ vektorlarning skalyar ko\'paytmasini toping.',
                options: ['A) 8', 'B) 7', 'C) 6', 'D) 10'],
                correctAnswer: 'A',
                correctCustomAnswer: '8',
                explanation: '$2(1) + 0(4) + 3(2) = 2 + 0 + 6 = 8$.',
                hint: 'Mos koordinatalarni ko\'paytirib qo\'shing.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda tekislik va to\'g\'ri chiziq tenglamalari',
        description: 'Tekislikning umumiy tenglamasi Ax + By + Cz + D = 0, normal vektor.',
        theoryContent: `### Tekislik tenglamasi

1. **Umumiy tenglama:**
   $$Ax + By + Cz + D = 0$$
   bu yerda $\\vec{n} = (A; B; C)$ — tekislikning normal vektori (tekislikka perpendikulyar vektor).
2. **Parallel tekisliklar:** Normal vektorlari kollinear bo'ladi: $\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}$.`,
        order: 11,
        workedExamples: [
            {
                title: 'Normal vektorni aniqlash',
                question: '$2x - 3y + 4z - 7 = 0$ tekislikning normal vektorini toping.',
                solution: 'Normal vektor koeffitsiyentlardan tuziladi: $\\vec{n} = (2; -3; 4)$.',
                ruleSummary: 'n = (A; B; C).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$3x + y - 5z + 2 = 0$ tekislikning normal vektori qaysi?',
                options: ['A) (3; 1; -5)', 'B) (3; 1; 2)', 'C) (3; -5; 2)', 'D) (1; 1; -5)'],
                correctAnswer: 'A',
                correctCustomAnswer: '(3; 1; -5)',
                explanation: 'x, y, z oldidagi koeffitsiyentlar: (3; 1; -5).',
                hint: 'A, B, C koeffitsiyentlarini oling.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Sferaning koordinataviy tenglamasi',
        description: 'Markazi (x0, y0, z0) nuqtada va radiusi R bo\'lgan sfera tenglamasi.',
        theoryContent: `### Sfera tenglamasi

Markazi $C(x_0; y_0; z_0)$ nuqtada va radiusi $R$ bo'lgan sferaning tenglamasi:
$$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$$

Agar sfera markazi koordinata boshida bo'lsa:
$$x^2 + y^2 + z^2 = R^2$$`,
        order: 12,
        workedExamples: [
            {
                title: 'Sfera tenglamasini tuzish',
                question: 'Markazi $C(1; -2; 3)$ nuqtada va radiusi $R = 4$ bo\'lgan sfera tenglamasini yozing.',
                solution: '$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 4^2 = 16$.',
                ruleSummary: '(x-x0)^2 + (y-y0)^2 + (z-z0)^2 = R^2 formulasi qo\'llaniladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$(x - 2)^2 + (y + 1)^2 + z^2 = 25$ sfera markazi va radiusini toping.',
                options: ['A) C(2; -1; 0), R = 5', 'B) C(-2; 1; 0), R = 25', 'C) C(2; 1; 0), R = 5', 'D) C(2; -1; 1), R = 5'],
                correctAnswer: 'A',
                correctCustomAnswer: 'C(2; -1; 0), R = 5',
                explanation: '$x_0 = 2, y_0 = -1, z_0 = 0$, $R = \\sqrt{25} = 5$.',
                hint: 'R^2 = 25 dan R = 5.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];

export const GRADE_11_PART2_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Boshlang\'ich funksiya tushunchasi va asosiy qoidalari',
        description: 'Boshlang\'ich funksiya ta\'rifi, aniqmas integral va integrallar jadvali.',
        theoryContent: `### Boshlang'ich funksiya va integral

1. **Ta'rif:** Agar berilgan oraliqdagi barcha $x$ lar uchun $F'(x) = f(x)$ bo'lsa, $F(x)$ funksiya $f(x)$ ning boshlang'ich funksiyasi deyiladi.
2. **Asosiy jadval:**
   - $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ ($n \\neq -1$)
   - $\\int \\frac{1}{x} dx = \\ln |x| + C$
   - $\\int e^x dx = e^x + C$
   - $\\int \\sin x dx = -\\cos x + C$
   - $\\int \\cos x dx = \\sin x + C$`,
        order: 1,
        workedExamples: [
            {
                title: 'Boshlang\'ich funksiyani topish',
                question: '$f(x) = 3x^2 + 2x$ ning boshlang\'ich funksiyasini toping.',
                solution: '$F(x) = 3 \\cdot \\frac{x^3}{3} + 2 \\cdot \\frac{x^2}{2} + C = x^3 + x^2 + C$.',
                ruleSummary: 'x^n ning boshlang\'ichi x^(n+1)/(n+1).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$f(x) = 4x^3$ funksiyaning boshlang\'ich funksiyasi qaysi?',
                options: ['A) x^4 + C', 'B) 12x^2 + C', 'C) 4x^4 + C', 'D) x^3 + C'],
                correctAnswer: 'A',
                correctCustomAnswer: 'x^4 + C',
                explanation: '$F(x) = 4 \\cdot \\frac{x^4}{4} + C = x^4 + C$.',
                hint: '(x^4)\' = 4x^3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Aniq integral va Nyuton-Leybnits formulasi',
        description: 'Aniq integralning geometrik ma\'nosi va Nyuton-Leybnits formulasi.',
        theoryContent: `### Nyuton-Leybnits formulasi

Agar $F(x)$ funksiya $f(x)$ ning $[a; b]$ kesmadagi boshlang'ich funksiyasi bo'lsa:
$$\\int_a^b f(x) dx = F(x) \\Big|_a^b = F(b) - F(a)$$

Xossalari:
1. $\\int_a^a f(x) dx = 0$
2. $\\int_a^b f(x) dx = -\\int_b^a f(x) dx$
3. $\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$`,
        order: 2,
        workedExamples: [
            {
                title: 'Aniq integralni hisoblash',
                question: '$\\int_1^2 2x dx$ ni hisoblang.',
                solution: '$\\int_1^2 2x dx = x^2 \\Big|_1^2 = 2^2 - 1^2 = 4 - 1 = 3$.',
                ruleSummary: 'F(b) - F(a) formulasidan foydalanamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\int_0^3 x^2 dx$ ning qiymatini hisoblang.',
                options: ['A) 6', 'B) 9', 'C) 27', 'D) 3'],
                correctAnswer: 'B',
                correctCustomAnswer: '9',
                explanation: '$\\frac{x^3}{3} \\Big|_0^3 = \\frac{27}{3} - 0 = 9$.',
                hint: 'x^2 ning boshlang\'ichi x^3/3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Egri chiziqli trapetsiya yuzini integral yordamida hisoblash',
        description: 'Yuqoridan y = f(x) funksiya grafigi bilan chegaralangan soha yuzi.',
        theoryContent: `### Yuza hisoblash

Yuqoridan $y = f(x)$ ($f(x) \\ge 0$), quyidan $Ox$ o'qi, yon tomonlardan $x = a$ va $x = b$ to'g'ri chiziqlar bilan chegaralangan egri chiziqli trapetsiya yuzi:
$$S = \\int_a^b f(x) dx$$

Ikki funksiya $f(x)$ va $g(x)$ ($f(x) \\ge g(x)$) orasidagi yuza:
$$S = \\int_a^b (f(x) - g(x)) dx$$`,
        order: 3,
        workedExamples: [
            {
                title: 'Parabola ostidagi yuza',
                question: '$y = x^2$, $y = 0$, $x = 0$ va $x = 2$ bilan chegaralangan figura yuzini toping.',
                solution: '$S = \\int_0^2 x^2 dx = \\frac{x^3}{3} \\Big|_0^2 = \\frac{8}{3} = 2\\frac{2}{3}$.',
                ruleSummary: 'S = integral_a^b f(x) dx.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$y = 2x$, $y = 0$, $x = 1$, $x = 3$ chiziqlar bilan chegaralangan trapetsiya yuzini toping.',
                options: ['A) 6', 'B) 8', 'C) 10', 'D) 4'],
                correctAnswer: 'B',
                correctCustomAnswer: '8',
                explanation: '$S = \\int_1^3 2x dx = x^2 \\Big|_1^3 = 3^2 - 1^2 = 9 - 1 = 8$.',
                hint: 'x^2 formulasi bo\'yicha 9 - 1.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Integralning geometrik va fizik tatbiqlari',
        description: 'O\'zgaruvchan kuch bajargan ish, massa va yo\'lni integral orqali topish.',
        theoryContent: `### Fizik tatbiqlar

1. **Bosib o'tilgan yo'l:** $s = \\int_{t_1}^{t_2} v(t) dt$.
2. **O'zgaruvchan kuch bajargan ish:** $A = \\int_a^b F(x) dx$.`,
        order: 4,
        workedExamples: [
            {
                title: 'Yo\'lni topish',
                question: 'Jism $v(t) = 3t^2$ tezlik bilan harakatlanmoqda. $t = 0$ dan $t = 2$ gacha bosib o\'tilgan yo\'lni toping.',
                solution: '$s = \\int_0^2 3t^2 dt = t^3 \\Big|_0^2 = 2^3 - 0 = 8$ m.',
                ruleSummary: 's = integral v(t) dt.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$v(t) = 4t$ tezlik bilan harakatlanayotgan jismning dastlabki 3 sekundda bosib o\'tgan yo\'lini toping.',
                options: ['A) 12 m', 'B) 18 m', 'C) 24 m', 'D) 36 m'],
                correctAnswer: 'B',
                correctCustomAnswer: '18',
                explanation: '$s = \\int_0^3 4t dt = 2t^2 \\Big|_0^3 = 2(9) = 18$ m.',
                hint: '4t ning integrali 2*t^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoda aylanma jismlar: Silindr',
        description: 'Silindrning elementlari, yon va to\'la sirti yuzi, silindr hajmi formulalari.',
        theoryContent: `### Silindr

1. **Yon sirti yuzi:** $S_{\\text{yon}} = 2\\pi R H$
2. **To'la sirti yuzi:** $S_{\\text{to'la}} = 2\\pi R(R + H)$
3. **Hajmi:**
   $$V = S_{\\text{asos}} \\cdot H = \\pi R^2 H$$`,
        order: 5,
        workedExamples: [
            {
                title: 'Silindr hajmini topish',
                question: 'Asos radiusi $R = 3$ cm, balandligi $H = 5$ cm bo\'lgan silindr hajmini toping.',
                solution: '$V = \\pi R^2 H = \\pi \\cdot 3^2 \\cdot 5 = 45\\pi \\text{ cm}^3$.',
                ruleSummary: 'V = pi * R^2 * H.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Asos radiusi 2 cm va balandligi 10 cm bo\'lgan silindrning yon sirti yuzini toping.',
                options: ['A) 20\\pi cm^2', 'B) 40\\pi cm^2', 'C) 80\\pi cm^2', 'D) 100\\pi cm^2'],
                correctAnswer: 'B',
                correctCustomAnswer: '40*pi',
                explanation: '$S_{\\text{yon}} = 2\\pi R H = 2\\pi \\cdot 2 \\cdot 10 = 40\\pi \\text{ cm}^2$.',
                hint: 'S_yon = 2*pi*R*H.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Konus va kesik konus',
        description: 'Konus yasovchisi, balandligi, yon sirti, to\'la sirti va hajmi formulalari.',
        theoryContent: `### Konus

1. **Yasovchi:** $l^2 = R^2 + H^2$.
2. **Yon sirti yuzi:** $S_{\\text{yon}} = \\pi R l$.
3. **To'la sirti yuzi:** $S_{\\text{to'la}} = \\pi R (R + l)$.
4. **Hajmi:**
   $$V = \\frac{1}{3} \\pi R^2 H$$`,
        order: 6,
        workedExamples: [
            {
                title: 'Konus hajmi',
                question: 'Asos radiusi $R = 6$ cm, balandligi $H = 5$ cm bo\'lgan konus hajmini toping.',
                solution: '$V = \\frac{1}{3} \\pi R^2 H = \\frac{1}{3} \\pi \\cdot 36 \\cdot 5 = 12 \\cdot 5 \\pi = 60\\pi \\text{ cm}^3$.',
                ruleSummary: 'V = 1/3 * pi * R^2 * H.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Asos radiusi 3 cm, yasovchisi 5 cm bo\'lgan konusning yon sirti yuzini toping.',
                options: ['A) 15\\pi cm^2', 'B) 30\\pi cm^2', 'C) 24\\pi cm^2', 'D) 12\\pi cm^2'],
                correctAnswer: 'A',
                correctCustomAnswer: '15*pi',
                explanation: '$S_{\\text{yon}} = \\pi R l = \\pi \\cdot 3 \\cdot 5 = 15\\pi \\text{ cm}^2$.',
                hint: 'S_yon = pi * R * l.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Sfera va shar. Sfera sirti yuzi',
        description: 'Sfera va shar ta\'rifi, diametri, kesimlari va sfera sirtining yuzi.',
        theoryContent: `### Sfera sirti

1. **Sfera:** Fazoda markazdan bir xil $R$ masofada joylashgan barcha nuqtalar to'plami.
2. **Sfera sirti yuzi:**
   $$S = 4\\pi R^2 = \\pi D^2$$`,
        order: 7,
        workedExamples: [
            {
                title: 'Sfera sirti yuzini topish',
                question: 'Radiusi $R = 3$ cm bo\'lgan sfera sirti yuzini hisoblang.',
                solution: '$S = 4\\pi R^2 = 4\\pi \\cdot 3^2 = 4\\pi \\cdot 9 = 36\\pi \\text{ cm}^2$.',
                ruleSummary: 'S = 4*pi*R^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Radiusi 5 cm bo\'lgan shar sirtining yuzini toping.',
                options: ['A) 25\\pi cm^2', 'B) 50\\pi cm^2', 'C) 100\\pi cm^2', 'D) 125\\pi cm^2'],
                correctAnswer: 'C',
                correctCustomAnswer: '100*pi',
                explanation: '$S = 4\\pi R^2 = 4\\pi \\cdot 25 = 100\\pi \\text{ cm}^2$.',
                hint: 'S = 4*pi*R^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Shar va uning bo\'laklari hajmi',
        description: 'Shar hajmi, shar segmenti va shar sektori hajmi formulalari.',
        theoryContent: `### Shar hajmi

1. **Shar hajmi:**
   $$V = \\frac{4}{3} \\pi R^3$$
2. **Shar segmenti hajmi:**
   $$V_{\\text{segment}} = \\pi H^2 \\left(R - \\frac{H}{3}\\right)$$ ($H$ — segment balandligi).`,
        order: 8,
        workedExamples: [
            {
                title: 'Shar hajmini hisoblash',
                question: 'Radiusi $R = 3$ cm bo\'lgan sharning hajmini toping.',
                solution: '$V = \\frac{4}{3} \\pi R^3 = \\frac{4}{3} \\pi \\cdot 27 = 4 \\cdot 9\\pi = 36\\pi \\text{ cm}^3$.',
                ruleSummary: 'V = 4/3 * pi * R^3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Radiusi 6 cm bo\'lgan shar hajmini hisoblang.',
                options: ['A) 144\\pi cm^3', 'B) 288\\pi cm^3', 'C) 72\\pi cm^3', 'D) 216\\pi cm^3'],
                correctAnswer: 'B',
                correctCustomAnswer: '288*pi',
                explanation: '$V = \\frac{4}{3} \\pi \\cdot 6^3 = \\frac{4}{3} \\pi \\cdot 216 = 288\\pi \\text{ cm}^3$.',
                hint: '4/3 * 216 = 288.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ko\'pyoqlar va aylanma jismlarning kombinatsiyalari',
        description: 'Prizmaga ichki va tashqi chizilgan silindr, piramidaga ichki va tashqi chizilgan konus va shar.',
        theoryContent: `### Shakllar kombinatsiyasi

1. **Prizmaga ichki chizilgan silindr:** Silindr asoslari prizma asoslariga ichki chizilgan aylanalar bo'ladi.
2. **Piramidaga ichki chizilgan shar:** Piramidaning barcha yoqlariga urinuvchi shar.
   $$V_{\\text{piramida}} = \\frac{1}{3} S_{\\text{to'la}} \\cdot r$$
   bu yerda $r$ — ichki chizilgan shar radiusi.`,
        order: 9,
        workedExamples: [
            {
                title: 'Ichki chizilgan shar radiusi',
                question: 'Piramidaning hajmi $V = 100$ va to\'la sirti $S = 60$. Ichki chizilgan shar radiusini toping.',
                solution: '$V = \\frac{1}{3} S r \\Rightarrow 100 = \\frac{1}{3} \\cdot 60 \\cdot r = 20r \\Rightarrow r = 5$.',
                ruleSummary: 'r = 3V / S_to\'la.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Qirrasi 6 cm bo\'lgan kubga ichki chizilgan sharning radiusi nechaga teng?',
                options: ['A) 6 cm', 'B) 3 cm', 'C) 3\\sqrt{2} cm', 'D) 1.5 cm'],
                correctAnswer: 'B',
                correctCustomAnswer: '3',
                explanation: 'Kubga ichki chizilgan sharning diametri kub qirrasiga teng: $2R = a = 6 \\Rightarrow R = 3$ cm.',
                hint: 'Sharning diametri kub qirrasi bilan teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Nyuton binomi va kombinatorika tatbiqlari',
        description: 'Binomial koeffitsiyentlar, Paskal uchburchagi va Nyuton binomi formulasi.',
        theoryContent: `### Nyuton binomi formulasi

$$(a + b)^n = C_n^0 a^n + C_n^1 a^{n-1}b + C_n^2 a^{n-2}b^2 + \\dots + C_n^n b^n = \\sum_{k=0}^n C_n^k a^{n-k}b^k$$

Umumiy had formulasi:
$$T_{k+1} = C_n^k a^{n-k} b^k$$`,
        order: 10,
        workedExamples: [
            {
                title: 'Binom yoyilmasi',
                question: '$(x + y)^4$ yoyilmasining barcha koeffitsiyentlari yig\'indisini toping.',
                solution: '$x = 1, y = 1$ qo\'yamiz: $(1 + 1)^4 = 2^4 = 16$.',
                ruleSummary: 'Koeffitsiyentlar yig\'indisi har doim 2^n ga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$(a + b)^3$ yoyilmasida $a^2b$ oldidagi koeffitsiyent nechaga teng?',
                options: ['A) 1', 'B) 2', 'C) 3', 'D) 6'],
                correctAnswer: 'C',
                correctCustomAnswer: '3',
                explanation: '$C_3^1 = 3$.',
                hint: '(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Tasodifiy miqdorlar va matematik statistika',
        description: 'Diskret tasodifiy miqdorlar, matematik kutilma va dispersiya.',
        theoryContent: `### Matematik kutilma va dispersiya

1. **Matematik kutilma (O'rtacha qiymat):**
   $$M(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n = \\sum x_i p_i$$
2. **Dispersiya (Tarqoqlik o'lchovi):**
   $$D(X) = M(X^2) - (M(X))^2$$
3. O'rtacha kvadratik chetlanish: $\\sigma(X) = \\sqrt{D(X)}$.`,
        order: 11,
        workedExamples: [
            {
                title: 'Matematik kutilmani hisoblash',
                question: '$X$ tasodifiy miqdor $1$ qiymatni $0.4$ ehtimollik bilan va $2$ qiymatni $0.6$ ehtimollik bilan qabul qiladi. $M(X)$ ni toping.',
                solution: '$M(X) = 1 \\cdot 0.4 + 2 \\cdot 0.6 = 0.4 + 1.2 = 1.6$.',
                ruleSummary: 'M(X) = sum(x_i * p_i).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Ehtimolliklar yig\'indisi $p_1 + p_2 + \\dots + p_n$ har doim nechiga teng bo\'ladi?',
                options: ['A) 0', 'B) 1', 'C) 100', 'D) Cheksiz'],
                correctAnswer: 'B',
                correctCustomAnswer: '1',
                explanation: 'To\'la guruhni tashkil etuvchi hodisalar ehtimolliklari yig\'indisi har doim 1 ga teng.',
                hint: 'To\'la ehtimollik xossasi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Matematika va stereometriyaning umumiy takrorlash kursi',
        description: 'Maktab kursi bo\'yicha davlat attestatsiyasi va kirish imtihonlariga tayyorgarlik testlari.',
        theoryContent: `### Yakuniy takrorlash

1. Algebraik shakllantirishlar va tenglamalar sistemalari.
2. Funksiyalar va ularning hosilalari, integrallar.
3. Planimetriya va stereometriya masalalarini kompleks yechish usullari.`,
        order: 12,
        workedExamples: [
            {
                title: 'Murakkab masalani yechish',
                question: '$\\log_2(\\sin(\\pi/6))$ ning qiymatini toping.',
                solution: '$\\sin(\\pi/6) = 1/2$. $\\log_2(1/2) = \\log_2(2^{-1}) = -1$.',
                ruleSummary: 'Trigonometriya va logarifm qoidalarining birgalikdagi qo\'llanilishi.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$2^{\\log_2 7} + \\sqrt{9}$ ifodaning qiymatini toping.',
                options: ['A) 7', 'B) 10', 'C) 14', 'D) 12'],
                correctAnswer: 'B',
                correctCustomAnswer: '10',
                explanation: '$2^{\\log_2 7} = 7$ va $\\sqrt{9} = 3$. $7 + 3 = 10$.',
                hint: 'Asosiy logarifmik ayniyatni eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];
