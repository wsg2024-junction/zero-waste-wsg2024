'use client';

import { Dashboard } from '@/components/dashboard/dashboard';
import { Separator } from '@/components/ui/separator';
import { Leaderboard } from '@/components/dashboard/leaderboard';
import { languages } from '@/components/language-selector/language-selector';
import { Area } from '@/lib/models';
import { useGlobalState } from '@/hooks/useModels';
import { useParams } from 'next/navigation';

export default function DashboardPage() {
    const { area } = useParams<{ area: Area }>();
    const messages = useGlobalState().dashboardMessages[area
    const locale = useLocale();

    usePeriodic(
        () => 
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: languages[(languages.findIndex((it) => it.code == locale) + 1) % languages.length] },
        ),
        5000
    );

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

function usePeriodic(callback: () => void, durationMillis: number) {
   useEffect(() => {
    const interval = setInterval(callback, durationMillis)
    return () => clearInterval(interval)
   }, [durationMillis])
}
