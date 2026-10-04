import { AIChat } from '@/features/ai/components/ai-chat';

export default function AIPage() {
    return (
        <div className='space-y-8'>
            <div>
                <h1 className='font-heading text-4xl font-bold'>
                    AI yordamchi
                </h1>
                <p className='mt-2 text-muted-foreground'>
                    Matematika bo&apos;yicha savollaringizni bering va suhbat
                    tarixini saqlang.
                </p>
            </div>

            <AIChat />
        </div>
    );
}
