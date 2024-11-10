'use client';

import { NavigationCard } from '@/components/navigation-card';
import { AreaEnum } from '@/lib/models';
export default function DashboardSelectionPage() {
    return (
        <div className="flex flex-col gap-2 mt-[10vh] items-center">
            <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'}>
                {Object.values(AreaEnum).map((area) => (
                    <NavigationCard
                        key={area}
                        title={area[0].toUpperCase() + area.slice(1)}
                        href={`/dashboard/${area}`}
                    />
                ))}
            </div>
        </div>
    );
}
