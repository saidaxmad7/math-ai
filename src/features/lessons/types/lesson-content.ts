export type LessonContent = {
    id: string;
    title: string;
    description: string;
    estimatedTime: number;
    difficulty: "Easy" | "Medium" | "Hard";

    objectives: string[];

    theory: string[];

    examples: {
        title: string;
        problem: string;
        solution: string;
    }[];

    summary: string[];
};
