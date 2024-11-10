'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Leaderboard } from '@/components/dashboard/leaderboard';
import { languages } from '@/components/language-selector/language-selector';
import { Separator } from '@/components/ui/separator';
import { useGlobalState } from '@/hooks/useModels';
import { usePathname, useRouter } from '@/i18n/routing';
import { Area, AreaStatus } from '@/lib/models';
import { TriangleAlertIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function hasState(states: Record<Area, AreaStatus>, state: AreaStatus) {
    return Object.values(states).includes(state);
}
export default function DashboardPage() {
    const { area } = useParams<{ area: Area }>();
    const messages = useGlobalState().dashboardMessages[area];
    const globalState = useGlobalState();
    const [worstState, setWorstState] = useState(AreaStatus.OK);

    useEffect(() => {
        if (hasState(globalState.status, AreaStatus.EMERGENCY)) setWorstState(AreaStatus.EMERGENCY);
        else if (hasState(globalState.status, AreaStatus.STOPPED)) setWorstState(AreaStatus.STOPPED);
        else if (hasState(globalState.status, AreaStatus.SLOWED)) setWorstState(AreaStatus.SLOWED);
        else setWorstState(AreaStatus.OK);
    }, [globalState]);

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();

    usePeriodic(
        () =>
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                {
                    locale: languages[(languages.findIndex((it) => it.code == locale) + 1) % languages.length]
                        .code,
                },
            ),
        3000,
    );

    return (
        <div className={'relative flex pb-12 flex-row gap-2 w-full text-lg'}>
            {worstState === AreaStatus.EMERGENCY && (
                <div
                    className={
                        'fixed top-0 left-0 w-full h-full z-20 bg-red-800 opacity-95 text-white flex flex-col justify-center items-center animate-emergency'
                    }>
                    <TriangleAlertIcon size={64} />
                    <span className={'font-bold text-3xl'}>EMERGENCY</span>
                    <span className={'font-bold text-md'}>Please seek your nearest manager!</span>
                </div>
            )}
            <Dashboard currentArea={area} />
            <Separator
                orientation={'vertical'}
                className={'mx-2'}
            />
            <Leaderboard />
            <footer className={'absolute bottom-1 -translate-x-1/2 left-1/2 text-center'}>{messages}</footer>
        </div>
    );
}

function usePeriodic(callback: () => void, durationMillis: number) {
    useEffect(() => {
        const interval = setInterval(callback, durationMillis);
        return () => clearInterval(interval);
    }, [callback, durationMillis]);
}
