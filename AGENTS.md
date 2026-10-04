# AI Platform Development Rules

Architecture:

API
↓
Service
↓
Repository
↓
Prisma

Mapper

Rules:

- Never use any.
- Never access Prisma outside repositories.
- Services communicate only with repositories.
- Mappers are pure.
- API routes never access Prisma directly.
- Use Zod for validation.
- Use response helpers.
- Follow existing project conventions.
- Do not create duplicate utilities.
- Production-ready code only.
- Always analyze existing code before creating new code.
- Do not modify unrelated files.
- Prefer existing utilities before creating new ones.
- Do not duplicate types.
- Keep components small and reusable.
- Prefer Server Components unless client-side interactivity is required.
- React Query is the only data fetching solution for client components.
- Keep business logic inside services.
- Keep repositories focused only on database operations.

Implement the Practice module.

Analyze the existing codebase first.
Follow agent.md.
Return only the modified files.

Implement the Statistics module.

Before making changes:

- Inspect the existing project architecture.
- Reuse existing patterns.
- Follow agent.md instructions.

Tasks:

- Repository
- Service
- Mapper
- Validation (if needed)
- API
- React Query Hook
- UI

Use real data only.
Return only the modified files.
