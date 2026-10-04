import {
    getSubjectById as getSubjectByIdRepository,
    findAllSubjects,
} from "@/repositories/subject.repository";

export async function getSubjectById(id: string) {
    return getSubjectByIdRepository(id);
}

export async function getAllSubjects() {
    return findAllSubjects();
}
