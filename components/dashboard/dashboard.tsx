import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import { useBatches, useGlobalState } from '@/hooks/useModels';
import { Area, AreaStatus } from '@/lib/models';
import { cn } from '@/lib/utils';
import {
    CircleCheckBig,
    CookingPot,
    PackageOpen,
    TriangleAlertIcon,
    UtensilsCrossed,
    Warehouse,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardCol } from './dashboard-col';

function hasState(states: Record<Area, AreaStatus>, state: AreaStatus) {
    return Object.values(states).includes(state);
}
interface DashboardProps {
    className?: string;
    interactive?: boolean;
}

export function Dashboard({ className, interactive }: DashboardProps) {
    const batches = useBatches();
    const globalState = useGlobalState();
    const [worstState, setWorstState] = useState(AreaStatus.OK);

    useEffect(() => {
        if (hasState(globalState.status, AreaStatus.EMERGENCY)) setWorstState(AreaStatus.EMERGENCY);
        else if (hasState(globalState.status, AreaStatus.STOPPED)) setWorstState(AreaStatus.STOPPED);
        else if (hasState(globalState.status, AreaStatus.SLOWED)) setWorstState(AreaStatus.SLOWED);
        else setWorstState(AreaStatus.OK);
    }, [globalState]);

    return (
        <DashboardInteractiveContext.Provider value={interactive ?? false}>
            <div className={cn(className, 'flex flex-col flex-grow min-w-0 gap-2 xl:flex-row')}>
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
                <DashboardCol
                    icon={UtensilsCrossed}
                    stage={'preproduction'}
                    color={'#16a34a'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'cooking'}
                    icon={CookingPot}
                    color={'#0284c7'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'storage'}
                    icon={Warehouse}
                    color={'#ca8a04'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'packaging'}
                    icon={PackageOpen}
                    color={'#dc2626'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'done'}
                    icon={CircleCheckBig}
                    color={'#9333ea'}
                    batches={batches}
                    isLast
                />
            </div>
        </DashboardInteractiveContext.Provider>
    );
}
