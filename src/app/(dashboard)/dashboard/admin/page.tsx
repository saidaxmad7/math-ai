import { auth } from '@/auth';
import { AccessDenied } from '@/features/admin/components/access-denied';
import { AdminDashboardClient } from '@/features/admin/components/admin-dashboard-client';
import { AdminPinGate } from '@/features/admin/components/admin-pin-gate';

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
        return <AccessDenied />;
    }

    return (
        <AdminPinGate>
            <AdminDashboardClient
                currentUserId={session.user.id}
                adminName={session.user.name || session.user.email || 'Administrator'}
            />
        </AdminPinGate>
    );
}
