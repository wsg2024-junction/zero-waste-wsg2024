'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Leaderboard } from '@/components/dashboard/leaderboard';
import { languages } from '@/components/language-selector/language-selector';
import { Separator } from '@/components/ui/separator';
import { useDeepLTranslated } from '@/hooks/useDeepLTranslate';
import { useGlobalState } from '@/hooks/useModels';
import { Area, AreaStatus } from '@/lib/models';
import { TargetLanguageCode } from 'deepl-node';
import { TriangleAlertIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function hasState(states: Record<Area, AreaStatus>, state: AreaStatus) {
    return Object.values(states).includes(state);
}
export default function DashboardPage() {
    const { area } = useParams<{ area: Area }>();
    const globalState = useGlobalState();
    const [worstState, setWorstState] = useState(AreaStatus.OK);

    useEffect(() => {
        if (hasState(globalState.status, AreaStatus.EMERGENCY)) setWorstState(AreaStatus.EMERGENCY);
        else if (hasState(globalState.status, AreaStatus.STOPPED)) setWorstState(AreaStatus.STOPPED);
        else if (hasState(globalState.status, AreaStatus.SLOWED)) setWorstState(AreaStatus.SLOWED);
        else setWorstState(AreaStatus.OK);
    }, [globalState]);

    const initialLocale = useLocale();
    const [locale, setLocale] = useState(initialLocale);
    usePeriodic(() => {
        const currentIndex = languages.findIndex((it) => it.code == locale);
        return setLocale(languages[(currentIndex + 1) % languages.length].code);
    }, 4000);

    const message = useGlobalState().dashboardMessages[area];
    const translatedMessage = useDeepLTranslated(locale as TargetLanguageCode, message);

    return (
        <>
            <div
                className={
                    'xl:hidden z-50 flex flex-col justify-center items-center fixed bottom-0 left-0 right-0 top-0 bg-red-100 p-4'
                }>
                <h1 className={'text-lg font-bold m-0 max-w-52 text-center'}>
                    This page is only available on large TVs and Desktop PCs!
                </h1>
            </div>
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
                <footer className={'absolute bottom-1 -translate-x-1/2 left-1/2 text-center'}>
                    {translatedMessage}
                </footer>
            </div>
        </>
    );
}

function usePeriodic(callback: () => void, durationMillis: number) {
    useEffect(() => {
        const interval = setInterval(callback, durationMillis);
        return () => clearInterval(interval);
    }, [callback, durationMillis]);
}
