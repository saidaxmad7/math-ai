import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar />

            <div className='flex flex-1 flex-col'>
                <Header />

                <main className='flex-1 p-8'>{children}</main>
            </div>
        </div>
    );
}
