import { quickActions } from '@/features/dashboard/constants/quick-actions';
import { DashboardStats } from '@/features/dashboard/components/dashboard-stats';
import { QuickActionCard } from '@/features/dashboard/components/quick-action-card';
import { RecentActivity } from '@/features/dashboard/components/recent-activity';
import { LearningProgress } from '@/features/dashboard/components/learning-progress';
import { getGrades } from '@/services/grade.service';
import { GradeCard } from '@/features/dashboard/components/grade-card';

export default async function DashboardPage() {
    const grades = await getGrades();

    return (
        <div className='space-y-10'>
            <div>
                <h1 className='font-heading text-4xl font-bold'>
                    Welcome back 👋
                </h1>

                <p className='mt-2 text-muted-foreground'>
                    Continue your mathematics learning journey.
                </p>
            </div>

            <section className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
                <DashboardStats />
            </section>

            <section className='space-y-6'>
                <div>
                    <h2 className='font-heading text-2xl font-bold'>Grades</h2>

                    <p className='text-muted-foreground'>
                        Choose a grade to start learning.
                    </p>
                </div>

                <div className='grid gap-4 md:grid-cols-3'>
                    {grades.map((grade) => (
                        <GradeCard
                            key={grade.id}
                            id={grade.id}
                            name={grade.name}
                            subjectCount={grade.subjects.length}
                        />
                    ))}
                </div>
            </section>

            <section className='space-y-6'>
                <div>
                    <h2 className='font-heading text-2xl font-bold'>
                        Quick Actions
                    </h2>

                    <p className='text-muted-foreground'>
                        Jump directly to the section you need.
                    </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {quickActions.map((action) => (
                        <QuickActionCard
                            key={action.href}
                            title={action.title}
                            description={action.description}
                            href={action.href}
                            icon={action.icon}
                        />
                    ))}
                </div>
            </section>

            <div className='grid gap-6 xl:grid-cols-2'>
                <LearningProgress />
                <RecentActivity />
            </div>
        </div>
    );
}
