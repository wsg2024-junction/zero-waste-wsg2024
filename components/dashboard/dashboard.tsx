import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import { useBatches, useGlobalState } from '@/hooks/useModels';
import { Area } from '@/lib/models';
import { cn } from '@/lib/utils';
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
                    selected={currentArea === 'preproduction'}
                    status={globalState.status['preproduction']}
                    stage={'preproduction'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'cooking'}
                    selected={currentArea === 'cooking'}
                    status={globalState.status['cooking']}
                    batches={batches}
                />
                <DashboardCol
                    stage={'storage'}
                    selected={currentArea === 'storage'}
                    status={globalState.status['storage']}
                    batches={batches}
                />
                <DashboardCol
                    stage={'packaging'}
                    selected={currentArea === 'packaging'}
                    status={globalState.status['packaging']}
                    batches={batches}
                />
                <DashboardCol
                    stage={'done'}
                    batches={batches}
                    isLast
                />
            </div>
        </DashboardInteractiveContext.Provider>
    );
}
