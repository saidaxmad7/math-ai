import { getGrades } from '@/services/grade.service';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';

export default async function DashboardPage() {
    const grades = await getGrades();

    return <DashboardView grades={grades} />;
}
