import { LessonContent } from "../types/lesson-content";

export const lessonContent: Record<string, LessonContent> = {
    "linear-equations": {
        id: "linear-equations",

        title: "Linear Equations",

        description: "Learn how to solve one-variable linear equations.",

        estimatedTime: 20,

        difficulty: "Easy",

        objectives: [
            "Understand linear equations.",
            "Solve one-variable equations.",
            "Check your answers.",
        ],

        theory: [
            "A linear equation contains one variable.",
            "Both sides of an equation must stay equal.",
            "Whatever you do on one side, do the same on the other side.",
        ],

        examples: [
            {
                title: "Example 1",
                problem: "2x + 5 = 13",

                solution:
                    "Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4.",
            },
        ],

        summary: [
            "Keep the equation balanced.",
            "Undo operations in reverse order.",
            "Always verify your answer.",
        ],
    },
};
