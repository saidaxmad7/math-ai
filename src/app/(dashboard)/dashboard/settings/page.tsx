import { Settings } from 'lucide-react';
import { SettingsView } from '@/features/settings/settings-view';

export default function SettingsPage() {
    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider'>
                    <Settings className='size-4' />
                    Sozlamalar
                </div>
                <h1 className='font-heading text-3xl sm:text-4xl font-bold'>
                    Tizim va hisob sozlamalari
                </h1>
                <p className='text-sm sm:text-base text-muted-foreground'>
                    Foydalanuvchi profilingiz, interfeys rejimi va ta&apos;lim parametrlarini boshqaring.
                </p>
            </div>

            <SettingsView />
        </div>
    );
}
