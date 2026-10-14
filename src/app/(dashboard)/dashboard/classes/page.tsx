import { getGrades } from '@/services/grade.service';
import { ClassesView } from '@/features/classes/components/classes-view';

export default async function ClassesPage() {
    const grades = await getGrades();

    return <ClassesView grades={grades} />;
}
