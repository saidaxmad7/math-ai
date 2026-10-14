import { notFound } from 'next/navigation';
import {
    getLessonBySlug,
    getLessonNavigation,
} from '@/services/lesson.service';
import { LessonDetailView } from '@/features/lessons/components/lesson-detail-view';

type LessonPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
    const { slug } = await params;

    const lesson = await getLessonBySlug(slug);

    if (!lesson) {
        notFound();
    }

    const { previousLesson, nextLesson } = await getLessonNavigation(
        lesson.topicId,
        lesson.order,
        lesson.topic.subjectId,
        lesson.topic.order,
    );

    return (
        <LessonDetailView
            lesson={lesson}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
        />
    );
}
