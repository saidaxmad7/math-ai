import { prisma } from "@/lib/prisma";

export async function findTopicById(id: string) {
    return prisma.topic.findUnique({
        where: {
            id,
        },
        include: {
            subject: {
                include: {
                    grade: true,
                },
            },
            lessons: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });
}