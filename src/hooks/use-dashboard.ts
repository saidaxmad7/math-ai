"use client";

import { useQuery } from "@tanstack/react-query";

import type { DashboardResponse } from "@/mappers/dashboard.mapper";

type DashboardApiResponse = {
    success: boolean;
    message: string;
    data: DashboardResponse;
};

async function fetchDashboard(): Promise<DashboardResponse> {
    const response = await fetch("/api/dashboard");

    if (!response.ok) {
        throw new Error("Dashboard fetch failed");
    }

    const json = (await response.json()) as DashboardApiResponse;

    if (!json.success) {
        throw new Error(json.message ?? "Dashboard fetch failed");
    }

    return json.data;
}

export function useDashboard() {
    return useQuery<DashboardResponse>({
        queryKey: ["dashboard"],
        queryFn: fetchDashboard,
    });
}
