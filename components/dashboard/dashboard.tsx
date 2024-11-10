import {
    CircleCheckBig,
    CookingPot,
    PackageOpen,
    TriangleAlertIcon,
    UtensilsCrossed,
    Warehouse,
} from 'lucide-react';
import { DashboardCol } from './dashboard-col';
import { useBatches } from '@/hooks/useModels';
import { Area } from '@/lib/models';
import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import classNames from 'classnames';

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
                    icon={UtensilsCrossed}
                    selected={currentArea === 'preproduction'}
                    stage={'preproduction'}
                    color={'#16a34a'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'cooking'}
                    selected={currentArea === 'cooking'}
                    icon={CookingPot}
                    color={'#0284c7'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'storage'}
                    selected={currentArea === 'storage'}
                    icon={Warehouse}
                    color={'#ca8a04'}
                    batches={batches}
                />
                <DashboardCol
                    stage={'packaging'}
                    selected={currentArea === 'packaging'}
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
