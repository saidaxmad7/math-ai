import { Lesson } from "../types/lesson";

export const lessons: Record<string, Lesson> = {
    "linear-equations": {
        id: "linear-equations",
        title: "Linear Equations",
        description:
            "Learn how to solve one-variable linear equations step by step.",
        estimatedTime: 20,
        difficulty: "Easy",
    },

    "systems-of-equations": {
        id: "systems-of-equations",
        title: "Systems of Equations",
        description:
            "Understand solving systems using substitution and elimination.",
        estimatedTime: 30,
        difficulty: "Medium",
    },

    "quadratic-functions": {
        id: "quadratic-functions",
        title: "Quadratic Functions",
        description: "Introduction to quadratic equations and graphs.",
        estimatedTime: 35,
        difficulty: "Medium",
    },
};
