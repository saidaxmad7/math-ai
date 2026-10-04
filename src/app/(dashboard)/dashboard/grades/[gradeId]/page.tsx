import { notFound } from "next/navigation";
import { SubjectCard } from "@/features/dashboard/components/subject-card";
import { getGradeById } from "@/services/grade.service";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type GradePageProps = {
    params: Promise<{
        gradeId: string;
    }>;
};

export default async function GradePage({ params }: GradePageProps) {
    const { gradeId } = await params;

    const grade = await getGradeById(gradeId);

    if (!grade) {
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
                            label: grade.name,
                        },
                    ]}
                />

                <h1 className='mt-4 font-heading text-4xl font-bold'>
                    {grade.name}
                </h1>

                <p className='mt-2 text-muted-foreground'>
                    Fanni tanlang va o‘qishni davom ettiring.
                </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
                {grade.subjects.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        gradeId={grade.id}
                        id={subject.id}
                        name={subject.name}
                        color={subject.color}
                    />
                ))}
            </div>
        </div>
    );
}
