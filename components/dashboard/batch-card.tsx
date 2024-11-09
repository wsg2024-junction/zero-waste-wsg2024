import { Card } from '@/components/ui/card';
import { ArchiveRestore, Boxes, Clock, Trash2, Weight } from 'lucide-react';
import { PropsWithChildren, ReactElement } from 'react';
import { Batch } from '@/lib/models';

interface BatchCardProps {
    batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
    const batchInfo: ReactElement[] = [];
    if (batch.status.stage === 'preproduction') {
        batchInfo.push(
            <CardInfo>
                <Boxes />
                {batch.status.plannedProductCount}
            </CardInfo>,
        );
        batchInfo.push(
            <CardInfo>
                <Weight />
                {batch.status.plannedTotalWeight}&#x202f;kg
            </CardInfo>,
        );
    } else if (batch.status.stage === 'cooking') {
        batchInfo.push(
            <CardInfo>
                <Boxes />
                {batch.status.productCount}
            </CardInfo>,
        );
        batchInfo.push(
            <CardInfo>
                <Weight />
                {batch.status.totalWeight}&#x202f;kg
            </CardInfo>,
        );
    } else if (batch.status.stage === 'storage') {
        batchInfo.push(
            <CardInfo>
                <Weight />
                {batch.status.totalWeight}&#x202f;kg
            </CardInfo>,
        );
        batchInfo.push(
            <CardInfo>
                <Clock />
                {batch.status.daysLeft}&#x202f;d
            </CardInfo>,
        );
    } else if (batch.status.stage === 'packaging') {
        batchInfo.push(
            <CardInfo>
                <Weight />
                {batch.status.totalWeight}&#x202f;kg
            </CardInfo>,
        );
    } else if (batch.status.stage === 'done') {
        batchInfo.push(
            <CardInfo>
                <Weight />
                {batch.status.packageWeights.reduce((sum, item) => sum + item, 0)}&#x202f;kg
            </CardInfo>,
        );
        batchInfo.push(
            <CardInfo>
                <ArchiveRestore />
                {batch.status.overweightTotalKg}&#x202f;kg
            </CardInfo>,
        );
        batchInfo.push(
            <CardInfo>
                <Trash2 />
                {batch.status.underweightProducts}
            </CardInfo>,
        );
    }

    return (
        <Card className={'relative min-w-40 p-2 flex flex-col bg-white bg-opacity-80'}>
            <span className={'font-bold mb-2'}>{batch.product}</span>
            <div className={'flex flex-nowrap flex-col gap-1'}>{...batchInfo}</div>
            <span className={'absolute bottom-2 right-2 text-sm text-end'}>{batch.number}</span>
        </Card>
    );
}

function CardInfo(props: PropsWithChildren<object>) {
    return <span className={'flex gap-1 items-center'}>{props.children}</span>;
}
