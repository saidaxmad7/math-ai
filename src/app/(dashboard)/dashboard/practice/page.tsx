import { PracticeList } from '@/features/practice/components/practice-list';

export default function PracticePage() {
    return (
        <div className='space-y-8'>
            <div>
                <h1 className='font-heading text-4xl font-bold'>AI mashqlar</h1>
                <p className='mt-2 text-muted-foreground'>
                    O&apos;rgangan darslaringizni takrorlang va bilimlaringizni
                    mustahkamlang.
                </p>
            </div>

            <PracticeList />
        </div>
    );
}
