import { notFound, redirect } from "next/navigation";
import { getTopicById } from "@/services/topic.service";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type TopicPageProps = {
    params: Promise<{
        gradeId: string;
        subjectId: string;
        topicId: string;
    }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
    const { gradeId, subjectId, topicId } = await params;

    const topic = await getTopicById(topicId);

    if (!topic) {
        notFound();
    }

    // Agar mavzuning darsi mavjud bo'lsa, foydalanuvchini to'g'ridan-to'g'ri dars sahifasiga yo'naltiramiz
    if (topic.lessons && topic.lessons.length > 0) {
        redirect(`/dashboard/lessons/${topic.lessons[0].slug}`);
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
                            label: topic.subject.grade.name,
                            href: `/dashboard/grades/${gradeId}`,
                        },
                        {
                            label: topic.subject.name,
                            href: `/dashboard/grades/${gradeId}/subjects/${subjectId}`,
                        },
                        {
                            label: topic.title,
                        },
                    ]}
                />

                <h1 className='mt-4 font-heading text-4xl font-bold'>
                    {topic.title}
                </h1>

                {topic.description && (
                    <p className='mt-2 text-muted-foreground'>
                        {topic.description}
                    </p>
                )}
            </div>

            <div className='rounded-xl border border-dashed p-10 text-center'>
                <h2 className='text-xl font-semibold'>
                    Hozircha darslar mavjud emas
                </h2>

                <p className='mt-2 text-muted-foreground'>
                    Bu mavzu uchun darslar tez kunda yuklanadi.
                </p>
            </div>
        </div>
    );
}
