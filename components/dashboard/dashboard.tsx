import { CircleCheckBig, CookingPot, PackageOpen, UtensilsCrossed, Warehouse } from 'lucide-react';
import { DashboardCol } from './dashboard-col';

const data = {
    preproductionBatches: [
        {
            id: '1',
            product: 'Hope',
            quantity: 100,
            weightKg: 108.3,
        },
        {
            id: '2',
            product: 'Faith',
            quantity: 50,
            weightKg: 256.7,
        },
    ],
    storageBatches: [
        {
            id: '3',
            product: 'Faith',
            quantity: 50,
            weightKg: 251.3,
            timeLeftD: 2,
        },
    ],
    doneBatches: [
        {
            id: '4',
            product: 'Hope',
            quantity: 100,
            weightKg: 101.2,
            wastedItems: 3,
            overweightKg: 1.2,
        },
    ],
};

export function Dashboard() {
    return (
        <div className="grid grid-cols-5">
            <DashboardCol
                icon={UtensilsCrossed}
                title={'Preproduction'}
                color={'#16a34a'}
                batches={data.preproductionBatches}
            />
            <DashboardCol
                title={'Cooking'}
                icon={CookingPot}
                color={'#0284c7'}
                batches={[]}
            />
            <DashboardCol
                title={'Storage'}
                icon={Warehouse}
                color={'#ca8a04'}
                batches={data.storageBatches}
            />
            <DashboardCol
                title={'Packaging'}
                icon={PackageOpen}
                color={'#dc2626'}
                batches={[]}
            />
            <DashboardCol
                title={'Done'}
                icon={CircleCheckBig}
                color={'#9333ea'}
                batches={data.doneBatches}
                isLast
            />
        </div>
    );
}