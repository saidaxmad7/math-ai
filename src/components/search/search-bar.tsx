"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen, Layers } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchTopic = {
    id: string;
    title: string;
    subjectId: string;
    lessonSlug?: string | null;
    subject: {
        name: string;
        gradeId: string;
        grade: {
            name: string;
        };
    };
};

type SearchLesson = {
    id: string;
    title: string;
    slug: string;
    topic: {
        subject: {
            name: string;
            grade: {
                name: string;
            };
        };
    };
};

type SearchResponse = {
    topics: SearchTopic[];
    lessons: SearchLesson[];
};

async function searchRequest(query: string): Promise<SearchResponse> {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error("Search failed");
    }

    const json = await response.json();
    const payload = json.data || json;

    return {
        topics: Array.isArray(payload?.topics) ? payload.topics : [],
        lessons: Array.isArray(payload?.lessons) ? payload.lessons : [],
    };
}

export function SearchBar() {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setQuery("");
                setDebouncedQuery("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setQuery("");
                setDebouncedQuery("");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        setQuery("");
        setDebouncedQuery("");
    }, [pathname]);

    const { data, isLoading } = useQuery<SearchResponse>({
        queryKey: ["search", debouncedQuery],
        queryFn: () => searchRequest(debouncedQuery),
        enabled: debouncedQuery.length > 0,
    });

    const topics = data?.topics ?? [];
    const lessons = data?.lessons ?? [];
    const hasResults = topics.length > 0 || lessons.length > 0;

    return (
        <div
            ref={containerRef}
            className='relative hidden w-full max-w-sm md:block'
        >
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

            <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Mavzu yoki dars qidiring...'
                className='pl-10 h-10 rounded-xl'
            />

            {debouncedQuery.length > 0 && (
                <div className='absolute top-full z-50 mt-2 max-h-[380px] w-full overflow-y-auto rounded-xl border bg-card shadow-xl animate-in fade-in-50 duration-150'>
                    {isLoading && (
                        <p className='p-4 text-center text-sm text-muted-foreground'>
                            Qidirilmoqda...
                        </p>
                    )}

                    {!isLoading && !hasResults && (
                        <p className='p-4 text-center text-sm text-muted-foreground'>
                            Hech narsa topilmadi
                        </p>
                    )}

                    {!isLoading && topics.length > 0 && (
                        <>
                            <div className='flex items-center gap-1.5 border-b bg-muted/60 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground'>
                                <Layers className='h-3.5 w-3.5 text-primary' />
                                <span>Mavzular</span>
                            </div>

                            {topics.map((topic) => {
                                const href = topic.lessonSlug
                                    ? `/dashboard/lessons/${topic.lessonSlug}`
                                    : `/dashboard/grades/${topic.subject.gradeId}/subjects/${topic.subjectId}/topics/${topic.id}`;

                                return (
                                    <Link
                                        key={topic.id}
                                        href={href}
                                        onClick={() => {
                                            setQuery("");
                                            setDebouncedQuery("");
                                        }}
                                        className='block border-b p-3 transition-colors hover:bg-muted/50 last:border-0'
                                    >
                                        <p className='text-sm font-medium text-foreground'>
                                            {topic.title}
                                        </p>

                                        <p className='mt-0.5 text-xs text-muted-foreground'>
                                            {topic.subject.grade.name} • {topic.subject.name}
                                        </p>
                                    </Link>
                                );
                            })}
                        </>
                    )}

                    {!isLoading && lessons.length > 0 && (
                        <>
                            <div className='flex items-center gap-1.5 border-b bg-muted/60 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground'>
                                <BookOpen className='h-3.5 w-3.5 text-primary' />
                                <span>Darslar</span>
                            </div>

                            {lessons.map((lesson) => (
                                <Link
                                    key={lesson.id}
                                    href={`/dashboard/lessons/${lesson.slug}`}
                                    onClick={() => {
                                        setQuery("");
                                        setDebouncedQuery("");
                                    }}
                                    className='block border-b p-3 transition-colors hover:bg-muted/50 last:border-0'
                                >
                                    <p className='text-sm font-medium text-foreground'>
                                        {lesson.title}
                                    </p>

                                    <p className='mt-0.5 text-xs text-muted-foreground'>
                                        {lesson.topic.subject.grade.name} • {lesson.topic.subject.name}
                                    </p>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
