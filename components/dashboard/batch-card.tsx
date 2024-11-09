import { Card } from '@/components/ui/card';
import { ArchiveRestore, Boxes, Clock, Trash2, Weight } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Batch } from '@/models/batch.models';

interface BatchCardProps {
    batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
    return (
        <Card className={'p-2 flex flex-col bg-white bg-opacity-80 gap-1'}>
            <span className={'font-bold mb-2'}>{batch.product}</span>
            <div className={'grid grid-rows-2 grid-flow-col gap-1'}>
                <CardInfo>
                    <Boxes />
                    {batch.quantity}
                </CardInfo>
                <CardInfo>
                    <Weight />
                    {batch.weightKg} kg
                </CardInfo>
                {batch.timeLeftD && (
                    <CardInfo>
                        <Clock />
                        {batch.timeLeftD} d
                    </CardInfo>
                )}
                {batch.wastedItems && (
                    <CardInfo>
                        <Trash2 />
                        {batch.wastedItems}
                    </CardInfo>
                )}
                {batch.overweightKg && (
                    <CardInfo>
                        <ArchiveRestore />
                        {batch.overweightKg} kg
                    </CardInfo>
                )}
            </div>
            <span className={'text-xs text-end'}>{batch.id}</span>
        </Card>
    );
}

function CardInfo(props: PropsWithChildren<object>) {
    return <span className={'flex gap-1 items-center text-sm'}>{props.children}</span>;
}
