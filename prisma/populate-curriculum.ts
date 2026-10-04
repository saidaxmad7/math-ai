import { PrismaClient } from '@prisma/client';
import {
    GRADE_9_ALGEBRA_TOPICS,
    GRADE_9_GEOMETRIYA_TOPICS,
    GRADE_10_ALGEBRA_TOPICS,
    GRADE_10_GEOMETRIYA_TOPICS,
    GRADE_11_PART1_TOPICS,
    GRADE_11_PART2_TOPICS,
} from '../src/constants/curriculum';
import { saveParsedBookData } from '../src/repositories/book.repository';

const prisma = new PrismaClient();

async function cleanOldTopicsForSubject(subjectId: string, validTitles: string[]) {
    // Find topics of this subject that are NOT in the valid curriculum list
    const topicsToRemove = await prisma.topic.findMany({
        where: {
            subjectId,
            title: { notIn: validTitles },
        },
        select: { id: true, title: true },
    });

    if (topicsToRemove.length === 0) return;

    console.log(`Eski/keraksiz mavzularni tozalash (${topicsToRemove.length} ta):`, topicsToRemove.map(t => t.title).join(', '));
    const topicIds = topicsToRemove.map(t => t.id);

    await prisma.topic.deleteMany({
        where: { id: { in: topicIds } },
    });
}

async function main() {
    console.log('--- BARCHA DARSLIKLAR UCHUN TO\'LIQ DASTURNI YUKLASH BOSHLANDI ---');

    const books = await prisma.book.findMany({
        include: {
            grade: true,
            subject: true,
        },
        orderBy: [{ grade: { order: 'asc' } }, { subject: { name: 'asc' } }],
    });

    for (const book of books) {
        const gradeOrder = book.grade.order;
        const subjectName = book.subject.name.toLowerCase();
        const bookTitle = book.title.toLowerCase();

        let topics = null;
        if (gradeOrder === 9) {
            if (subjectName.includes('geom') || bookTitle.includes('geom')) {
                topics = GRADE_9_GEOMETRIYA_TOPICS;
            } else {
                topics = GRADE_9_ALGEBRA_TOPICS;
            }
        } else if (gradeOrder === 10) {
            if (subjectName.includes('geom') || bookTitle.includes('geom')) {
                topics = GRADE_10_GEOMETRIYA_TOPICS;
            } else {
                topics = GRADE_10_ALGEBRA_TOPICS;
            }
        } else if (gradeOrder === 11) {
            if (subjectName.includes('2') || bookTitle.includes('2') || bookTitle.includes('ikkinchi')) {
                topics = GRADE_11_PART2_TOPICS;
            } else {
                topics = GRADE_11_PART1_TOPICS;
            }
        }

        if (!topics || topics.length === 0) {
            console.log(`Mos dastur topilmadi: ${book.grade.name} - ${book.subject.name}`);
            continue;
        }

        console.log(`\nYuklanmoqda: [${book.grade.name}] ${book.subject.name} - ${book.title} (${topics.length} ta mavzu)...`);

        const validTitles = topics.map(t => t.title);
        await cleanOldTopicsForSubject(book.subjectId, validTitles);

        await saveParsedBookData(
            book.id,
            book.subjectId,
            gradeOrder,
            topics
        );

        console.log(`Muvaffaqiyatli saqlandi: ${topics.length} ta mavzu.`);
    }

    // Statistika
    const totalTopics = await prisma.topic.count();
    const totalLessons = await prisma.lesson.count();
    const totalExamples = await prisma.workedExample.count();
    const totalQuestions = await prisma.practiceQuestion.count();

    console.log('\n================ YAKUNIY STATISTIKA ================');
    console.log(`Jami mavzular (Topics): ${totalTopics}`);
    console.log(`Jami darslar (Lessons): ${totalLessons}`);
    console.log(`Jami namunaviy misollar (Worked Examples): ${totalExamples}`);
    console.log(`Jami test savollari (Practice Questions): ${totalQuestions}`);
    console.log('====================================================\n');
}

main()
    .catch((e) => {
        console.error('Xatolik yuz berdi:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
