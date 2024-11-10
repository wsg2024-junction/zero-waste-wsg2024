import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { DashboardInteractiveContext } from '@/contexts/dashboard-context';
import { Batch } from '@/lib/models';
import { cn } from '@/lib/utils';
import { ArchiveRestore, Boxes, Clock, Trash2, Weight } from 'lucide-react';
import { PropsWithChildren, ReactElement, useContext } from 'react';

interface BatchCardProps {
    batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
    const isInteractive = useContext(DashboardInteractiveContext);

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

    const card = (
        <Card
            className={cn(
                'relative min-w-40 p-2 flex flex-col bg-white bg-opacity-80',
                isInteractive && 'cursor-pointer hover:shadow-lg transition',
            )}>
            <span className={'font-bold mb-2'}>{batch.product}</span>
            <div className={'flex flex-nowrap flex-col gap-1'}>{...batchInfo}</div>
            <span className={'absolute bottom-2 right-2 text-sm text-end'}>{batch.number}</span>
        </Card>
    );

    return isInteractive ? (
        <AlertDialog>
            <AlertDialogTrigger asChild>{card}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Batch {batch.number}</AlertDialogTitle>
                    <AlertDialogDescription className={'flex flex-col gap-1'}>
                        {...batchInfo}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : (
        card
    );
}

function CardInfo(props: PropsWithChildren<object>) {
    return <span className={'flex gap-1 items-center'}>{props.children}</span>;
}
