import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { BatchCard } from './batch-card';
import { Area, Batch } from '@/lib/models';
import { DashboardTitle } from '@/components/dashboard/dashboard-title';

interface DashboardColProps {
    stage: Area | 'done';
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    color: string;
    batches: Batch[];
    isLast?: boolean;
}

export function DashboardCol(props: DashboardColProps) {
    return (
        <div className={'flex flex-col h-full w-full gap-x-2 xl:w-0 flex-shrink flex-grow basis-0'}>
            <div className={'col-span-2 mb-0 mt-2 xl:mb-2 xl:mt-0'}>
                <div className={'flex gap-2'}>
                    <props.icon color={props.color} />
                    <DashboardTitle>{props.stage[0].toUpperCase() + props.stage.slice(1)}</DashboardTitle>
                </div>
            </div>
            <div
                className={'rounded-xl overflow-x-auto gap-2 p-2 flex flex-row h-full w-full xl:flex-col'}
                style={{ background: props.color + '55' }}>
                {props.batches
                    .filter((batch) => batch.status.stage === props.stage)
                    .map((batch) => (
                        <BatchCard
                            key={batch.number}
                            batch={batch}
                        />
                    ))}
            </div>
        </div>
    );
}
