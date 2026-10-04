import { DifficultyLevel } from '@prisma/client';
import type { ParsedTopicInput } from '@/repositories/book.repository';

export const GRADE_9_ALGEBRA_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Darajalar va ularning xossalari',
        description: 'Butun va natural ko\'rsatkichli darajalar, ularning xossalari va ko\'paytirish qoidalari.',
        theoryContent: `### Natural va butun ko'rsatkichli daraja

1. **Daraja ta'rifi:**
   $a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n \\text{ marta}}$ ($n \\in \\mathbb{N}, n > 1$).

2. **Asosiy xossalar:**
   - Bir xil asosli darajalarni ko'paytirish: $a^m \\cdot a^n = a^{m+n}$
   - Bir xil asosli darajalarni bo'lish: $\\frac{a^m}{a^n} = a^{m-n}$ ($a \\neq 0, m > n$)
   - Darajani darajaga ko'tarish: $(a^m)^n = a^{m \\cdot n}$
   - Ko'paytmaning darajasi: $(a \\cdot b)^n = a^n \\cdot b^n$
   - Kasrning darajasi: $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$ ($b \\neq 0$)
   - Manfiy ko'rsatkichli daraja: $a^{-n} = \\frac{1}{a^n}$ ($a \\neq 0$), $a^0 = 1$ ($a \\neq 0$).`,
        order: 1,
        workedExamples: [
            {
                title: 'Darajalarni soddalashtirish',
                question: 'Ifodani soddalashtiring: $\\frac{2^5 \\cdot 4^2}{8^2}$',
                solution: '$4^2 = (2^2)^2 = 2^4$ va $8^2 = (2^3)^2 = 2^6$. Demak, $\\frac{2^5 \\cdot 2^4}{2^6} = \\frac{2^9}{2^6} = 2^{9-6} = 2^3 = 8$.',
                ruleSummary: 'Barcha asoslarni umumiy 2 asosiga keltirib, daraja xossalarini qo\'llaymiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                title: 'Manfiy darajali ifoda',
                question: 'Hisoblang: $\\left(\\frac{2}{3}\\right)^{-2} + 5^0$',
                solution: '$\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4} = 2.25$. $5^0 = 1$. Natija: $2.25 + 1 = 3.25$.',
                ruleSummary: '$a^{-n} = (1/a)^n$ va $a^0 = 1$.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 2,
            },
        ],
        practiceQuestions: [
            {
                question: '$3^4 \\cdot 3^{-2}$ ifodaning qiymatini toping.',
                options: ['A) 3', 'B) 9', 'C) 27', 'D) 1/9'],
                correctAnswer: 'B',
                correctCustomAnswer: '9',
                explanation: '$3^{4 + (-2)} = 3^2 = 9$.',
                hint: 'Asoslar bir xil bo\'lsa darajalar qo\'shiladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                question: '$\\frac{x^7 \\cdot x^3}{x^8}$ ifodani soddalashtiring.',
                options: ['A) x^2', 'B) x^4', 'C) x', 'D) 1/x'],
                correctAnswer: 'A',
                correctCustomAnswer: 'x^2',
                explanation: '$x^{7+3-8} = x^2$.',
                hint: 'Suratdagi darajalarni qo\'shib, maxrajdagisini ayiring.',
                difficulty: DifficultyLevel.EASY,
                order: 2,
            },
            {
                question: '$(2^{-3})^{-1} - 2^2$ ifodaning qiymatini toping.',
                options: ['A) 2', 'B) 4', 'C) 6', 'D) 8'],
                correctAnswer: 'B',
                correctCustomAnswer: '4',
                explanation: '$(2^{-3})^{-1} = 2^3 = 8$. $2^2 = 4$. Natija: $8 - 4 = 4$.',
                hint: 'Darajani darajaga ko\'tarishda ko\'rsatkichlar ko\'paytiriladi.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 3,
            },
        ],
    },
    {
        title: 'Birhadlar va ko\'phadlar ustida amallar',
        description: 'Birhadning standart shakli, ko\'phadlarni qo\'shish, ayirish va ko\'paytirish.',
        theoryContent: `### Birhad va ko'phadlar

1. **Birhad:** Sonli ko'paytuvchi va o'zgaruvchilarning natural darajalari ko'paytmasi.
   - Masalan: $3x^2y$, $-5ab^3$.
   - Koeffitsiyent: Birhad oldidagi sonli ko'paytuvchi.

2. **Ko'phad:** Birhadlarning algebraik yig'indisi.
   - O'xshash hadlarni ixchamlash: bir xil harfiy qismga ega hadlarning koeffitsiyentlari qo'shiladi yoki ayiriladi.
   - Ko'phadni ko'phadga ko'paytirish: birinchi ko'phadning har bir hadi ikkinchisining har bir hadiga ko'paytiriladi:
     $$(a + b)(c + d) = ac + ad + bc + bd$$`,
        order: 2,
        workedExamples: [
            {
                title: 'Ko\'phadlarni ko\'paytirish',
                question: '$(2x - 3)(x + 4)$ ko\'paytmani ko\'phad shaklida yozing.',
                solution: '$2x(x + 4) - 3(x + 4) = 2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12$.',
                ruleSummary: 'Har bir hadni alohida ko\'paytirib, o\'xshash hadlar ixchamlanadi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$(3x + 2)(x - 1)$ ifodani ochib chiqing.',
                options: ['A) 3x^2 - x - 2', 'B) 3x^2 + x - 2', 'C) 3x^2 + 5x - 2', 'D) 3x^2 - 2'],
                correctAnswer: 'A',
                correctCustomAnswer: '3x^2 - x - 2',
                explanation: '$3x^2 - 3x + 2x - 2 = 3x^2 - x - 2$.',
                hint: 'Ko\'phadlarni ko\'paytirib, o\'xshash hadlarni ixchamlang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Qisqa ko\'paytirish formulalari',
        description: 'Yig\'indi va ayirmaning kvadrati, kubi hamda kvadratlar ayirmasi formulalari.',
        theoryContent: `### Asosiy qisqa ko'paytirish formulalari

1. Kvadratlar ayirmasi:
   $$a^2 - b^2 = (a - b)(a + b)$$

2. Yig'indining kvadrati:
   $$(a + b)^2 = a^2 + 2ab + b^2$$

3. Ayirmaning kvadrati:
   $$(a - b)^2 = a^2 - 2ab + b^2$$

4. Kublar yig'indisi va ayirmasi:
   $$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$
   $$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$`,
        order: 3,
        workedExamples: [
            {
                title: 'Kvadratlar ayirmasini qo\'llash',
                question: '$101^2 - 99^2$ ni qulay usulda hisoblang.',
                solution: '$101^2 - 99^2 = (101 - 99)(101 + 99) = 2 \\cdot 200 = 400$.',
                ruleSummary: '$a^2 - b^2 = (a-b)(a+b)$ formulasi hisoblashni osonlashtiradi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$(2x + 3)^2$ ifodaning yoyilmasi qaysi?',
                options: ['A) 4x^2 + 9', 'B) 4x^2 + 6x + 9', 'C) 4x^2 + 12x + 9', 'D) 2x^2 + 12x + 9'],
                correctAnswer: 'C',
                correctCustomAnswer: '4x^2 + 12x + 9',
                explanation: '$(2x)^2 + 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 + 12x + 9$.',
                hint: '$(a+b)^2 = a^2 + 2ab + b^2$ formulasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Chiziqli tenglamalar va tenglamalar sistemalari',
        description: 'Bir va ikki noma\'lumli chiziqli tenglamalar, o\'rniga qo\'yish va qo\'shish usullari.',
        theoryContent: `### Chiziqli tenglamalar sistemasi

1. **Ko'rinishi:**
   $$\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}$$

2. **Yechish usullari:**
   - **O'rniga qo'yish usuli:** Bir tenglamadan bir noma'lumni ikkinchisi orqali ifodalab, ikkinchi tenglamaga qo'yish.
   - **Algebraik qo'shish usuli:** Koeffitsiyentlarni tenglashtirib, tenglamalarni hadma-had qo'shish yoki ayirish.`,
        order: 4,
        workedExamples: [
            {
                title: 'Tenglamalar sistemasini yechish',
                question: '$\\begin{cases} x + y = 10 \\\\ x - y = 4 \\end{cases}$ sistemasini yeching.',
                solution: 'Tenglamalarni hadma-had qo\'shamiz: $2x = 14 \\Rightarrow x = 7$. $y = 10 - 7 = 3$. Javob: $(7; 3)$.',
                ruleSummary: 'Qo\'shish usulida qarama-qarshi koeffitsiyentli noma\'lumlar yo\'qoladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$ tenglamalar sistemasidan $x$ ni toping.',
                options: ['A) 2', 'B) 3', 'C) 4', 'D) 5'],
                correctAnswer: 'B',
                correctCustomAnswer: '3',
                explanation: 'Tenglamalarni qo\'shamiz: $3x = 9 \\Rightarrow x = 3$.',
                hint: 'Tenglamalarni hadma-had qo\'shib y ni yo\'qoting.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Chiziqli tengsizliklar va ularning sistemalari',
        description: 'Sonli oraliqlar, bir noma\'lumli tengsizliklar va tengsizliklar sistemalari.',
        theoryContent: `### Chiziqli tengsizliklar

1. $ax > b$ yoki $ax < b$ ko'rinishidagi tengsizliklar.
2. **Qoida:** Tengsizlikning ikkala qismi manfiy songa ko'paytirilsa yoki bo'linsa, tengsizlik ishorasi teskarisiga o'zgaradi!
   - Masalan: $-2x < 6 \\Rightarrow x > -3$.`,
        order: 5,
        workedExamples: [
            {
                title: 'Tengsizlikni yechish',
                question: '$3x - 5 \\le 7$ tengsizlikni yeching.',
                solution: '$3x \\le 12 \\Rightarrow x \\le 4$. Oraliq: $(-\\infty; 4]$.',
                ruleSummary: 'Haddan hadga o\'tkazish va musbat songa bo\'lish.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$-4x \\le 12$ tengsizlikning yechimi qaysi?',
                options: ['A) x <= -3', 'B) x >= -3', 'C) x >= 3', 'D) x <= 3'],
                correctAnswer: 'B',
                correctCustomAnswer: 'x >= -3',
                explanation: 'Manfiy songa bo\'lganda ishora o\'zgaradi: $x \\ge 12 / (-4) = -3$.',
                hint: 'Manfiy songa bo\'lganda ishora teskarisiga o\'zgarishini unutmang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Kvadrat ildizlar va irratsional ifodalar',
        description: 'Arifmetik kvadrat ildiz, ildiz xossalari va ildiz ostidan ko\'paytuvchi chiqarish.',
        theoryContent: `### Arifmetik kvadrat ildiz

1. $\\sqrt{a} = b \\Leftrightarrow b \\ge 0$ va $b^2 = a$ ($a \\ge 0$).
2. **Xossalar:**
   - $\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$ ($a, b \\ge 0$)
   - $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$ ($a \\ge 0, b > 0$)
   - $\\sqrt{a^2} = |a|$`,
        order: 6,
        workedExamples: [
            {
                title: 'Ildizni soddalashtirish',
                question: '$\\sqrt{72}$ ni soddalashtiring.',
                solution: '$\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36} \\cdot \\sqrt{2} = 6\\sqrt{2}$.',
                ruleSummary: 'Ko\'paytuvchilarga ajratib, to\'la kvadratlarni ildizdan chiqaramiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\sqrt{50} - \\sqrt{18}$ ifodani soddalashtiring.',
                options: ['A) 2\\sqrt{2}', 'B) 3\\sqrt{2}', 'C) \\sqrt{32}', 'D) 4'],
                correctAnswer: 'A',
                correctCustomAnswer: '2*sqrt(2)',
                explanation: '$5\\sqrt{2} - 3\\sqrt{2} = 2\\sqrt{2}$.',
                hint: '50 = 25*2 va 18 = 9*2 ekanligidan foydalaning.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
    },
    {
        title: 'Kvadrat tenglamalar. Viet teoremasi',
        description: 'To\'liq va chala kvadrat tenglamalar, diskriminant va ildizlar formulasi, Viet teoremasi.',
        theoryContent: `### 1. Mavzuga kirish va Hayotiy ahamiyati

**Kvadrat tenglama** — bu noma'lum $x$ ning ikkinchi darajasini o'z ichiga olgan algebraik tenglamadir:
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

#### 🎯 Hayotiy misol:
Tomonlaridan biri ikkinchisidan $3 \\text{ metr}$ uzun bo'lgan to'rtburchak shaklidagi yer maydonining yuzi $40 \\text{ m}^2$ ga teng. Maydonning tomonlarini toping.
Maydonning enini $x$ desak, bo'yi $x + 3$ bo'ladi. Yuzi:
$$x(x + 3) = 40 \\implies x^2 + 3x - 40 = 0$$
Mana bu haqiqiy hayotiy vaziyatdan kelib chiqqan kvadrat tenglamadir! Uni yechish orqali $x = 5$ metr va $x + 3 = 8$ metr ekanligini topamiz (manfiy ildiz $x = -8$ uzunlik bo'la olmaydi).

---

### 2. Asosiy tushunchalar va Turlari

1. **To'liq kvadrat tenglama:** $a \\neq 0, b \\neq 0, c \\neq 0$ bo'lgan holat: $2x^2 + 5x - 3 = 0$.
2. **Chala kvadrat tenglamalar:**
   - $c = 0$ bo'lsa: $ax^2 + bx = 0 \\implies x(ax + b) = 0 \\implies x_1 = 0, x_2 = -\\frac{b}{a}$.
   - $b = 0$ bo'lsa: $ax^2 + c = 0 \\implies x^2 = -\\frac{c}{a}$. Agar $-\\frac{c}{a} > 0$ bo'lsa, $x_{1,2} = \\pm\\sqrt{-\\frac{c}{a}}$.
   - $b = 0$ va $c = 0$ bo'lsa: $ax^2 = 0 \\implies x = 0$.

---

### 3. Formulalar va Diskriminantning geometrik ma'nosi

Kvadrat tenglamani yechishning universal usuli — **Diskriminant** formulasi:
$$D = b^2 - 4ac$$

Ildizlar formulasi:
$$x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$$

\`\`\`svg
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="w-full text-foreground">
  <rect width="700" height="200" rx="14" fill="#0f172a" fill-opacity="0.04" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.2"/>
  
  <!-- 3 Cases: D > 0, D = 0, D < 0 -->
  <!-- Case 1: D > 0 -->
  <line x1="30" y1="120" x2="210" y2="120" stroke="currentColor" stroke-width="2"/>
  <path d="M 50,50 Q 120,180 190,50" fill="none" stroke="#22c55e" stroke-width="2.5"/>
  <circle cx="85" cy="120" r="4" fill="#22c55e"/>
  <circle cx="155" cy="120" r="4" fill="#22c55e"/>
  <text x="120" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#16a34a">D &gt; 0 (2 ta ildiz)</text>
  <text x="120" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="currentColor">Ox ni 2 marta kesadi</text>

  <!-- Divider 1 -->
  <line x1="230" y1="20" x2="230" y2="180" stroke="#94a3b8" stroke-dasharray="3" stroke-opacity="0.4"/>

  <!-- Case 2: D = 0 -->
  <line x1="260" y1="120" x2="440" y2="120" stroke="currentColor" stroke-width="2"/>
  <path d="M 280,50 Q 350,120 420,50" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <circle cx="350" cy="120" r="4" fill="#3b82f6"/>
  <text x="350" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#2563eb">D = 0 (1 ta ildiz)</text>
  <text x="350" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="currentColor">Ox ga urinadi (x₁ = x₂)</text>

  <!-- Divider 2 -->
  <line x1="470" y1="20" x2="470" y2="180" stroke="#94a3b8" stroke-dasharray="3" stroke-opacity="0.4"/>

  <!-- Case 3: D < 0 -->
  <line x1="490" y1="120" x2="670" y2="120" stroke="currentColor" stroke-width="2"/>
  <path d="M 510,60 Q 580,95 650,60" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <text x="580" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#dc2626">D &lt; 0 (Ildiz yo'q)</text>
  <text x="580" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="currentColor">Ox ni kesmaydi</text>
</svg>
\`\`\`

---

### 4. Viet teoremasi (Tez yechish usuli)

Agar keltirilgan kvadrat tenglama $x^2 + px + q = 0$ bo'lsa (ya'ni $a = 1$), uning ildizlari uchun **Fransua Viet teoremasi** o'rinli:
$$\\begin{cases} x_1 + x_2 = -p \\\\ x_1 \\cdot x_2 = q \\end{cases}$$

Umumiy $ax^2 + bx + c = 0$ tenglama uchun:
$$x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}$$

---

### 7. Muhim eslatmalar va ⚠️ Ko'p qilinadigan xatolar

> ⚠️ **1-XATO:** Viet teoremasida $p$ ning ishorasini unutish! Ildizlar yig'indisi $x_1 + x_2 = -p$ (qarama-qarshi ishora bilan olinadi!).  
> Masalan: $x^2 - 7x + 10 = 0$ da $p = -7$, demak $x_1 + x_2 = -(-7) = +7$.

> ⚠️ **2-XATO:** Diskriminant formulasida $(-b)^2$ va $-(b^2)$ ni adashtirish. $(-4)^2 = +16$ bo'ladi!

> 💡 **LAYFXAK:** Agar $a + b + c = 0$ bo'lsa, tenglamaning bitta ildizi doimo $x_1 = 1$, ikkinchisi esa $x_2 = \\frac{c}{a}$ bo'ladi!  
> Masalan: $3x^2 - 5x + 2 = 0 \\implies 3 - 5 + 2 = 0 \\implies x_1 = 1, x_2 = \\frac{2}{3}$.`,
        order: 7,
        workedExamples: [
            {
                title: 'Viet teoremasi yordamida tezkor yechish',
                question: '$x^2 - 7x + 10 = 0$ tenglama ildizlarini og\'zaki toping.',
                solution: `**1-qadam:** Keltirilgan tenglamada $p = -7$ va $q = 10$.
**2-qadam:** Viet teoremasiga ko'ra:
$$x_1 + x_2 = -(-7) = 7, \\quad x_1 \\cdot x_2 = 10$$
**3-qadam:** Ko'paytmasi 10 bo'ladigan sonlar juftliklari: $(1; 10)$ yoki $(2; 5)$. Ularning yig'indisi $2 + 5 = 7$ bo'lgani uchun:
**Javob:** $x_1 = 2, \\quad x_2 = 5$.`,
                ruleSummary: 'x² + px + q = 0 tenglamada x₁ + x₂ = -p va x₁ * x₂ = q.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                title: 'Diskriminant usuli bilan to\'liq yechish',
                question: '$2x^2 - 5x + 2 = 0$ tenglamani yeching.',
                solution: `**1-qadam:** Koeffitsiyentlarni aniqlaymiz: $a = 2, b = -5, c = 2$.
**2-qadam:** Diskriminantni hisoblaymiz:
$$D = b^2 - 4ac = (-5)^2 - 4 \\cdot 2 \\cdot 2 = 25 - 16 = 9 = 3^2$$
**3-qadam:** $D > 0$, demak 2 ta ildiz mavjud:
$$x_1 = \\frac{-(-5) + 3}{2 \\cdot 2} = \\frac{8}{4} = 2$$
$$x_2 = \\frac{-(-5) - 3}{4} = \\frac{2}{4} = 0.5$$
**Javob:** $x_1 = 2, \\quad x_2 = 0.5$.`,
                ruleSummary: 'D = b² - 4ac > 0 bo\'lganda x₁,₂ = (-b ± √D) / (2a).',
                difficulty: DifficultyLevel.MEDIUM,
                order: 2,
            },
        ],
        practiceQuestions: [
            {
                question: '$x^2 - 5x + 6 = 0$ tenglamaning ildizlari yig\'indisini toping.',
                options: ['A) -5', 'B) 5', 'C) 6', 'D) -6'],
                correctAnswer: 'B',
                correctCustomAnswer: '5',
                explanation: 'Viet teoremasiga ko\'ra keltirilgan kvadrat tenglamada $x_1 + x_2 = -(-5) = 5$.',
                hint: 'Ildizlar yig\'indisi x oldidagi koeffitsiyentning qarama-qarshisiga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                question: '$x^2 - 4x - 5 = 0$ tenglamaning ildizlari ko\'paytmasini toping.',
                options: ['A) -5', 'B) 4', 'C) -4', 'D) 5'],
                correctAnswer: 'A',
                correctCustomAnswer: '-5',
                explanation: 'Viet teoremasiga ko\'ra ildizlar ko\'paytmasi ozod hadga teng: $x_1 \\cdot x_2 = q = -5$.',
                hint: 'x₁ * x₂ = q formulani eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 2,
            },
            {
                question: '$3x^2 - 6x = 0$ chala kvadrat tenglamaning ildizlarini toping.',
                options: ['A) 0 va 2', 'B) 2 va 3', 'C) faqat 2', 'D) -2 va 0'],
                correctAnswer: 'A',
                correctCustomAnswer: '0 va 2',
                explanation: '$3x(x - 2) = 0 \\implies x_1 = 0$ yoki $x - 2 = 0 \\implies x_2 = 2$.',
                hint: 'Umumiy ko\'paytuvchi 3x ni qavsdan tashqariga chiqaring.',
                difficulty: DifficultyLevel.EASY,
                order: 3,
            },
        ],
    },
    {
        title: 'Kvadrat tengsizliklar va intervallar usuli',
        description: 'Kvadrat tengsizliklarni grafik va intervallar usulida yechish.',
        theoryContent: `### 1. Mavzuga kirish va Hayotiy ahamiyati

**Kvadrat tengsizlik** — bu o'zgaruvchi $x$ ning ikkinchi darajali ko'phadidan tashkil topgan tengsizlikdir:
$$ax^2 + bx + c > 0, \\quad ax^2 + bx + c < 0, \\quad ax^2 + bx + c \\ge 0, \\quad ax^2 + bx + c \\le 0 \\quad (a \\neq 0)$$

#### 🎯 Nima uchun kerak va hayotiy misol?
Tasavvur qiling, to'p vertikal yuqoriga $v_0 = 20 \\text{ m/s}$ boshlang'ich tezlik bilan otildi. Fizika qonuniyatiga ko'ra, uning $t$ vaqtdagi yer sathidan balandligi quyidagi formula bilan aniqlanadi:
$$h(t) = 20t - 5t^2$$
Savol: to'p qaysi vaqt oralig'ida $15 \\text{ metr}$ dan balandda bo'ladi?
Buni topish uchun tengsizlik tuzamiz:
$$20t - 5t^2 > 15 \\implies -5t^2 + 20t - 15 > 0 \\implies t^2 - 4t + 3 < 0$$
Bu aynan **kvadrat tengsizlikdir**! Uni yechish orqali to'p $t \\in (1; 3)$ soniyalar oralig'ida (ya'ni 1-soniyadan 3-soniyagacha) 15 metrdan balandda uchib yurishini aniqlaymiz.

---

### 2. Asosiy tushunchalar va Grafik talqin

Kvadrat uchhad $y = ax^2 + bx + c$ ning grafigi — **parabola** hisoblanadi.
1. **$a > 0$ bo'lganda:** Parabola shoxlari yuqoriga qaragan bo'ladi.
2. **$a < 0$ bo'lganda:** Parabola shoxlari pastga qaragan bo'ladi.
3. **Parabola va $Ox$ o'qining kesishishi:** $ax^2 + bx + c = 0$ tenglamaning ildizlari $x_1$ va $x_2$ bo'lsin ($x_1 < x_2$). Bu nuqtalar parabolaning $Ox$ o'qi bilan kesishish nuqtalaridir.

\`\`\`svg
<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="w-full text-foreground">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect width="700" height="240" rx="14" fill="#0f172a" fill-opacity="0.04" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.2"/>
  
  <!-- Axis -->
  <line x1="40" y1="140" x2="660" y2="140" stroke="currentColor" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="665" y="145" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="currentColor">Ox</text>
  
  <line x1="120" y1="210" x2="120" y2="30" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrow)"/>
  <text x="125" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="currentColor">Oy</text>

  <!-- Parabola a > 0 -->
  <path d="M 160,40 Q 350,230 540,40" fill="none" stroke="#3b82f6" stroke-width="3.5"/>

  <!-- Shaded areas -->
  <!-- Positive region (left) -->
  <path d="M 160,40 Q 230,110 250,140 L 160,140 Z" fill="#22c55e" fill-opacity="0.15"/>
  <!-- Negative region (middle) -->
  <path d="M 250,140 Q 350,230 450,140 Z" fill="#ef4444" fill-opacity="0.18"/>
  <!-- Positive region (right) -->
  <path d="M 450,140 Q 470,110 540,40 L 540,140 Z" fill="#22c55e" fill-opacity="0.15"/>

  <!-- Roots -->
  <circle cx="250" cy="140" r="6" fill="#ffffff" stroke="#3b82f6" stroke-width="3"/>
  <text x="250" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="currentColor">x₁ (1-ildiz)</text>

  <circle cx="450" cy="140" r="6" fill="#ffffff" stroke="#3b82f6" stroke-width="3"/>
  <text x="450" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="currentColor">x₂ (2-ildiz)</text>

  <!-- Sign Labels -->
  <rect x="175" y="80" width="45" height="26" rx="6" fill="#22c55e" fill-opacity="0.2"/>
  <text x="197" y="98" text-anchor="middle" font-size="16" font-weight="bold" fill="#16a34a">+</text>

  <rect x="328" y="165" width="45" height="26" rx="6" fill="#ef4444" fill-opacity="0.2"/>
  <text x="350" y="183" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">−</text>

  <rect x="480" y="80" width="45" height="26" rx="6" fill="#22c55e" fill-opacity="0.2"/>
  <text x="502" y="98" text-anchor="middle" font-size="16" font-weight="bold" fill="#16a34a">+</text>

  <text x="350" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="currentColor">Parabola orqali yechish (a &gt; 0, D &gt; 0 holati)</text>
  <text x="350" y="215" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="#ef4444">Ildizlar orasida: f(x) &lt; 0 (pastda)</text>
  <text x="180" y="125" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="#16a34a">f(x) &gt; 0 (yuqorida)</text>
  <text x="520" y="125" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="#16a34a">f(x) &gt; 0 (yuqorida)</text>
</svg>
\`\`\`

---

### 3. Asosiy Formulalar va Intervallar qonuniyati

Agar $ax^2 + bx + c = 0$ tenglama ikkita har xil $x_1 < x_2$ ildizga ega bo'lsa ($D > 0$), u holda ko'phadni ko'paytuvchilarga ajratamiz:
$$ax^2 + bx + c = a(x - x_1)(x - x_2)$$

#### 📐 Belgilar izohi:
- $a$ — bosh koeffitsiyent ($a \\neq 0$). Agar $a > 0$ bo'lsa, eng o'ng oraliq doimo musbat bo'ladi.
- $x_1, x_2$ — tengsizlikning chegara nuqtalari (uchhadning nollari).
- $D = b^2 - 4ac$ — diskriminant:
  - $D > 0$ bo'lsa: 2 ta haqiqiy ildiz mavjud ($x_1 \\neq x_2$).
  - $D = 0$ bo'lsa: 1 ta karrali ildiz $x_1 = x_2 = -\\frac{b}{2a}$.
  - $D < 0$ bo'lsa: haqiqiy ildiz yo'q. $a > 0$ bo'lsa, barcha $x \\in \\mathbb{R}$ da $f(x) > 0$ bo'ladi!

\`\`\`svg
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" class="w-full text-foreground">
  <defs>
    <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect width="700" height="180" rx="14" fill="#0f172a" fill-opacity="0.04" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.2"/>

  <!-- Number line -->
  <line x1="50" y1="105" x2="650" y2="105" stroke="currentColor" stroke-width="2.5" marker-end="url(#arrow2)"/>
  <text x="655" y="110" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="currentColor">x</text>

  <!-- Wavy intervals curve -->
  <path d="M 60,65 Q 160,55 240,105 Q 350,155 460,105 Q 560,55 640,65" fill="none" stroke="#6366f1" stroke-width="3"/>

  <!-- Signs -->
  <circle cx="150" cy="78" r="15" fill="#22c55e" fill-opacity="0.2"/>
  <text x="150" y="84" text-anchor="middle" font-size="18" font-weight="bold" fill="#16a34a">+</text>

  <circle cx="350" cy="132" r="15" fill="#ef4444" fill-opacity="0.2"/>
  <text x="350" y="138" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">−</text>

  <circle cx="550" cy="78" r="15" fill="#22c55e" fill-opacity="0.2"/>
  <text x="550" y="84" text-anchor="middle" font-size="18" font-weight="bold" fill="#16a34a">+</text>

  <!-- Point dots -->
  <circle cx="240" cy="105" r="7" fill="white" stroke="#6366f1" stroke-width="3"/>
  <text x="240" y="135" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="currentColor">x₁</text>

  <circle cx="460" cy="105" r="7" fill="white" stroke="#6366f1" stroke-width="3"/>
  <text x="460" y="135" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="currentColor">x₂</text>

  <text x="350" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="currentColor">To'lqinlar (Intervallar) usuli: (x - x₁)(x - x₂)</text>
  <text x="150" y="52" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#16a34a">(-∞; x₁) musbat</text>
  <text x="350" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#ef4444">(x₁; x₂) manfiy</text>
  <text x="550" y="52" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#16a34a">(x₂; +∞) musbat</text>
</svg>
\`\`\`

---

### 4. Qanday ishlatiladi — Qadamma-qadam algoritm

Intervallar usuli yordamida kvadrat yoki kasr-ratsional tengsizlikni yechish uchun quyidagi **6 qadamli qat'iy algoritm**ga amal qiling:

1. **1-qadam (Standart shaklga keltirish):** Barcha hadlarni chap tomonga o'tkazib, o'ng tomonda $0$ qoldiring: $P(x) > 0$ yoki $P(x) < 0$.
2. **2-qadam ($a > 0$ qilish):** Agar bosh koeffitsiyent $a < 0$ bo'lsa, tengsizlikning har ikkala tomonini $-1$ ga ko'paytiring va **tengsizlik ishorasini teskarisiga almashtiring**!
3. **3-qadam (Ildizlarni topish):** Kvadrat tenglamani $ax^2 + bx + c = 0$ yechib, ildizlar $x_1$ va $x_2$ ni toping.
4. **4-qadam (Sonlar o'qiga joylashtirish):**
   - Son o'qida ildizlarni kichigidan kattasiga qarab joylashtiring.
   - **Qat'iy tengsizlik** ($<, >$) bo'lsa: nuqtalar ochiq doiracha $\\circ$ qilib belgilanadi (javobda yumaloq qavslar $($ va $)$).
   - **Noqat'iy tengsizlik** ($\\le, \\ge$) bo'lsa: nuqtalar bo'yalgan $\\bullet$ qilib belgilanadi (javobda to'rtburchak qavslar $[$ va $]$).
5. **5-qadam (Ishoralarni aniqlash):** Eng o'ng oraliqdan boshlab navbatma-navbat ishoralarni qo'ying: **$+$**, **$-$**, **$+$** (agar karrali ildiz bo'lmasa).
6. **6-qadam (Javobni oraliq ko'rinishida yozish):**
   - Agar $< 0$ yoki $\\le 0$ so'ralgan bo'lsa: **$-$** ishorali oraliq tanlanadi: $(x_1; x_2)$.
   - Agar $> 0$ yoki $\\ge 0$ so'ralgan bo'lsa: **$+$** ishorali oraliqlar tanlanadi: $(-\\infty; x_1) \\cup (x_2; +\\infty)$.

---

### 7. Muhim joylar va Oltin qoidalar

> ⚠️ **1-KO'P QILINADIGAN XATO:** Tengsizlikning ikkala tomonini manfiy songa ko'paytirganda yoki bo'lganda ishorani o'zgartirishni unutish!  
> Masalan: $-2x < 6 \\implies x > -3$ bo'lishi shart ($<$ emas!).

> ⚠️ **2-KO'P QILINADIGAN XATO:** Kasr tengsizliklarda $\\frac{P(x)}{Q(x)} \\le 0$ maxrajni shunchaki tashlab yuborish mumkin emas!  
> Maxraj hech qachon nolga teng bo'lolmaydi: $Q(x) \\neq 0$. Shuning uchun noqat'iy tengsizlikda ham maxrajning ildizlari doimo **ochiq nuqta $\\circ$** va yumaloq qavs bilan olinadi!

> 💡 **ESLAB QOLISH UCHUN LAYFXAK:** Agar $a > 0$ va $D > 0$ bo'lsa:  
> - $f(x) < 0$ ning yechimi doimo **ildizlar orasida**: $(x_1; x_2)$  
> - $f(x) > 0$ ning yechimi doimo **ildizlar tashqarisida**: $(-\\infty; x_1) \\cup (x_2; +\\infty)$`,
        order: 8,
        workedExamples: [
            {
                title: 'Oddiy kvadrat tengsizlikni yechish',
                question: '$x^2 - 5x + 6 < 0$ tengsizlikni yeching.',
                solution: `**1-qadam:** $x^2 - 5x + 6 = 0$ tenglama ildizlarini Viet teoremasi bo'yicha topamiz:
$$x_1 + x_2 = 5, \\quad x_1 \\cdot x_2 = 6 \\implies x_1 = 2, \\quad x_2 = 3$$

**2-qadam:** Ifodani ko'paytuvchilarga ajratamiz:
$$(x - 2)(x - 3) < 0$$

**3-qadam:** Son o'qida $x = 2$ va $x = 3$ nuqtalarni belgilaymiz. Tengsizlik qat'iy ($<$), shuning uchun nuqtalar ochiq: $\\circ$.

**4-qadam:** Oraliqlardagi ishoralarni aniqlaymiz:
- $x > 3$ bo'lganda (masalan, $x=4$): $(4-2)(4-3) = 2 > 0$ ($+$)
- $2 < x < 3$ bo'lganda (masalan, $x=2.5$): $(2.5-2)(2.5-3) = -0.25 < 0$ ($-$)
- $x < 2$ bo'lganda (masalan, $x=0$): $(0-2)(0-3) = 6 > 0$ ($+$)

**5-qadam:** Bizdan $< 0$ (manfiy soha) so'ralgan.
**Javob:** $x \\in (2; 3)$.`,
                ruleSummary: 'a > 0 bo\'lganda f(x) < 0 tengsizlikning yechimi ildizlar oralig\'i bo\'ladi: (x₁; x₂).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                title: 'Noqat\'iy kvadrat tengsizlik (a > 1)',
                question: '$2x^2 + 3x - 5 \\ge 0$ tengsizlikni yeching.',
                solution: `**1-qadam:** Kvadrat tenglamani yechamiz: $2x^2 + 3x - 5 = 0$.
$$D = b^2 - 4ac = 3^2 - 4 \\cdot 2 \\cdot (-5) = 9 + 40 = 49 = 7^2$$
$$x_1 = \\frac{-3 - 7}{2 \\cdot 2} = \\frac{-10}{4} = -2.5, \\quad x_2 = \\frac{-3 + 7}{4} = 1$$

**2-qadam:** Tengsizlik noqat'iy ($\\ge$), shuning uchun $-2.5$ va $1$ nuqtalar bo'yaladi (javobga kiradi).

**3-qadam:** Oraliqlar: $(-\\infty; -2.5]$, $[-2.5; 1]$, $[1; +\\infty)$.
Bosh koeffitsiyent $a = 2 > 0$, demak ishoralar: $+$, $-$, $+$.

**4-qadam:** Bizdan $\\ge 0$ (musbat va nol) so'ralgan, demak chetki oraliqlarni birlashtiramiz.
**Javob:** $x \\in (-\\infty; -2.5] \\cup [1; +\\infty)$.`,
                ruleSummary: 'Noqat\'iy tengsizlikda chegara nuqtalar yechimga kiradi va to\'rtburchak qavs [ ] qo\'yiladi.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 2,
            },
            {
                title: 'Kasr-ratsional tengsizlik va intervallar usuli',
                question: '$\\frac{x - 1}{x + 4} \\le 0$ tengsizlikni yeching.',
                solution: `**1-qadam:** Surat va maxrajning nollarini topamiz:
- Surat noli: $x - 1 = 0 \\implies x = 1$
- Maxraj noli: $x + 4 = 0 \\implies x = -4$

**2-qadam:** MUHIM QOIDA: Maxraj $0$ bo'lishi mumkin emas, demak $x \\neq -4$!
Shuning uchun $-4$ nuqta ochiq qoladi ($(-4$)), suratdagi $1$ esa noqat'iy bo'lgani uchun bo'yaladi ($[1]$).

**3-qadam:** Oraliqlardagi ishoralar:
- $x > 1$ da: musbat ($+$)
- $-4 < x < 1$ da: manfiy ($-$)
- $x < -4$ da: musbat ($+$)

**4-qadam:** Bizga $\\le 0$ kerak.
**Javob:** $x \\in (-4; 1]$.`,
                ruleSummary: 'Maxrajning nollari hech qachon yechimga kirmaydi, doimo yumaloq qavs qo\'yiladi.',
                difficulty: DifficultyLevel.HARD,
                order: 3,
            },
        ],
        practiceQuestions: [
            {
                question: '$x^2 - 9 < 0$ tengsizlikning barcha butun yechimlari sonini toping.',
                options: ['A) 5 ta', 'B) 6 ta', 'C) 7 ta', 'D) 4 ta'],
                correctAnswer: 'A',
                correctCustomAnswer: '5',
                explanation: '$x^2 - 9 < 0 \\implies (x - 3)(x + 3) < 0$. Ildizlar: $-3$ va $3$. Oraliq: $(-3; 3)$. Butun sonlar: $-2, -1, 0, 1, 2$. Jami 5 ta.',
                hint: 'Qisqa ko\'paytirish formulasi: x² - 9 = (x - 3)(x + 3).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                question: '$(x - 2)(x - 5) \\le 0$ tengsizlikning yechimi qaysi oraliq bo\'ladi?',
                options: ['A) [2; 5]', 'B) (-\\infty; 2] U [5; +\\infty)', 'C) (2; 5)', 'D) [0; 5]'],
                correctAnswer: 'A',
                correctCustomAnswer: '[2; 5]',
                explanation: 'Nollar $x=2$ va $x=5$. Bosh koeffitsiyent musbat, shuning uchun ko\'paytma 0 dan kichik yoki teng bo\'lgan oraliq $[2; 5]$ bo\'ladi.',
                hint: 'Noqat\'iy tengsizlikda chegara nuqtalar kiradi va to\'rtburchak qavs qo\'yiladi.',
                difficulty: DifficultyLevel.EASY,
                order: 2,
            },
            {
                question: '$\\frac{x - 3}{x + 1} > 0$ tengsizlikni yeching.',
                options: ['A) (-\\infty; -1) U (3; +\\infty)', 'B) (-1; 3)', 'C) [-1; 3]', 'D) (3; +\\infty)'],
                correctAnswer: 'A',
                correctCustomAnswer: '(-\\infty; -1) U (3; +\\infty)',
                explanation: 'Nollar: $x = -1$ va $x = 3$. Oraliqlar: $(-\\infty; -1)$, $(-1; 3)$, $(3; +\\infty)$. Ishoralar: $+$, $-$, $+$. Musbat soha so\'ralgan: $(-\\infty; -1) \\cup (3; +\\infty)$.',
                hint: 'Kasrning ishorasi surat va maxraj ko\'paytmasining ishorasi bilan bir xil.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 3,
            },
        ],
    },
    {
        title: 'Arifmetik progressiya va uning xossalari',
        description: 'Arifmetik progressiyaning n-hadi va dastlabki n ta hadi yig\'indisi formulasi.',
        theoryContent: `### Arifmetik progressiya

1. **Ta'rif:** Har bir hadi oldingisiga o'zgarmas $d$ sonini qo'shishdan hosil bo'ladigan ketma-ketlik: $a_{n+1} = a_n + d$.
2. **$n$-hadi formulasi:**
   $$a_n = a_1 + (n - 1)d$$
3. **Dastlabki $n$ ta hadi yig'indisi:**
   $$S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)d}{2} \\cdot n$$`,
        order: 9,
        workedExamples: [
            {
                title: 'Arifmetik progressiya hadi',
                question: '$a_1 = 3, d = 4$ bo\'lsa, $a_{10}$ ni toping.',
                solution: '$a_{10} = a_1 + 9d = 3 + 9 \\cdot 4 = 3 + 36 = 39$.',
                ruleSummary: '$a_n = a_1 + (n-1)d$ formulasiga qo\'yamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$2, 5, 8, \\dots$ arifmetik progressiyaning 6-hadini toping.',
                options: ['A) 15', 'B) 17', 'C) 18', 'D) 20'],
                correctAnswer: 'B',
                correctCustomAnswer: '17',
                explanation: '$a_1 = 2, d = 3$. $a_6 = 2 + 5 \\cdot 3 = 17$.',
                hint: 'Dastlab ayirma d ni toping: d = 5 - 2 = 3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Geometrik progressiya va uning xossalari',
        description: 'Geometrik progressiyaning n-hadi, yig\'indisi va cheksiz kamayuvchi geometrik progressiya.',
        theoryContent: `### Geometrik progressiya

1. **Ta'rif:** $b_{n+1} = b_n \\cdot q$ ($q \\neq 0$).
2. **$n$-hadi formulasi:**
   $$b_n = b_1 \\cdot q^{n-1}$$
3. **Yig'indi formulasi:**
   $$S_n = \\frac{b_1(q^n - 1)}{q - 1} \\quad (q \\neq 1)$$
4. **Cheksiz kamayuvchi geometrik progressiya yig'indisi ($|q| < 1$):**
   $$S = \\frac{b_1}{1 - q}$$`,
        order: 10,
        workedExamples: [
            {
                title: 'Geometrik progressiya hadi',
                question: '$b_1 = 2, q = 3$ bo\'lsa, $b_4$ ni toping.',
                solution: '$b_4 = b_1 \\cdot q^3 = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$.',
                ruleSummary: '$b_n = b_1 \\cdot q^{n-1}$ formulasi qo\'llaniladi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$b_1 = 5, q = 2$ bo\'lgan geometrik progressiyaning 4-hadi nechiga teng?',
                options: ['A) 20', 'B) 40', 'C) 80', 'D) 30'],
                correctAnswer: 'B',
                correctCustomAnswer: '40',
                explanation: '$b_4 = 5 \\cdot 2^3 = 5 \\cdot 8 = 40$.',
                hint: 'b_4 = b_1 * q^3.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Kombinatorika elementlari',
        description: 'O\'rin almashtirish, o\'rinlashtirish va guruhlash (kombinatsiya) formulalari.',
        theoryContent: `### Kombinatorika formulalari

1. **Faktorial:** $n! = 1 \\cdot 2 \\cdot 3 \\dots n$, $0! = 1$.
2. **O'rin almashtirish (Permutatsiya):**
   $$P_n = n!$$
3. **O'rinlashtirish:**
   $$A_n^k = \\frac{n!}{(n - k)!}$$
4. **Guruhlash (Kombinatsiya):**
   $$C_n^k = \\frac{n!}{k!(n - k)!}$$`,
        order: 11,
        workedExamples: [
            {
                title: 'Guruhlashni hisoblash',
                question: '$C_5^2$ ni hisoblang.',
                solution: '$C_5^2 = \\frac{5!}{2!(5-2)!} = \\frac{5 \\cdot 4}{2 \\cdot 1} = 10$.',
                ruleSummary: 'Kombinatsiya formulasidan foydalanamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$P_4$ (4 ta elementning o\'rin almashtirishlari soni) nechiga teng?',
                options: ['A) 12', 'B) 16', 'C) 24', 'D) 20'],
                correctAnswer: 'C',
                correctCustomAnswer: '24',
                explanation: '$P_4 = 4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$.',
                hint: '4 faktorialni hisoblang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Ehtimollik nazariyasi va statistika asoslari',
        description: 'Klassik ehtimollik ta\'rifi, tasodifiy hodisalar va o\'rtacha statistik ko\'rsatkichlar.',
        theoryContent: `### Klassik ehtimollik

1. **Ta'rif:**
   $$P(A) = \\frac{m}{n}$$
   bu yerda $m$ — $A$ hodisaga qulaylik tug'diruvchi hollar soni, $n$ — barcha teng imkoniyatli hollar soni.
2. $0 \\le P(A) \\le 1$.
   - Muqarrar hodisa ehtimoli: $P = 1$.
   - Mumkin bo'lmagan hodisa ehtimoli: $P = 0$.`,
        order: 12,
        workedExamples: [
            {
                title: "O'yin soqqasi tashlanganda",
                question: 'O\'yin soqqasi bir marta tashlanganda juft son tushish ehtimolini toping.',
                solution: 'Jami hollar $n = 6$ ($1, 2, 3, 4, 5, 6$). Qulay hollar $m = 3$ ($2, 4, 6$). $P = \\frac{3}{6} = 0.5$.',
                ruleSummary: 'P = m / n klassik formulasidan foydalanamiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Qutida 3 ta oq va 7 ta qora shar bor. Tavakkaliga olingan sharning oq bo\'lish ehtimolini toping.',
                options: ['A) 0.3', 'B) 0.7', 'C) 0.35', 'D) 0.5'],
                correctAnswer: 'A',
                correctCustomAnswer: '0.3',
                explanation: '$m = 3$, $n = 3 + 7 = 10$. $P = 3/10 = 0.3$.',
                hint: 'Oq sharlar sonini umumiy sharlar soniga bo\'ling.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];

export const GRADE_9_GEOMETRIYA_TOPICS: ParsedTopicInput[] = [
    {
        title: 'Uchburchaklar va to\'rtburchaklar (Takrorlash)',
        description: 'Uchburchaklar turlari, to\'rtburchaklar (parallelogramm, to\'g\'ri to\'rtburchak, romb, kvadrat, trapetsiya).',
        theoryContent: `### Uchburchak va to'rtburchaklar

1. **Uchburchak ichki burchaklari yig'indisi:** $\\alpha + \\beta + \\gamma = 180^\\circ$.
2. **Parallelogramm xossalari:**
   - Qarama-qarshi tomonlari teng va parallel.
   - Diagonallari kesishish nuqtasida teng ikkiga bo'linadi.
3. **Romb:** Barcha tomonlari teng parallelogramm. Diagonallari o'zaro perpendikulyar va burchak bissektrisalaridir.`,
        order: 1,
        workedExamples: [
            {
                title: 'Uchburchak burchagini topish',
                question: 'Uchburchakning ikki burchagi $45^\\circ$ va $65^\\circ$. Uchinchi burchakni toping.',
                solution: '$180^\\circ - (45^\\circ + 65^\\circ) = 180^\\circ - 110^\\circ = 70^\\circ$.',
                ruleSummary: 'Ichki burchaklar yig\'indisi 180 gradus.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Teng yonli uchburchakning asosidagi burchagi $50^\\circ$. Uchidagi burchagini toping.',
                options: ['A) 50°', 'B) 65°', 'C) 80°', 'D) 100°'],
                correctAnswer: 'C',
                correctCustomAnswer: '80',
                explanation: 'Asosidagi burchaklar teng: $50^\\circ + 50^\\circ = 100^\\circ$. Uchidagi burchak: $180^\\circ - 100^\\circ = 80^\\circ$.',
                hint: 'Teng yonli uchburchakda asosga yopishgan burchaklar o\'zaro teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Pifagor teoremasi va uning tatbiqlari',
        description: 'To\'g\'ri burchakli uchburchakda gipotenuza va katetlar orasidagi munosabat.',
        theoryContent: `### Pifagor teoremasi

To'g'ri burchakli uchburchakda gipotenuzaning kvadrati katetlar kvadratlarining yig'indisiga teng:
$$c^2 = a^2 + b^2$$
bu yerda $a, b$ — katetlar, $c$ — gipotenuza.

Misr uchburchagi: tomonlari $3, 4, 5$ bo'lgan to'g'ri burchakli uchburchak.`,
        order: 2,
        workedExamples: [
            {
                title: 'Gipotenuzani topish',
                question: 'Katetlari $a = 6$ cm va $b = 8$ cm bo\'lgan to\'g\'ri burchakli uchburchak gipotenuzasini toping.',
                solution: '$c^2 = 6^2 + 8^2 = 36 + 64 = 100 \\Rightarrow c = 10$ cm.',
                ruleSummary: 'c = sqrt(a^2 + b^2) formulasini qo\'llaymiz.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Gipotenuzasi 13 cm, bir kateti 5 cm bo\'lgan to\'g\'ri burchakli uchburchakning ikkinchi katetini toping.',
                options: ['A) 8 cm', 'B) 10 cm', 'C) 12 cm', 'D) 11 cm'],
                correctAnswer: 'C',
                correctCustomAnswer: '12',
                explanation: '$b = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm.',
                hint: 'b^2 = c^2 - a^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Geometrik shakllarning perimetri va yuzini hisoblash',
        description: 'Uchburchak, to\'g\'ri to\'rtburchak, parallelogramm, trapetsiya va romb yuzasi formulalari.',
        theoryContent: `### Yuz formulalari

1. **Uchburchak:** $S = \\frac{1}{2}ah = \\frac{1}{2}ab \\sin \\alpha = \\sqrt{p(p-a)(p-b)(p-c)}$ (Geron formulasi).
2. **Parallelogramm:** $S = ah = ab \\sin \\alpha$.
3. **Romb:** $S = ah = \\frac{1}{2}d_1 d_2$.
4. **Trapetsiya:** $S = \\frac{a + b}{2} \\cdot h$.`,
        order: 3,
        workedExamples: [
            {
                title: 'Trapetsiya yuzini hisoblash',
                question: 'Asoslari $6$ cm va $10$ cm, balandligi $4$ cm bo\'lgan trapetsiya yuzini toping.',
                solution: '$S = \\frac{6 + 10}{2} \\cdot 4 = \\frac{16}{2} \\cdot 4 = 8 \\cdot 4 = 32 \\text{ cm}^2$.',
                ruleSummary: 'S = (a+b)/2 * h o\'rta chiziq ko\'paytirilgan balandlik.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Diagonallari 8 cm va 12 cm bo\'lgan rombning yuzini toping.',
                options: ['A) 48 cm^2', 'B) 96 cm^2', 'C) 24 cm^2', 'D) 36 cm^2'],
                correctAnswer: 'A',
                correctCustomAnswer: '48',
                explanation: '$S = \\frac{1}{2} \\cdot 8 \\cdot 12 = 48 \\text{ cm}^2$.',
                hint: 'Romb yuzi diagonallar ko\'paytmasining yarmiga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'O\'xshash uchburchaklar va o\'xshashlik alomatlari',
        description: 'Uchburchaklar o\'xshashligining I, II va III alomatlari hamda yuzlar nisbati.',
        theoryContent: `### Uchburchaklar o'xshashligi

$\\triangle ABC \\sim \\triangle A_1B_1C_1$ bo'lsa:
1. Mos burchaklar teng: $\\angle A = \\angle A_1, \\angle B = \\angle B_1, \\angle C = \\angle C_1$.
2. Mos tomonlar proporsional: $\\frac{AB}{A_1B_1} = \\frac{BC}{B_1C_1} = \\frac{AC}{A_1C_1} = k$ (o'xshashlik koeffitsiyenti).
3. **Yuzlar nisbati:** O'xshash uchburchaklar yuzlarining nisbati o'xshashlik koeffitsiyentining kvadratiga teng:
   $$\\frac{S}{S_1} = k^2$$`,
        order: 4,
        workedExamples: [
            {
                title: 'O\'xshashlik koeffitsiyenti',
                question: 'Ikkita o\'xshash uchburchakning tomonlari nisbati $k = 3$. Ularning yuzlari nisbatini toping.',
                solution: '$\\frac{S_1}{S_2} = k^2 = 3^2 = 9$.',
                ruleSummary: 'Yuzlar nisbati k^2 ga teng.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'O\'xshash uchburchaklar perimetrlari nisbati 2:5 bo\'lsa, ularning yuzlari nisbati qanday bo\'ladi?',
                options: ['A) 2:5', 'B) 4:10', 'C) 4:25', 'D) 8:125'],
                correctAnswer: 'C',
                correctCustomAnswer: '4/25',
                explanation: 'Perimetrlar nisbati $k = 2/5$. Yuzlar nisbati $k^2 = (2/5)^2 = 4/25$.',
                hint: 'Yuzlar nisbati chiziqli o\'lchamlar nisbatining kvadratiga teng.',
                difficulty: DifficultyLevel.MEDIUM,
                order: 1,
            },
        ],
    },
    {
        title: 'To\'g\'ri burchakli uchburchakda trigonometrik nisbatlar',
        description: 'Sinus, kosinus, tangens va kotangensning geometrik ta\'riflari.',
        theoryContent: `### To'g'ri burchakli uchburchakda trigonometriya

To'g'ri burchakli uchburchakda o'tkir burchak $\\alpha$ uchun:
- **Sinus:** Qarshisidagi katetning gipotenuzaga nisbati: $\\sin \\alpha = \\frac{a}{c}$
- **Kosinus:** Yopishgan katetning gipotenuzaga nisbati: $\\cos \\alpha = \\frac{b}{c}$
- **Tangens:** Qarshisidagi katetning yopishgan katetga nisbati: $\\text{tg } \\alpha = \\frac{a}{b}$
- **Asosiy ayniyat:** $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$`,
        order: 5,
        workedExamples: [
            {
                title: 'Sinusni hisoblash',
                question: 'Katetlari $3$ va $4$, gipotenuzasi $5$ bo\'lgan uchburchakda kichik burchak sinusini toping.',
                solution: 'Kichik burchak qarshisida kichik katet (3) yotadi. $\\sin \\alpha = \\frac{3}{5} = 0.6$.',
                ruleSummary: 'sin = qarama-qarshi katet / gipotenuza.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Agar $\\cos \\alpha = 0.8$ bo\'lsa, $\\sin \\alpha$ ni toping ($0^\\circ < \\alpha < 90^\\circ$).',
                options: ['A) 0.2', 'B) 0.6', 'C) 0.4', 'D) 0.5'],
                correctAnswer: 'B',
                correctCustomAnswer: '0.6',
                explanation: '$\\sin \\alpha = \\sqrt{1 - \\cos^2 \\alpha} = \\sqrt{1 - 0.64} = \\sqrt{0.36} = 0.6$.',
                hint: 'Asosiy trigonometrik ayniyatdan foydalaning.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Tekislikda vektorlar va ular ustida amallar',
        description: 'Vektor tushunchasi, uzunligi, yo\'nalishi, vektorlarni qo\'shish va ayirish.',
        theoryContent: `### Vektorlar

1. **Vektor:** Yo'naltirilgan kesma. $\\vec{a} = (x; y)$.
2. **Vektor uzunligi (moduli):**
   $$|\\vec{a}| = \\sqrt{x^2 + y^2}$$
3. **Vektorlarni qo'shish va ayirish:**
   $$\\vec{a} + \\vec{b} = (x_1 + x_2; y_1 + y_2)$$
   $$\\vec{a} - \\vec{b} = (x_1 - x_2; y_1 - y_2)$$`,
        order: 6,
        workedExamples: [
            {
                title: 'Vektor uzunligini topish',
                question: '$\\vec{a} = (3; 4)$ vektorning uzunligini toping.',
                solution: '$|\\vec{a}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
                ruleSummary: '|a| = sqrt(x^2 + y^2).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: '$\\vec{a} = (2; -1)$ va $\\vec{b} = (3; 5)$ bo\'lsa, $\\vec{a} + \\vec{b}$ vektor koordinatalarini toping.',
                options: ['A) (5; 4)', 'B) (5; 6)', 'C) (-1; 4)', 'D) (1; 6)'],
                correctAnswer: 'A',
                correctCustomAnswer: '(5; 4)',
                explanation: 'Mos koordinatalar qo\'shiladi: $(2+3; -1+5) = (5; 4)$.',
                hint: 'x larni alohida, y larni alohida qo\'shing.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Vektorlarning skalyar ko\'paytmasi',
        description: 'Skalyar ko\'paytma formulasi va ikki vektor orasidagi burchak.',
        theoryContent: `### Skalyar ko'paytma

1. **Ta'rif:** Ikki vektorning skalyar ko'paytmasi ularning modullari va ular orasidagi burchak kosinusi ko'paytmasiga teng:
   $$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos \\varphi$$
2. **Koordinatalar orqali:**
   $$\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2$$
3. **Perpendikulyarlik sharti:**
   $$\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0$$`,
        order: 7,
        workedExamples: [
            {
                title: 'Skalyar ko\'paytmani hisoblash',
                question: '$\\vec{a} = (2; 3)$ va $\\vec{b} = (4; -1)$ vektorlarning skalyar ko\'paytmasini toping.',
                solution: '$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 4 + 3 \\cdot (-1) = 8 - 3 = 5$.',
                ruleSummary: 'a * b = x1*x2 + y1*y2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Qaysi holda vektorlar o\'zaro perpendikulyar bo\'ladi?',
                options: ['A) a * b = 1', 'B) a * b = 0', 'C) a * b = -1', 'D) |a| = |b|'],
                correctAnswer: 'B',
                correctCustomAnswer: 'B',
                explanation: 'Perpendikulyar vektorlar orasidagi burchak 90 gradus, cos(90) = 0, shuning uchun skalyar ko\'paytma 0 bo\'ladi.',
                hint: 'cos(90°) = 0 ekanini eslang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Muntazam ko\'pburchaklar va aylanaga ichki/tashqi chizilgan shakllar',
        description: 'Muntazam ko\'pburchak burchaklari, ichki va tashqi chizilgan aylanalar radiuslari.',
        theoryContent: `### Muntazam ko'pburchaklar

1. Barcha tomonlari va barcha burchaklari teng bo'lgan ko'pburchak.
2. Ichki burchagi: $\\alpha = \\frac{(n - 2) \\cdot 180^\\circ}{n}$.
3. Muntazam uchburchak: $R = \\frac{a}{\\sqrt{3}}, r = \\frac{a}{2\\sqrt{3}}$.
4. Kvadrat: $R = \\frac{a}{\\sqrt{2}}, r = \\frac{a}{2}$.`,
        order: 8,
        workedExamples: [
            {
                title: 'Muntazam oltiburchak burchagi',
                question: 'Muntazam oltiburchakning bitta ichki burchagini toping.',
                solution: '$\\alpha = \\frac{(6 - 2) \\cdot 180^\\circ}{6} = \\frac{4 \\cdot 180^\\circ}{6} = 4 \\cdot 30^\\circ = 120^\\circ$.',
                ruleSummary: 'alpha = (n-2)*180 / n formulasi.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Muntazam sakkizburchakning bitta ichki burchagini toping.',
                options: ['A) 120°', 'B) 135°', 'C) 140°', 'D) 150°'],
                correctAnswer: 'B',
                correctCustomAnswer: '135',
                explanation: '$\\alpha = \\frac{(8-2) \\cdot 180^\\circ}{8} = \\frac{6 \\cdot 180^\\circ}{8} = 135^\\circ$.',
                hint: 'n = 8 ni formulaga qo\'ying.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Aylana yoyi uzunligi va doira yuzi',
        description: 'Aylana uzunligi, radiusi, doira yuzi va doiraviy sektor formulalari.',
        theoryContent: `### Aylana va doira formulalari

1. **Aylana uzunligi:** $C = 2\\pi R = \\pi D$.
2. **Doira yuzi:** $S = \\pi R^2$.
3. **$\\alpha$ gradusli yoy uzunligi:** $l = \\frac{\\pi R \\alpha}{180^\\circ}$.
4. **$\\alpha$ gradusli doiraviy sektor yuzi:** $S_{\\text{sektor}} = \\frac{\\pi R^2 \\alpha}{360^\\circ}$.`,
        order: 9,
        workedExamples: [
            {
                title: 'Doira yuzini topish',
                question: 'Radiusi $R = 5$ cm bo\'lgan doiraning yuzini toping.',
                solution: '$S = \\pi R^2 = \\pi \\cdot 5^2 = 25\\pi \\text{ cm}^2$.',
                ruleSummary: 'S = pi * R^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Radiusi 4 cm bo\'lgan aylananing uzunligi qancha?',
                options: ['A) 8\\pi cm', 'B) 16\\pi cm', 'C) 4\\pi cm', 'D) 12\\pi cm'],
                correctAnswer: 'A',
                correctCustomAnswer: '8*pi',
                explanation: '$C = 2\\pi R = 2\\pi \\cdot 4 = 8\\pi$ cm.',
                hint: 'C = 2*pi*R formulasini qo\'llang.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
    {
        title: 'Fazoviy jismlar va ularning tekislikdagi kesimlari',
        description: 'Stereometriyaga kirish: prizma, piramida, silindr, konus va ularning tekislik bilan kesimlari.',
        theoryContent: `### Fazoviy shakllar haqida dastlabki tushunchalar

1. **Ko'pyoqlar:** Sirti ko'pburchaklardan iborat fazoviy jismlar (prizma, piramida, kub, parallelepiped).
2. **Aylanma jismlar:** Silindr, konus, shar.
3. **Kesim:** Fazoviy jismni tekislik bilan kesganda hosil bo'ladigan tekis geometrik figura.`,
        order: 10,
        workedExamples: [
            {
                title: 'Kubning diagonali',
                question: 'Qirrasi $a$ bo\'lgan kubning fazoviy diagonalini toping.',
                solution: 'Kubning diagonali $d = \\sqrt{a^2 + a^2 + a^2} = \\sqrt{3a^2} = a\\sqrt{3}$.',
                ruleSummary: 'd = a*sqrt(3).',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
        practiceQuestions: [
            {
                question: 'Qirrasi 4 cm bo\'lgan kubning to\'la sirti yuzini toping.',
                options: ['A) 64 cm^2', 'B) 96 cm^2', 'C) 48 cm^2', 'D) 16 cm^2'],
                correctAnswer: 'B',
                correctCustomAnswer: '96',
                explanation: 'Kubda 6 ta kvadrat yoq bor: $S = 6a^2 = 6 \\cdot 4^2 = 6 \\cdot 16 = 96 \\text{ cm}^2$.',
                hint: 'S = 6*a^2.',
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
        ],
    },
];
