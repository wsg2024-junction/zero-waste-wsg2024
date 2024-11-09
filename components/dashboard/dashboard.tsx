import { CircleCheckBig, CookingPot, PackageOpen, UtensilsCrossed, Warehouse } from 'lucide-react';
import { DashboardCol } from './dashboard-col';
import { useBatches } from '@/hooks/useModels';

export function Dashboard() {
    const batches = useBatches();

    return (
        <div className="flex flex-col flex-grow min-w-0  gap-2 xl:flex-row">
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
    );
}
