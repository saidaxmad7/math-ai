import { findAllGrades, findGradeById } from "@/repositories/grade.repository";

export async function getGrades() {
    return findAllGrades();
}

export async function getGradeById(id: string) {
    return findGradeById(id);
}
