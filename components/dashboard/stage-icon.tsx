import { Area } from '@/lib/models';
import {
    CircleCheckBig,
    CookingPot,
    LucideProps,
    PackageOpen,
    UtensilsCrossed,
    Warehouse,
} from 'lucide-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

export const STAGE_DESIGN: Record<
    Area | 'done',
    {
        color: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    }
> = {
    preproduction: { color: '#16a34a', icon: UtensilsCrossed },
    cooking: { color: '#0284c7', icon: CookingPot },
    storage: { color: '#ca8a04', icon: Warehouse },
    packaging: { color: '#dc2626', icon: PackageOpen },
    done: { color: '#9333ea', icon: CircleCheckBig },
};

interface StageIconProps {
    stage: Area | 'done';
}
export function StageIcon({ stage }: StageIconProps) {
    const { color, icon } = STAGE_DESIGN[stage];
    return React.createElement(icon, { color });
}
