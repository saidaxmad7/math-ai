import { search as searchRepository } from "@/repositories/search.repository";

export async function search(query: string) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        return { topics: [], lessons: [] };
    }

    return searchRepository(normalizedQuery);
}
