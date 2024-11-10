import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import { useBatches, useGlobalState } from '@/hooks/useModels';
import { Area } from '@/lib/models';
import { cn } from '@/lib/utils';
import { CircleCheckBig, CookingPot, PackageOpen, UtensilsCrossed, Warehouse } from 'lucide-react';
import { DashboardCol } from './dashboard-col';

interface DashboardProps {
    className?: string;
    interactive?: boolean;
    currentArea?: Area;
}

export function Dashboard({ className, interactive, currentArea }: DashboardProps) {
    const batches = useBatches();
    const globalState = useGlobalState();
    return (
        <DashboardInteractiveContext.Provider value={interactive ?? false}>
            <div className={cn(className, 'flex flex-col flex-grow min-w-0 gap-2 xl:flex-row')}>
                <DashboardCol
                    icon={UtensilsCrossed}
                    selected={currentArea === 'preproduction'}
                    status={globalState.status['preproduction']}
                    stage={'preproduction'}
                    color={'#16a34a'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'cooking'}
                    selected={currentArea === 'cooking'}
                    status={globalState.status['cooking']}
                    icon={CookingPot}
                    color={'#0284c7'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'storage'}
                    selected={currentArea === 'storage'}
                    status={globalState.status['storage']}
                    icon={Warehouse}
                    color={'#ca8a04'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'packaging'}
                    selected={currentArea === 'packaging'}
                    status={globalState.status['packaging']}
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
