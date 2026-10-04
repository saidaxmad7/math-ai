type GradeResponse = {
    id: string;
    name: string;
    order: number;
    subjects: {
        id: string;
        name: string;
        icon: string;
        color: string;
    }[];
};

type GradeWithSubjects = {
    id: string;
    name: string;
    order: number;
    subjects: {
        id: string;
        name: string;
        icon: string;
        color: string;
    }[];
};

export function toGradeResponse(grade: GradeWithSubjects): GradeResponse {
    return {
        id: grade.id,
        name: grade.name,
        order: grade.order,
        subjects: grade.subjects.map((subject) => ({
            id: subject.id,
            name: subject.name,
            icon: subject.icon,
            color: subject.color,
        })),
    };
}

export function toGradesResponse(grades: GradeWithSubjects[]): GradeResponse[] {
    return grades.map(toGradeResponse);
}
