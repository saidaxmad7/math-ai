import { findPracticeLessons } from '@/repositories/practice.repository';
import type { PracticeQuery } from '@/validations/practice.validation';

function isCompleted(
    lesson: Awaited<ReturnType<typeof findPracticeLessons>>[number],
) {
    return lesson.progresses[0]?.completed ?? false;
}

export async function getPracticeLessons(
    userId: string,
    filters: PracticeQuery,
) {
    const lessons = await findPracticeLessons(userId);
    const filteredLessons = lessons.filter((lesson) => {
        const completed = isCompleted(lesson);
        const query = filters.query?.toLowerCase();
        const matchesQuery =
            !query ||
            [
                lesson.title,
                lesson.description ?? '',
                lesson.topic.title,
                lesson.topic.subject.name,
                lesson.topic.subject.grade.name,
            ].some((value) => value.toLowerCase().includes(query));

        return (
            matchesQuery &&
            (!filters.gradeId ||
                lesson.topic.subject.grade.id === filters.gradeId) &&
            (!filters.subjectId ||
                lesson.topic.subject.id === filters.subjectId) &&
            (filters.status === 'all' ||
                (filters.status === 'completed' && completed) ||
                (filters.status === 'incomplete' && !completed))
        );
    });

    filteredLessons.sort((firstLesson, secondLesson) => {
        if (filters.sort === 'alphabetical') {
            return firstLesson.title.localeCompare(secondLesson.title);
        }

        if (filters.sort === 'newest') {
            return (
                secondLesson.createdAt.getTime() -
                    firstLesson.createdAt.getTime() ||
                firstLesson.title.localeCompare(secondLesson.title) ||
                firstLesson.id.localeCompare(secondLesson.id)
            );
        }

        if (filters.sort === 'oldest') {
            return (
                firstLesson.createdAt.getTime() -
                    secondLesson.createdAt.getTime() ||
                firstLesson.title.localeCompare(secondLesson.title) ||
                firstLesson.id.localeCompare(secondLesson.id)
            );
        }

        const completionOrder =
            Number(isCompleted(firstLesson)) -
            Number(isCompleted(secondLesson));

        return (
            completionOrder ||
            (firstLesson.topic.subject.grade.order - secondLesson.topic.subject.grade.order) ||
            firstLesson.topic.subject.name.localeCompare(secondLesson.topic.subject.name) ||
            (firstLesson.topic.order - secondLesson.topic.order) ||
            (firstLesson.order - secondLesson.order) ||
            firstLesson.createdAt.getTime() - secondLesson.createdAt.getTime()
        );
    });

    const grades = lessons
        .map((lesson) => lesson.topic.subject.grade)
        .filter(
            (grade, index, options) =>
                options.findIndex((option) => option.id === grade.id) === index,
        )
        .sort((firstGrade, secondGrade) =>
            firstGrade.order - secondGrade.order ||
            firstGrade.name.localeCompare(secondGrade.name),
        );
    const subjects = lessons
        .map((lesson) => ({
            id: lesson.topic.subject.id,
            name: lesson.topic.subject.name,
            gradeId: lesson.topic.subject.grade.id,
            gradeName: lesson.topic.subject.grade.name,
        }))
        .filter(
            (subject, index, options) =>
                options.findIndex((option) => option.id === subject.id) ===
                index,
        )
        .sort((firstSubject, secondSubject) =>
            firstSubject.gradeName.localeCompare(secondSubject.gradeName) ||
            firstSubject.name.localeCompare(secondSubject.name),
        );

    return {
        lessons: filteredLessons,
        grades,
        subjects,
    };
}
