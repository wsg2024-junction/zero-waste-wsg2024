'use client';

import { Card } from '@/components/ui/card';
import { H4 } from '@/components/ui/typography';
import { AreaEnum } from '@/lib/models';
import { usePathname } from 'next/navigation';

export default function DashboardSelectionPage() {
    const path = usePathname();

    return (
        <div className="flex flex-col gap-2 mt-[10vh] items-center">
            <p className={'text-center max-w-[600px]'}>
                Please select a food production area for which to show the dashboard:
            </p>
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8'}>
                {Object.values(AreaEnum).map((area) => (
                    <a
                        key={area}
                        className="w-60 h-32"
                        target={'_blank'}
                        href={`${path}/${area}`}>
                        <Card className="h-full flex flex-col justify-center content-center p-6 hover:shadow-md transition">
                            <H4 className="m-0 text-center border-none">
                                {area[0].toUpperCase() + area.slice(1)}
                            </H4>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    );
}
