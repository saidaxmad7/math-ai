import { prisma } from "@/lib/prisma";

export async function search(query: string) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        return { topics: [], lessons: [] };
    }

    const [topics, lessons] = await Promise.all([
        prisma.topic.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: normalizedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: normalizedQuery,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                subject: {
                    include: {
                        grade: true,
                    },
                },
                lessons: {
                    select: {
                        slug: true,
                    },
                    take: 1,
                },
            },
            orderBy: {
                title: "asc",
            },
            take: 8,
        }),
        prisma.lesson.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: normalizedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: normalizedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        topic: {
                            title: {
                                contains: normalizedQuery,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                topic: {
                    include: {
                        subject: {
                            include: {
                                grade: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                title: "asc",
            },
            take: 8,
        }),
    ]);

    return { topics, lessons };
}
