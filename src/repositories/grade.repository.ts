import { prisma } from "@/lib/prisma";

export async function findAllGrades() {
    return prisma.grade.findMany({
        orderBy: {
            order: "asc",
        },
        include: {
            subjects: {
                orderBy: {
                    name: "asc",
                },
                include: {
                    _count: {
                        select: { topics: true },
                    },
                },
            },
        },
    });
}

export async function findGradeById(id: string) {
    return prisma.grade.findUnique({
        where: {
            id,
        },
        include: {
            subjects: {
                orderBy: {
                    name: "asc",
                },
                include: {
                    _count: {
                        select: { topics: true },
                    },
                },
            },
        },
    });
}
