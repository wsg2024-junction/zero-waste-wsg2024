import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { Batch } from '@/models/batch.models';
import { BatchCard } from './batch-card';

interface DashboardColProps {
    title: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    color: string;
    batches: Batch[];
    isLast?: boolean;
}

export function DashboardCol(props: DashboardColProps) {
    return (
        <div className={'grid grid-cols-1 grid-rows-[min-content_1fr] gap-x-2'}>
            <div className={'col-span-2 mb-2'}>
                <div className={'flex gap-2'}>
                    <props.icon color={props.color} />
                    <h2 style={{ color: props.color }}>{props.title}</h2>
                </div>
            </div>
            <div
                className={'rounded-xl flex flex-col gap-2'}
                style={{ background: props.color + '55' }}>
                {props.batches.map((batch) => (
                    <BatchCard
                        key={batch.id}
                        batch={batch}
                    />
                ))}
            </div>
        </div>
    );
}
