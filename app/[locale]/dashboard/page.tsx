'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Separator } from '@/components/ui/separator';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { useEffect, useState } from 'react';
import { Area, AreaStatus } from '@/lib/models';
import { useGlobalState } from '@/hooks/useModels';
import { TriangleAlert, TriangleAlertIcon } from 'lucide-react';

function hasState(states: Record<Area, AreaStatus>, state: AreaStatus) {
    return Object.values(states).includes(state);
}
export default function DashboardPage() {
    const [area, setArea] = useState<Area>('preproduction');
    const messages = useGlobalState().dashboardMessages[area];
    const globalState = useGlobalState();
    const [worstState, setWorstState] = useState(AreaStatus.OK);

    useEffect(() => {
        if (hasState(globalState.status, AreaStatus.EMERGENCY)) setWorstState(AreaStatus.EMERGENCY);
        else if (hasState(globalState.status, AreaStatus.STOPPED)) setWorstState(AreaStatus.STOPPED);
        else if (hasState(globalState.status, AreaStatus.SLOWED)) setWorstState(AreaStatus.SLOWED);
        else setWorstState(AreaStatus.OK);
    }, [globalState]);

    return (
        <div className={'relative flex pb-12 flex-row gap-2 w-full text-lg'}>
            {worstState === AreaStatus.EMERGENCY && (
                <div
                    className={
                        'fixed top-0 left-0 w-full h-full z-20 bg-red-500 text-white flex flex-col justify-center items-center'
                    }>
                    <TriangleAlertIcon size={64} />
                    <span className={'font-bold text-3xl'}>EMERGENCY</span>
                    <span className={'font-bold text-md'}>Please seek your nearest manager!</span>
                </div>
            )}
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
