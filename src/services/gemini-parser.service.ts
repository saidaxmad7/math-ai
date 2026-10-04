import { DifficultyLevel } from '@prisma/client';

import { getCurriculumTopics } from '@/constants/curriculum';
import { aiProvider } from '@/lib/ai/provider';
import type { ParsedTopicInput } from '@/repositories/book.repository';

const SYSTEM_PROMPT = `Siz O'zbekiston umumta'lim maktablarining 9-11 sinf matematika va geometriya darsliklarini tahlil qiluvchi va undan elektron o'quv materiallari tayyorlovchi professional AI metodistsiz.

Sizning vazifangiz darslikdagi har bir mavzuni quyidagi 4 ta asosiy qismga ajratish:
1. **Mavzu nazariyasi va qoidalari (Theory & Rules):**
   - Barcha ta'riflar, formulalar va matematik qoidalar.
   - Matematik formulalar KaTeX formatida bo'lishi shart (masalan: inline $a^m \\cdot a^n = a^{m+n}$ yoki display $$(a+b)^2 = a^2 + 2ab + b^2$$).
   - Tushuntirishlar sodda, aniq va o'zbek tilida berilishi kerak.

2. **Namunaviy yechilgan misollar (Worked Examples):**
   - Kitobdagi yechimi ko'rsatilgan namunaviy misollar.
   - Har bir misolda: savol, qadamma-qadam to'liq yechim va qo'llanilgan formula/qoidaning qisqa izohi.
   - Qiyinlik darajalari: EASY (Oson), MEDIUM (O'rtacha), HARD (Qiyin).

3. **Mustaqil masalalar va test savollari (Practice Questions):**
   - Har bir mavzudan 4 ta variantli (A, B, C, D) test savollari.
   - Har bir savolda:
     * question: Savol matni (KaTeX bilan)
     * options: 4 ta variant (masalan: ["A) 12", "B) 16", "C) 24", "D) 32"])
     * correctAnswer: To'g'ri variant harfi ("A", "B", "C" yoki "D")
     * correctCustomAnswer: 5-variant uchun aniq matematik qiymat (masalan: "32", "x = 4", "1/2")
     * explanation: Savolning batafsil qadamma-qadam yechimi
     * hint: Yordamchi maslahat
     * difficulty: EASY, MEDIUM yoki HARD

MUHIM QAT'IY TALAB: Javobni FAQAT to'g'ri JSON formatida qaytaring. JSON ichidagi barcha LaTeX formulalarida teskari slesh (\) belgilarini iloji boricha ikkita qilib yozing (masalan, \\frac, \\sqrt, \\cdot, \\pm). Boshqa hech qanday ortiqcha matn yozmang:
{
  "topics": [
    {
      "title": "Mavzu nomi",
      "description": "Mavzuning qisqa tavsifi",
      "theoryContent": "To'liq nazariya va qoidalar markdown va KaTeX da",
      "order": 1,
      "workedExamples": [
        {
          "title": "Namunaviy misol 1",
          "question": "Misol matni",
          "solution": "Qadamma-qadam yechim",
          "ruleSummary": "Qo'llanilgan qoida",
          "difficulty": "EASY",
          "order": 1
        }
      ],
      "practiceQuestions": [
        {
          "question": "Savol matni",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "correctAnswer": "A",
          "correctCustomAnswer": "32",
          "explanation": "To'liq yechim",
          "hint": "Maslahat",
          "difficulty": "EASY",
          "order": 1
        }
      ]
    }
  ]
}`;

function repairJsonMath(str: string): string {
    let result = '';
    let inString = false;
    let i = 0;

    while (i < str.length) {
        const char = str[i];

        if (char === '"') {
            let backslashCount = 0;
            let j = i - 1;
            while (j >= 0 && str[j] === '\\') {
                backslashCount++;
                j--;
            }
            if (backslashCount % 2 === 0) {
                inString = !inString;
            }
            result += char;
            i++;
            continue;
        }

        if (inString && char === '\\') {
            const next = str[i + 1];
            // If it escapes a quote \" or another backslash \\, keep it
            if (next === '"' || next === '\\') {
                result += char + next;
                i += 2;
                continue;
            }
            // If it's standard \n or \r, keep it
            if (next === 'n' || next === 'r') {
                result += char + next;
                i += 2;
                continue;
            }
            // For any other character (LaTeX commands: \frac, \triangle, \{, \}, \_, \alpha, etc.), double the backslash
            result += '\\\\';
            i++;
            continue;
        }

        result += char;
        i++;
    }

    return result;
}

function parseJsonResponse<T = any>(raw: string): T {
    let cleaned = raw.trim();
    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    try {
        return JSON.parse(cleaned);
    } catch {
        const repaired = repairJsonMath(cleaned);
        try {
            return JSON.parse(repaired);
        } catch {
            const noTrailingCommas = repaired.replace(/,\s*([\]}])/g, '$1');
            return JSON.parse(noTrailingCommas);
        }
    }
}

export async function parseBookWithAI(params: {
    gradeName: string;
    subjectName: string;
    bookTitle: string;
    rawTextContent?: string;
}): Promise<ParsedTopicInput[]> {
    const gradeNumberMatch = params.gradeName.match(/\d+/);
    const gradeNumber = gradeNumberMatch ? parseInt(gradeNumberMatch[0], 10) : 9;
    const prebuilt = getCurriculumTopics(gradeNumber, params.subjectName, params.bookTitle);

    if (prebuilt && prebuilt.length > 0) {
        return prebuilt;
    }

    const userPrompt = `Iltimos, "${params.gradeName}" uchun "${params.subjectName}" fanidan "${params.bookTitle}" darsligining asosiy mavzularini tahlil qiling va har bir mavzu bo'yicha nazariya, kamida 2 ta namunaviy yechilgan misol hamda kamida 6 ta moslashuvchan test savolini (EASY, MEDIUM, HARD) ajratib bering.
    
${params.rawTextContent ? `Quyida kitobdan olingan matn keltirilgan:\n${params.rawTextContent.slice(0, 15000)}` : 'Darslik standart davlat ta\'lim standarti asosida to\'liq shakllantirilsin.'}`;

    try {
        const responseText = await aiProvider.generateResponse({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt },
            ],
        });

        const parsed = parseJsonResponse(responseText);

        if (!parsed.topics || !Array.isArray(parsed.topics)) {
            throw new Error('AI qaytargan JSON strukturasi noto\'g\'ri.');
        }

        return parsed.topics.map((t: any, index: number): ParsedTopicInput => ({
            title: t.title || `Mavzu ${index + 1}`,
            description: t.description || null,
            theoryContent: t.theoryContent || '',
            order: t.order || index + 1,
            workedExamples: (t.workedExamples || []).map((ex: any, exIdx: number) => ({
                title: ex.title || `Misol ${exIdx + 1}`,
                question: ex.question || '',
                solution: ex.solution || '',
                ruleSummary: ex.ruleSummary || null,
                difficulty: (['EASY', 'MEDIUM', 'HARD'].includes(ex.difficulty) ? ex.difficulty : 'MEDIUM') as DifficultyLevel,
                order: ex.order || exIdx + 1,
            })),
            practiceQuestions: (t.practiceQuestions || []).map((q: any, qIdx: number) => ({
                question: q.question || '',
                options: Array.isArray(q.options) && q.options.length >= 4 ? q.options.slice(0, 4) : ['A) 1', 'B) 2', 'C) 3', 'D) 4'],
                correctAnswer: q.correctAnswer || 'A',
                correctCustomAnswer: q.correctCustomAnswer || null,
                explanation: q.explanation || '',
                hint: q.hint || null,
                difficulty: (['EASY', 'MEDIUM', 'HARD'].includes(q.difficulty) ? q.difficulty : (qIdx < 2 ? 'EASY' : qIdx < 5 ? 'MEDIUM' : 'HARD')) as DifficultyLevel,
                order: q.order || qIdx + 1,
            })),
        }));
    } catch (error) {
        console.error('AI Book parsing failed:', error);
        throw error;
    }
}
