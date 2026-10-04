import { notFound } from "next/navigation";
import { TopicCard } from "@/features/dashboard/components/topic-card";
import { getSubjectById } from "@/services/subject.service";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type SubjectPageProps = {
    params: Promise<{
        gradeId: string;
        subjectId: string;
    }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
    const { gradeId, subjectId } = await params;

    const subject = await getSubjectById(subjectId);

    if (!subject) {
        notFound();
    }

    return (
        <div className='space-y-8'>
            <div>
                <Breadcrumb
                    items={[
                        {
                            label: "Bosh sahifa",
                            href: "/dashboard",
                        },
                        {
                            label: subject.grade.name,
                            href: `/dashboard/grades/${gradeId}`,
                        },
                        {
                            label: subject.name,
                        },
                    ]}
                />

                <h1 className='mt-4 font-heading text-4xl font-bold'>
                    {subject.name}
                </h1>

                <p className='mt-2 text-muted-foreground'>
                    O‘rganishni boshlash uchun mavzuni tanlang.
                </p>
            </div>

            {subject.topics.length === 0 ? (
                <div className='rounded-xl border border-dashed p-10 text-center'>
                    <h2 className='text-xl font-semibold'>
                        Hozircha mavzular mavjud emas
                    </h2>

                    <p className='mt-2 text-muted-foreground'>
                        Bu fan uchun mavzular shu yerda ko‘rsatiladi.
                    </p>
                </div>
            ) : (
                <div className='grid gap-6 md:grid-cols-2'>
                    {subject.topics.map((topic) => (
                        <TopicCard
                            key={topic.id}
                            gradeId={gradeId}
                            subjectId={subject.id}
                            id={topic.id}
                            title={topic.title}
                            description={topic.description}
                            lessonSlug={topic.lessons?.[0]?.slug}
                            order={topic.order}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
