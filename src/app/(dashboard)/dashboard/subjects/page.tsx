import { getAllSubjects } from '@/services/subject.service';
import { SubjectsView } from '@/features/subjects/components/subjects-view';

export default async function SubjectsPage() {
    const subjects = await getAllSubjects();

    return <SubjectsView subjects={subjects} />;
}
