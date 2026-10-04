import { prisma } from "@/lib/prisma";

export async function getSubjectById(id: string) {
    return prisma.subject.findUnique({
        where: { id },
        include: {
            grade: true,
            topics: {
                orderBy: {
                    order: "asc",
                },
                include: {
                    lessons: {
                        select: {
                            slug: true,
                        },
                        take: 1,
                    },
                },
            },
        },
    });
}

export async function findAllSubjects() {
    return prisma.subject.findMany({
        orderBy: [
            { grade: { order: "asc" } },
            { name: "asc" },
        ],
        include: {
            grade: true,
            _count: {
                select: {
                    topics: true,
                },
            },
        },
    });
}