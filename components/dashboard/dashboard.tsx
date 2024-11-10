import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import { useBatches } from '@/hooks/useModels';
import { Area } from '@/lib/models';
import classNames from 'classnames';
import { DashboardCol } from './dashboard-col';

interface DashboardProps {
    className?: string;
    interactive?: boolean;
    currentArea?: Area;
}

export function Dashboard({ className, interactive, currentArea }: DashboardProps) {
    const batches = useBatches();

    return (
        <DashboardInteractiveContext.Provider value={interactive ?? false}>
            <div className={classNames(className, 'flex flex-col flex-grow min-w-0 gap-2 xl:flex-row')}>
                <DashboardCol
                    selected={currentArea === 'preproduction'}
                    stage={'preproduction'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'cooking'}
                    selected={currentArea === 'cooking'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'storage'}
                    selected={currentArea === 'storage'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'packaging'}
                    selected={currentArea === 'packaging'}
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
