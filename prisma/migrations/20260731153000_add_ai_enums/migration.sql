-- CreateEnum
CREATE TYPE "AIMessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AIContextType" AS ENUM ('CHAT', 'LESSON', 'PRACTICE', 'QUIZ');

-- Convert existing AI message roles to the enum values.
ALTER TABLE "AIMessage"
ALTER COLUMN "role" TYPE "AIMessageRole"
USING CASE LOWER("role")
    WHEN 'user' THEN 'USER'::"AIMessageRole"
    WHEN 'assistant' THEN 'ASSISTANT'::"AIMessageRole"
    WHEN 'system' THEN 'SYSTEM'::"AIMessageRole"
    ELSE 'USER'::"AIMessageRole"
END;

-- Convert existing context values when present.
ALTER TABLE "AIConversation"
ALTER COLUMN "contextType" TYPE "AIContextType"
USING CASE UPPER("contextType")
    WHEN 'CHAT' THEN 'CHAT'::"AIContextType"
    WHEN 'LESSON' THEN 'LESSON'::"AIContextType"
    WHEN 'PRACTICE' THEN 'PRACTICE'::"AIContextType"
    WHEN 'QUIZ' THEN 'QUIZ'::"AIContextType"
    ELSE NULL
END;