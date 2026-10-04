import type { ParsedTopicInput } from '@/repositories/book.repository';
import { GRADE_9_ALGEBRA_TOPICS, GRADE_9_GEOMETRIYA_TOPICS } from './grade-9';
import { GRADE_10_ALGEBRA_TOPICS, GRADE_10_GEOMETRIYA_TOPICS } from './grade-10';
import { GRADE_11_PART1_TOPICS, GRADE_11_PART2_TOPICS } from './grade-11';

export {
    GRADE_9_ALGEBRA_TOPICS,
    GRADE_9_GEOMETRIYA_TOPICS,
    GRADE_10_ALGEBRA_TOPICS,
    GRADE_10_GEOMETRIYA_TOPICS,
    GRADE_11_PART1_TOPICS,
    GRADE_11_PART2_TOPICS,
};

export function getCurriculumTopics(
    gradeNumber: number,
    subjectName: string,
    bookTitle?: string
): ParsedTopicInput[] {
    const sName = (subjectName || '').toLowerCase();
    const bTitle = (bookTitle || '').toLowerCase();

    if (gradeNumber === 9) {
        if (sName.includes('geom') || bTitle.includes('geom')) {
            return GRADE_9_GEOMETRIYA_TOPICS;
        }
        return GRADE_9_ALGEBRA_TOPICS;
    }

    if (gradeNumber === 10) {
        if (sName.includes('geom') || bTitle.includes('geom')) {
            return GRADE_10_GEOMETRIYA_TOPICS;
        }
        return GRADE_10_ALGEBRA_TOPICS;
    }

    if (gradeNumber === 11) {
        if (sName.includes('2') || bTitle.includes('2') || bTitle.includes('ikkinchi')) {
            return GRADE_11_PART2_TOPICS;
        }
        return GRADE_11_PART1_TOPICS;
    }

    return [];
}
