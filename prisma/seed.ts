import { DifficultyLevel, PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Tozalash boshlandi...");
    await prisma.questionAttempt.deleteMany();
    await prisma.topicMistake.deleteMany();
    await prisma.quizSession.deleteMany();
    await prisma.practiceQuestion.deleteMany();
    await prisma.workedExample.deleteMany();
    await prisma.note.deleteMany();
    await prisma.bookmark.deleteMany();
    await prisma.progress.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.book.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.grade.deleteMany();

    // 1. Create Default Users
    const student = await prisma.user.upsert({
        where: { email: "student@example.com" },
        create: {
            name: "Saidahmad",
            email: "student@example.com",
            role: UserRole.USER,
        },
        update: {},
    });

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        create: {
            name: "Admin O'qituvchi",
            email: "admin@example.com",
            role: UserRole.ADMIN,
        },
        update: {},
    });

    // 2. Create Grades
    const grade9 = await prisma.grade.create({
        data: { name: "9-sinf", order: 9 },
    });
    const grade10 = await prisma.grade.create({
        data: { name: "10-sinf", order: 10 },
    });
    const grade11 = await prisma.grade.create({
        data: { name: "11-sinf", order: 11 },
    });

    // 3. Create Subjects for Grade 9
    const algebra9 = await prisma.subject.create({
        data: {
            name: "Algebra",
            color: "#3b82f6",
            icon: "Calculator",
            gradeId: grade9.id,
        },
    });

    const geometriya9 = await prisma.subject.create({
        data: {
            name: "Geometriya",
            color: "#22c55e",
            icon: "Triangle",
            gradeId: grade9.id,
        },
    });

    // 4. Create Standard Book for 9-Algebra
    const book9Alg = await prisma.book.create({
        data: {
            gradeId: grade9.id,
            subjectId: algebra9.id,
            title: "9-sinf Algebra darsligi",
            filePath: "/uploads/books/9-sinf-algebra.pdf",
            fileName: "9-sinf-algebra.pdf",
            fileSize: 15420000,
            status: "COMPLETED",
            parsedAt: new Date(),
        },
    });

    // 5. Create Topic 1: Darajalar va ularning xossalari (from qoidalar.docx)
    const topic1 = await prisma.topic.create({
        data: {
            subjectId: algebra9.id,
            bookId: book9Alg.id,
            title: "Darajalar va ularning xossalari",
            description: "Darajaning darajasi, bir xil asosli darajalarni ko'paytirish va bo'lish qoidalari.",
            order: 1,
        },
    });

    // Lesson content
    await prisma.lesson.create({
        data: {
            topicId: topic1.id,
            title: "Darajalar va ularning xossalari",
            slug: "9-darajalar-va-ularning-xossalari",
            description: "Darajaning asosiy formulalari va qoidalari",
            order: 1,
            content: `
# 1. Darajaning darajasi
$$(a^m)^n = a^{mn}$$
**Misol:** $(2^2)^5 = 2^{10} = 1024$

---

# 2. Bir xil asosli darajalarni ko'paytirish
$$a^m \\cdot a^n = a^{m+n}$$
**Misol:** $2^3 \\cdot 2^4 = 2^7 = 128$

---

# 3. Bir xil asosli darajalarni bo'lish
$$\\frac{a^m}{a^n} = a^{m-n}$$
**Misol:** $\\frac{2^8}{2^3} = 2^5 = 32$

---

# 4. Asosni almashtirish
$$4 = 2^2, \\quad 8 = 2^3, \\quad 9 = 3^2, \\quad 27 = 3^3$$
Bu murakkab misollarni soddalashtirish uchun ishlatiladi.

---

# 5. Qavslarni ochish (taqsimot qonuni)
$$(a+b)(c+d) = ac + ad + bc + bd$$
**Qoida:** Birinchi qavsdagi har bir had ikkinchi qavsdagi har bir hadga ko'paytiriladi.
            `,
        },
    });

    // 6. Worked Examples (Namunaviy misollar yechimi bilan)
    await prisma.workedExample.createMany({
        data: [
            {
                topicId: topic1.id,
                title: "1-namunaviy misol: Darajaning darajasini hisoblash",
                question: "Hisoblang: $(3^2)^3$",
                solution: "$$(3^2)^3 = 3^{2 \\cdot 3} = 3^6 = 729$$",
                ruleSummary: "$(a^m)^n = a^{mn}$ formulasiga ko'ra daraja ko'rsatkichlari o'zaro ko'paytiriladi.",
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                topicId: topic1.id,
                title: "2-namunaviy misol: Ko'paytirish va bo'lishni birgalikda qo'llash",
                question: "Ifodaning qiymatini toping: $\\frac{2^5 \\cdot 2^4}{2^6}$",
                solution: "$$\\frac{2^5 \\cdot 2^4}{2^6} = \\frac{2^{5+4}}{2^6} = \\frac{2^9}{2^6} = 2^{9-6} = 2^3 = 8$$",
                ruleSummary: "Suratda $a^m \\cdot a^n = a^{m+n}$, keyin bo'lishda $\\frac{a^p}{a^q} = a^{p-q}$ qo'llaniladi.",
                difficulty: DifficultyLevel.MEDIUM,
                order: 2,
            },
            {
                topicId: topic1.id,
                title: "3-namunaviy misol: Asosni almashtirib soddalashtirish",
                question: "Ifodani hisoblang: $\\frac{4^3 \\cdot 8^2}{16^2}$",
                solution: "$$4 = 2^2, \\quad 8 = 2^3, \\quad 16 = 2^4$$\n$$\\frac{(2^2)^3 \\cdot (2^3)^2}{(2^4)^2} = \\frac{2^6 \\cdot 2^6}{2^8} = \\frac{2^{12}}{2^8} = 2^4 = 16$$",
                ruleSummary: "Turli asoslarni bitta asosga (2 ning darajalariga) keltirib soddalashtiriladi.",
                difficulty: DifficultyLevel.HARD,
                order: 3,
            },
        ],
    });

    // 7. Practice Questions (Test savollari: A, B, C, D + custom answer)
    await prisma.practiceQuestion.createMany({
        data: [
            // EASY Questions
            {
                topicId: topic1.id,
                question: "$2^3 \\cdot 2^2$ ning qiymatini hisoblang:",
                options: ["A) 16", "B) 32", "C) 64", "D) 12"],
                correctAnswer: "B",
                correctCustomAnswer: "32",
                explanation: "$$2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32$$",
                hint: "$a^m \\cdot a^n = a^{m+n}$ qoidasidan foydalaning.",
                difficulty: DifficultyLevel.EASY,
                order: 1,
            },
            {
                topicId: topic1.id,
                question: "$(5^2)^2$ ifodaning qiymatini toping:",
                options: ["A) 125", "B) 25", "C) 625", "D) 50"],
                correctAnswer: "C",
                correctCustomAnswer: "625",
                explanation: "$$(5^2)^2 = 5^{2 \\cdot 2} = 5^4 = 625$$",
                hint: "Darajaning darajasida ko'rsatkichlar ko'paytiriladi: $(a^m)^n = a^{mn}$.",
                difficulty: DifficultyLevel.EASY,
                order: 2,
            },
            // MEDIUM Questions
            {
                topicId: topic1.id,
                question: "Ifodani hisoblang: $\\frac{3^7}{3^4}$",
                options: ["A) 9", "B) 81", "C) 27", "D) 243"],
                correctAnswer: "C",
                correctCustomAnswer: "27",
                explanation: "$$\\frac{3^7}{3^4} = 3^{7-4} = 3^3 = 27$$",
                hint: "Bo'lishda daraja ko'rsatkichlari ayriladi: $a^m / a^n = a^{m-n}$.",
                difficulty: DifficultyLevel.MEDIUM,
                order: 3,
            },
            {
                topicId: topic1.id,
                question: "Hisoblang: $\\frac{2^8 \\cdot 2^3}{2^7}$",
                options: ["A) 16", "B) 8", "C) 32", "D) 4"],
                correctAnswer: "A",
                correctCustomAnswer: "16",
                explanation: "$$\\frac{2^8 \\cdot 2^3}{2^7} = \\frac{2^{11}}{2^7} = 2^{11-7} = 2^4 = 16$$",
                hint: "Avval suratdagi darajalarni qo'shing, so'ng maxrajdagi darajani ayiring.",
                difficulty: DifficultyLevel.MEDIUM,
                order: 4,
            },
            {
                topicId: topic1.id,
                question: "Soddalashtiring: $6x - 5x + 3x$",
                options: ["A) 3x", "B) 4x", "C) 5x", "D) 2x"],
                correctAnswer: "B",
                correctCustomAnswer: "4x",
                explanation: "$$6x - 5x + 3x = (6 - 5 + 3)x = 4x$$",
                hint: "Umumiy ko'paytuvchi $x$ ni qavsdan tashqariga chiqaring.",
                difficulty: DifficultyLevel.MEDIUM,
                order: 5,
            },
            // HARD Questions
            {
                topicId: topic1.id,
                question: "Hisoblang: $\\frac{4^4 \\cdot 8^2}{2^{12}}$",
                options: ["A) 2", "B) 4", "C) 8", "D) 16"],
                correctAnswer: "B",
                correctCustomAnswer: "4",
                explanation: "$$4 = 2^2 \\implies 4^4 = (2^2)^4 = 2^8$$\n$$8 = 2^3 \\implies 8^2 = (2^3)^2 = 2^6$$\n$$\\frac{2^8 \\cdot 2^6}{2^{12}} = \\frac{2^{14}}{2^{12}} = 2^2 = 4$$",
                hint: "4 va 8 sonlarini 2 ning darajasiga almashtiring.",
                difficulty: DifficultyLevel.HARD,
                order: 6,
            },
            {
                topicId: topic1.id,
                question: "Qavslarni oching va soddalashtiring: $(x + 2)(x - 3) - x^2$",
                options: ["A) -x - 6", "B) x - 6", "C) -5x - 6", "D) 6 - x"],
                correctAnswer: "A",
                correctCustomAnswer: "-x - 6",
                explanation: "$$(x+2)(x-3) = x^2 - 3x + 2x - 6 = x^2 - x - 6$$\n$$x^2 - x - 6 - x^2 = -x - 6$$",
                hint: "Taqsimot qonunidan foydalanib har bir hadni ko'paytiring.",
                difficulty: DifficultyLevel.HARD,
                order: 7,
            },
        ],
    });

    console.log("✅ Seed muvaffaqiyatli yakunlandi!");
    console.log(`Foydalanuvchilar: ${student.email}, ${admin.email}`);
    console.log(`Darslik: ${book9Alg.title}`);
    console.log(`Mavzu: ${topic1.title}`);
}

main()
    .catch((error) => {
        console.error("Xatolik:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
