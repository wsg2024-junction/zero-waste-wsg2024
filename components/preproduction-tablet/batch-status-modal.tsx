import { Button } from '@/components/ui/button';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Timestamp } from '@firebase/firestore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import {
    AnnoyedIcon,
    ArrowDownUpIcon,
    ChevronsUpDownIcon,
    FrownIcon,
    MoveDownIcon,
    MoveUpIcon,
    SmileIcon,
} from 'lucide-react';
import moment from 'moment';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { H4 } from '../ui/typography';
import { PreproductionBatch } from './batch-selector';

const chartConfig = {
    deviation: {
        label: 'Deviation',
        color: '#46A800',
    },
} satisfies ChartConfig;

export type BatchStatusModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    batch: PreproductionBatch;
};

export function BatchStatusModal(props: BatchStatusModalProps) {
    const currentSample = latestSample(props.batch);
    const targetWeight =
        (props.batch.status.plannedTotalWeight * 1000) / props.batch.status.plannedProductCount;
    const average =
        currentSample.weights.reduce((sum, weight) => sum + weight, 0) / currentSample.weights.length;
    const deviation = average - targetWeight;

    const recentSamples = props.batch.status.samples
        .filter((sample) => sample.createdAt > Timestamp.fromDate(moment().subtract(4, 'h').toDate()))
        .map((sample) => {
            const average = sample.weights.reduce((sum, weight) => sum + weight, 0) / sample.weights.length;
            return {
                timestamp: sample.createdAt.toDate(),
                average,
                deviation: average - targetWeight,
            };
        })
        .toSorted((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 8)
        .toReversed();

    return (
        <Dialog
            open={props.open}
            onOpenChange={props.onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Production Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Deviation</CardTitle>
                            <ArrowDownUpIcon />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row gap-x-2">
                                {deviation < 0 ? (
                                    <FrownIcon className="stroke-destructive" />
                                ) : average > 1.02 * targetWeight ? (
                                    <AnnoyedIcon className="stroke-yellow-600" />
                                ) : (
                                    <SmileIcon className="stroke-primary" />
                                )}
                                <div
                                    className={cn(
                                        'text-2xl font-bold mb-2 text-primary',
                                        deviation < 0 && 'text-destructive',
                                        average > 1.02 * targetWeight && 'text-yellow-600',
                                    )}>
                                    {sign(deviation)}
                                    {round1(Math.abs(deviation))} g
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <p className="text-xs text-muted-foreground">
                                    Target weight: {round1(targetWeight)} g
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Actual weight: {round1(average)} g
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    {deviation !== 0 && (
                        <div className="flex flex-row gap-x-2">
                            <ActionIcon deviation={deviation}></ActionIcon>
                            <div className="text-xl font-semibold">
                                {prompt(deviation)} {Math.abs(round1(deviation))} g
                            </div>
                        </div>
                    )}
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full flex items-center justify-between space-x-4">
                                <H4 className="font-semibold">Recent samples</H4>
                                <ChevronsUpDownIcon className="h-4 w-4" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <ChartContainer
                                config={chartConfig}
                                className="min-h-[200px] w-full">
                                <BarChart
                                    accessibilityLayer
                                    data={recentSamples}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="timestamp"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => moment(value).format('HH:mm')}
                                    />
                                    <YAxis
                                        domain={([dataMin, dataMax]) => {
                                            const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
                                            return [-absMax, absMax];
                                        }}
                                        type="number"
                                        scale="linear"
                                        interval={0}
                                        tickCount={5}
                                        tickFormatter={(value) => `${round1(value)} g`}></YAxis>
                                    <Bar
                                        dataKey="deviation"
                                        radius={4}>
                                        {recentSamples.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                className={cn(
                                                    'fill-primary',
                                                    entry.deviation < 0 && 'fill-destructive',
                                                    entry.average > 1.02 * targetWeight && 'fill-yellow-600',
                                                )}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function round1(x: number) {
    return Math.round(10 * x) / 10;
}

function sign(x: number) {
    return x > 0 ? '+' : x < 0 ? '-' : '';
}

function ActionIcon(props: { deviation: number }) {
    return props.deviation > 0 ? <MoveDownIcon /> : props.deviation < 0 ? <MoveUpIcon /> : null;
}

function prompt(x: number) {
    return x > 0 ? 'Decrease the portion size by ' : x < 0 ? 'Increase the portion size by ' : undefined;
}

function latestSample(batch: PreproductionBatch) {
    let latest: PreproductionBatch['status']['samples'][number] | null = null;
    for (const sample of batch.status.samples) {
        if (!latest || sample.createdAt > latest.createdAt) {
            latest = sample;
        }
    }
    return latest!;
}

// TODO: Maybe consider std deviation
