'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Separator } from '@/components/ui/separator';
import { Leaderboard } from '@/components/dashboard/leaderboard';
import { Area } from '@/lib/models';
import { useGlobalState } from '@/hooks/useModels';
import { useParams } from 'next/navigation';

export default function DashboardPage() {
    const { area } = useParams<{ area: Area }>();
    const messages = useGlobalState().dashboardMessages[area];

    return (
        <div className={'relative flex pb-12 flex-row gap-2 w-full text-lg'}>
            <Dashboard />
            <Separator
                orientation={'vertical'}
                className={'mx-2'}
            />
            <Leaderboard />
            <footer className={'absolute bottom-1 -translate-x-1/2 left-1/2 text-center'}>{messages}</footer>
        </div>
    );
}
