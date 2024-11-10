import { Area, Batch } from '@/lib/models';
import { BatchCard } from './batch-card';
import { STAGE_DESIGN, StageIcon } from './stage-icon';

interface DashboardColProps {
    stage: Area | 'done';
    batches: Batch[];
    isLast?: boolean;
    selected?: boolean;
}

export function DashboardCol(props: DashboardColProps) {
    const { color } = STAGE_DESIGN[props.stage];
    return (
        <div className={'flex flex-col h-full w-full gap-x-2 xl:w-0 flex-shrink flex-grow basis-0'}>
            <div className={'col-span-2 mb-0 mt-2 xl:mb-2 xl:mt-0'}>
                <div className={'flex gap-2'}>
                    <StageIcon stage={props.stage} />
                    <h2 className={`${props.selected && 'font-bold'} text-xl`}>
                        {props.stage[0].toUpperCase() + props.stage.slice(1)}
                    </h2>
                </div>
            </div>
            <div
                className={'rounded-xl overflow-x-auto gap-2 p-2 flex flex-row h-full w-full xl:flex-col'}
                style={{ background: color + '55' }}>
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
