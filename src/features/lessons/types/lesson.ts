export type Lesson = {
    id: string;
    title: string;
    description: string;
    estimatedTime: number;
    difficulty: "Easy" | "Medium" | "Hard";
};
