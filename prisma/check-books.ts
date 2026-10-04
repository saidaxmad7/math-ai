import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
    const books = await prisma.book.findMany({
        include: {
            grade: true,
            subject: true,
            topics: { select: { id: true, title: true } },
        },
    });

    console.log("=== BOOKS IN DB ===");
    for (const b of books) {
        console.log(`Book ID: ${b.id}`);
        console.log(`Grade: ${b.grade.name}, Subject: ${b.subject.name} (subjectId: ${b.subjectId})`);
        console.log(`Title: ${b.title}, Status: ${b.status}`);
        console.log(`Topics count: ${b.topics.length}`);
        console.log(`Topics: ${b.topics.map(t => t.title).join(', ')}`);
        console.log("-----------------------------------------");
    }
}

check().catch(console.error).finally(() => prisma.$disconnect());
