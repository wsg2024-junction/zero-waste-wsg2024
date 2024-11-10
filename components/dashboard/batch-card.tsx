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
import { Timestamp } from '@firebase/firestore';
import classNames from 'classnames';
import { ArchiveRestore, Boxes, Clock, Trash2, Weight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, ReactElement, useContext } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { StageIcon } from './stage-icon';

interface BatchCardProps {
    batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
    const isInteractive = useContext(DashboardInteractiveContext);
    const t = useTranslations();

    const batchInfo: { icon: ReactElement; title: string; value: string; isDetailed?: boolean }[] = [];
    if (batch.status.stage === 'preproduction') {
        batchInfo.push({
            icon: <Boxes />,
            title: t('dashboard.plannedProductCount'),
            value: `${batch.status.plannedProductCount}`,
        });
        batchInfo.push({
            icon: <Weight />,
            title: t('dashboard.plannedTotalWeight'),
            value: `${batch.status.plannedTotalWeight} kg`,
        });
    } else if (batch.status.stage === 'cooking') {
        batchInfo.push({
            icon: <Boxes />,
            title: t('dashboard.productCount'),
            value: `${batch.status.productCount}`,
        });
        batchInfo.push({
            icon: <Weight />,
            title: t('dashboard.totalWeight'),
            value: `${batch.status.totalWeight} kg`,
        });
    } else if (batch.status.stage === 'storage') {
        batchInfo.push({
            icon: <Weight />,
            title: t('dashboard.totalWeight'),
            value: `${batch.status.totalWeight} kg`,
        });
        batchInfo.push({
            icon: <Clock />,
            title: t('dashboard.maxStorageLeft'),
            value: `${batch.status.daysLeft} d`,
        });
    } else if (batch.status.stage === 'packaging') {
        batchInfo.push({
            icon: <Weight />,
            title: t('dashboard.totalWeight'),
            value: `${batch.status.totalWeight} kg`,
        });
    } else if (batch.status.stage === 'done') {
        batchInfo.push({
            icon: <Weight />,
            title: t('dashboard.totalWeight'),
            value: `${batch.status.packageWeights.reduce((sum, item) => sum + item, 0)} kg`,
        });
        batchInfo.push({
            icon: <ArchiveRestore />,
            title: t('dashboard.overweightTotal'),
            value: `${batch.status.overweightTotalKg} kg`,
        });
        batchInfo.push({
            icon: <Trash2 />,
            title: t('dashboard.underweightProducts'),
            value: `${batch.status.underweightProducts}`,
        });
    }

    const card = (
        <Card
            className={classNames(
                'relative min-w-40 p-2 flex flex-col bg-white bg-opacity-80',
                isInteractive && 'cursor-pointer hover:shadow-lg transition',
            )}>
            <span className={'font-bold mb-2'}>{batch.product}</span>
            <div className={'flex flex-nowrap flex-col gap-1'}>
                {...batchInfo.map((it) => (
                    <TooltipProvider key={it.title}>
                        <Tooltip>
                            <TooltipTrigger>
                                <CardInfo>
                                    {it.icon}
                                    {it.value}
                                </CardInfo>
                            </TooltipTrigger>
                            <TooltipContent>{it.title}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
            <span className={'absolute bottom-2 right-2 text-sm text-end'}>{batch.number}</span>
        </Card>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const preproductionCompletedAt = (batch.status as any).preproductionCompletedAt as Timestamp | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookingCompletedAt = (batch.status as any).cookingCompletedAt as Timestamp | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storageCompletedAt = (batch.status as any).storageCompletedAt as Timestamp | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const packagingCompletedAt = (batch.status as any).packagingCompletedAt as Timestamp | undefined;

    return isInteractive ? (
        <AlertDialog>
            <AlertDialogTrigger asChild>{card}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Batch {batch.number}</AlertDialogTitle>
                    <AlertDialogDescription className={'flex flex-col gap-1'}>
                        {...batchInfo.map((it) => (
                            <CardInfo key={it.title}>
                                {it.icon}
                                {it.title}: {it.value}
                            </CardInfo>
                        ))}
                        <CardInfo>
                            <StageIcon stage="preproduction" />
                            {batch.createdAt.toDate().toLocaleString()}
                        </CardInfo>
                        <CardInfo>
                            <StageIcon stage="cooking" />
                            {preproductionCompletedAt?.toDate().toLocaleString() ?? '—'}
                        </CardInfo>
                        <CardInfo>
                            <StageIcon stage="storage" />
                            {cookingCompletedAt?.toDate().toLocaleString() ?? '—'}
                        </CardInfo>
                        <CardInfo>
                            <StageIcon stage="packaging" />
                            {storageCompletedAt?.toDate().toLocaleString() ?? '—'}
                        </CardInfo>
                        <CardInfo>
                            <StageIcon stage="done" />
                            {packagingCompletedAt?.toDate().toLocaleString() ?? '—'}
                        </CardInfo>
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
