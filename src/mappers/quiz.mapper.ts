import { DifficultyLevel, QuizStatus } from '@prisma/client';

export type PracticeQuestionResponse = {
    id: string;
    topicId: string;
    question: string;
    options: string[];
    difficulty: DifficultyLevel;
    hint: string | null;
    order: number;
};

export type AnswerEvaluationResponse = {
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    correctCustomAnswer: string | null;
    explanation: string;
    nextDifficulty: DifficultyLevel;
    consecutiveCorrect: number;
    totalAnswered: number;
    correctAnswers: number;
    isSessionCompleted: boolean;
};

export type QuizSessionResponse = {
    id: string;
    topicId: string;
    topicTitle: string;
    status: QuizStatus;
    currentDifficulty: DifficultyLevel;
    consecutiveCorrect: number;
    totalAnswered: number;
    correctAnswers: number;
    currentQuestion?: PracticeQuestionResponse;
};

export type WorkedExampleResponse = {
    id: string;
    topicId: string;
    title: string;
    question: string;
    solution: string;
    ruleSummary: string | null;
    difficulty: DifficultyLevel;
    order: number;
};

export type TopicMistakeResponse = {
    id: string;
    topicId: string;
    topicTitle: string;
    questionId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    correctCustomAnswer: string | null;
    explanation: string;
    resolved: boolean;
    remedialExample?: WorkedExampleResponse;
    remedialQuestion?: PracticeQuestionResponse;
    createdAt: Date;
};
