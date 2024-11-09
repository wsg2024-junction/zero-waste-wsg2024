import { CircleCheckBig, CookingPot, PackageOpen, UtensilsCrossed, Warehouse } from 'lucide-react';
import { DashboardCol } from './dashboard-col';
import { useBatches } from '@/hooks/useModels';

export function Dashboard() {
    const batches = useBatches();

    return (
        <div className="grid grid-cols-5">
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
