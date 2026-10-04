import { DifficultyLevel, QuizStatus } from '@prisma/client';

import type {
    AnswerEvaluationResponse,
    PracticeQuestionResponse,
    QuizSessionResponse,
    TopicMistakeResponse,
} from '@/mappers/quiz.mapper';
import {
    createQuestionAttempt,
    createQuizSession,
    findActiveQuizSession,
    findQuestionById,
    findQuestionsForTopic,
    findQuizSessionById,
    findUserMistakes,
    findWorkedExampleForTopic,
    resolveTopicMistake,
    updateQuizSessionProgress,
    upsertTopicMistake,
} from '@/repositories/quiz.repository';
import type { SubmitAnswerInput } from '@/validations/quiz.validation';

const QUESTIONS_PER_SESSION = 8;
const CONSECUTIVE_CORRECT_FOR_HARD = 3;

function toPracticeQuestionResponse(
    q: NonNullable<Awaited<ReturnType<typeof findQuestionById>>>,
): PracticeQuestionResponse {
    return {
        id: q.id,
        topicId: q.topicId,
        question: q.question,
        options: q.options,
        difficulty: q.difficulty,
        hint: q.hint,
        order: q.order,
    };
}

export async function startOrResumeQuiz(
    userId: string,
    topicId: string,
): Promise<QuizSessionResponse> {
    let session = await findActiveQuizSession(userId, topicId);

    if (!session) {
        session = await createQuizSession(userId, topicId);
    }

    if (!session) {
        throw new Error('Sessiya yaratib bo‘lmadi.');
    }

    const answeredQuestionIds =
        session.attempts?.map((a) => a.questionId) || [];

    // Find next question according to currentDifficulty
    let availableQuestions = await findQuestionsForTopic(
        topicId,
        session.currentDifficulty,
        answeredQuestionIds,
    );

    // Fallback to any difficulty if exhausted in current level
    if (availableQuestions.length === 0) {
        availableQuestions = await findQuestionsForTopic(
            topicId,
            undefined,
            answeredQuestionIds,
        );
    }

    const nextQuestion = availableQuestions[0]
        ? toPracticeQuestionResponse(availableQuestions[0] as any)
        : undefined;

    return {
        id: session.id,
        topicId: session.topicId,
        topicTitle: session.topic.title,
        status: session.status,
        currentDifficulty: session.currentDifficulty,
        consecutiveCorrect: session.consecutiveCorrect,
        totalAnswered: session.attempts?.length || 0,
        correctAnswers: 0,
        currentQuestion: nextQuestion,
    };
}

function normalizeMathString(value: string): string {
    return value
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[$]/g, '')
        .trim();
}

function checkAnswerCorrectness(params: {
    userAnswer: string;
    isCustomAnswer: boolean;
    correctAnswer: string;
    correctCustomAnswer: string | null;
    options: string[];
}): boolean {
    const { userAnswer, isCustomAnswer, correctAnswer, correctCustomAnswer, options } =
        params;

    const trimmedUser = userAnswer.trim();

    // 1. Direct option match (e.g. "A" or "a")
    if (trimmedUser.toUpperCase() === correctAnswer.toUpperCase()) {
        return true;
    }

    // 2. Option prefix match (e.g. user selected "A) 32")
    if (trimmedUser.toUpperCase().startsWith(`${correctAnswer.toUpperCase()})`)) {
        return true;
    }

    // 3. Custom answer comparison
    if (correctCustomAnswer) {
        const normUser = normalizeMathString(trimmedUser);
        const normCorrect = normalizeMathString(correctCustomAnswer);

        if (normUser === normCorrect) {
            return true;
        }

        // Also check if custom answer matches the text inside the correct option
        const correctOptIndex = ['A', 'B', 'C', 'D'].indexOf(correctAnswer.toUpperCase());
        if (correctOptIndex !== -1 && options[correctOptIndex]) {
            const optContent = options[correctOptIndex].replace(/^[A-D]\)\s*/, '');
            if (normUser === normalizeMathString(optContent)) {
                return true;
            }
        }
    }

    return false;
}

export async function processAnswerSubmission(
    userId: string,
    input: SubmitAnswerInput,
): Promise<AnswerEvaluationResponse> {
    const session = await findQuizSessionById(input.sessionId);
    if (!session) {
        throw new Error('Test sessiyasi topilmadi.');
    }

    const question = await findQuestionById(input.questionId);
    if (!question) {
        throw new Error('Savol topilmadi.');
    }

    const isCorrect = checkAnswerCorrectness({
        userAnswer: input.userAnswer,
        isCustomAnswer: input.isCustomAnswer,
        correctAnswer: question.correctAnswer,
        correctCustomAnswer: question.correctCustomAnswer,
        options: question.options,
    });

    // Record attempt
    await createQuestionAttempt({
        sessionId: session.id,
        questionId: question.id,
        userAnswer: input.userAnswer,
        isCustomAnswer: input.isCustomAnswer,
        isCorrect,
        timeSpentSeconds: input.timeSpentSeconds,
    });

    let nextDifficulty = session.currentDifficulty;
    let consecutiveCorrect = session.consecutiveCorrect;
    const totalAnswered = session.totalAnswered + 1;
    let correctAnswers = session.correctAnswers;

    if (isCorrect) {
        consecutiveCorrect += 1;
        correctAnswers += 1;

        // Adaptive progression:
        // Easy -> Medium if answered correctly
        if (session.currentDifficulty === DifficultyLevel.EASY) {
            nextDifficulty = DifficultyLevel.MEDIUM;
        }
        // Medium -> Hard if 3+ consecutive correct answers
        else if (
            session.currentDifficulty === DifficultyLevel.MEDIUM &&
            consecutiveCorrect >= CONSECUTIVE_CORRECT_FOR_HARD
        ) {
            nextDifficulty = DifficultyLevel.HARD;
        }
    } else {
        // Record mistake in database for remedial learning
        await upsertTopicMistake({
            userId,
            topicId: question.topicId,
            questionId: question.id,
        });

        consecutiveCorrect = 0;
        // Downgrade difficulty if user was on Hard
        if (session.currentDifficulty === DifficultyLevel.HARD) {
            nextDifficulty = DifficultyLevel.MEDIUM;
        }
    }

    const isSessionCompleted = totalAnswered >= QUESTIONS_PER_SESSION;

    await updateQuizSessionProgress(session.id, {
        currentDifficulty: nextDifficulty,
        consecutiveCorrect,
        totalAnswered,
        correctAnswers,
        ...(isSessionCompleted
            ? { status: QuizStatus.COMPLETED, completedAt: new Date() }
            : {}),
    });

    return {
        isCorrect,
        userAnswer: input.userAnswer,
        correctAnswer: question.correctAnswer,
        correctCustomAnswer: question.correctCustomAnswer,
        explanation: question.explanation,
        nextDifficulty,
        consecutiveCorrect,
        totalAnswered,
        correctAnswers,
        isSessionCompleted,
    };
}

export async function getTopicMistakesWithRemedial(
    userId: string,
    topicId?: string,
): Promise<TopicMistakeResponse[]> {
    const mistakes = await findUserMistakes(userId, topicId);

    const results: TopicMistakeResponse[] = [];

    for (const m of mistakes) {
        // Fetch 1 worked example for this topic matching difficulty
        const workedExample = await findWorkedExampleForTopic(
            m.topicId,
            m.question.difficulty,
        );

        // Fetch 1 similar question
        const similarQuestions = await findQuestionsForTopic(
            m.topicId,
            m.question.difficulty,
            [m.questionId],
        );

        results.push({
            id: m.id,
            topicId: m.topicId,
            topicTitle: m.topic.title,
            questionId: m.questionId,
            question: m.question.question,
            options: m.question.options,
            correctAnswer: m.question.correctAnswer,
            correctCustomAnswer: m.question.correctCustomAnswer,
            explanation: m.question.explanation,
            resolved: m.resolved,
            remedialExample: workedExample
                ? {
                      id: workedExample.id,
                      topicId: workedExample.topicId,
                      title: workedExample.title,
                      question: workedExample.question,
                      solution: workedExample.solution,
                      ruleSummary: workedExample.ruleSummary,
                      difficulty: workedExample.difficulty,
                      order: workedExample.order,
                  }
                : undefined,
            remedialQuestion: similarQuestions[0]
                ? toPracticeQuestionResponse(similarQuestions[0] as any)
                : undefined,
            createdAt: m.createdAt,
        });
    }

    return results;
}

export async function markMistakeResolved(mistakeId: string, userId: string) {
    return resolveTopicMistake(mistakeId, userId);
}
