'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Separator } from '@/components/ui/separator';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { useState } from 'react';
import { Area } from '@/lib/models';
import { useGlobalState } from '@/hooks/useModels';

export default function DashboardPage() {
    const [area, setArea] = useState<Area>('preproduction');
    const messages = useGlobalState().dashboardMessages[area];

    return (
        <div
            className={
                'grid grid-cols-[1fr_min-content_max-content] grid-rows-[1fr_min-content] w-full text-lg'
            }>
            <Dashboard />
            <Separator
                orientation={'vertical'}
                className={'mr-2'}
            />
            <Leaderboard />
            <footer className={'mt-2 col-span-3 text-center'}>{messages}</footer>
        </div>
    );
}
