"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { NoteResponse } from "@/mappers/note.mapper";

type NotesApiResponse = {
    success: boolean;
    message: string;
    data: NoteResponse[];
};

type NoteApiResponse = {
    success: boolean;
    message: string;
    data: NoteResponse;
};

type CreateNotePayload = {
    lessonId: string;
    title?: string;
    content: string;
};

type UpdateNotePayload = {
    id: string;
    title?: string;
    content?: string;
};

async function fetchNotes(lessonId: string): Promise<NoteResponse[]> {
    const { data } = await axios.get<NotesApiResponse>("/api/notes", {
        params: { lessonId },
    });

    if (!data.success) {
        throw new Error(data.message ?? "Notes fetch failed");
    }

    return data.data;
}

async function fetchNote(id: string): Promise<NoteResponse> {
    const { data } = await axios.get<NoteApiResponse>(`/api/notes/${id}`);

    if (!data.success) {
        throw new Error(data.message ?? "Note fetch failed");
    }

    return data.data;
}

async function createNote(payload: CreateNotePayload): Promise<NoteResponse> {
    const { data } = await axios.post<NoteApiResponse>(
        "/api/notes",
        {
            title: payload.title,
            content: payload.content,
        },
        {
            params: { lessonId: payload.lessonId },
        },
    );

    if (!data.success) {
        throw new Error(data.message ?? "Note creation failed");
    }

    return data.data;
}

async function updateNote(payload: UpdateNotePayload): Promise<NoteResponse> {
    const { data } = await axios.patch<NoteApiResponse>(`/api/notes/${payload.id}`, {
        title: payload.title,
        content: payload.content,
    });

    if (!data.success) {
        throw new Error(data.message ?? "Note update failed");
    }

    return data.data;
}

async function deleteNote(id: string): Promise<NoteResponse> {
    const { data } = await axios.delete<NoteApiResponse>(`/api/notes/${id}`);

    if (!data.success) {
        throw new Error(data.message ?? "Note deletion failed");
    }

    return data.data;
}

export function useNotes(lessonId: string) {
    return useQuery<NoteResponse[]>({
        queryKey: ["notes", lessonId],
        queryFn: () => fetchNotes(lessonId),
        enabled: Boolean(lessonId),
    });
}

export function useNote(id: string) {
    return useQuery<NoteResponse>({
        queryKey: ["notes", "detail", id],
        queryFn: () => fetchNote(id),
        enabled: Boolean(id),
    });
}

export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}

export function useUpdateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}

export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}
