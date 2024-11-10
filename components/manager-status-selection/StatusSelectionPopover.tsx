import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, PauseIcon, TriangleAlertIcon, TurtleIcon } from 'lucide-react';
import StatusSelection from '@/components/manager-status-selection/StatusSelection';
import { useGlobalState } from '@/hooks/useModels';
import { Area, AreaStatus } from '@/lib/models';
import { useEffect, useState } from 'react';

function hasState(states: Record<Area, AreaStatus>, state: AreaStatus) {
    return Object.values(states).includes(state);
}

export default function StatusSelectionPopover() {
    const globalState = useGlobalState();
    const [worstState, setWorstState] = useState(AreaStatus.OK);

    useEffect(() => {
        if (hasState(globalState.status, AreaStatus.EMERGENCY)) setWorstState(AreaStatus.EMERGENCY);
        else if (hasState(globalState.status, AreaStatus.STOPPED)) setWorstState(AreaStatus.STOPPED);
        else if (hasState(globalState.status, AreaStatus.SLOWED)) setWorstState(AreaStatus.SLOWED);
        else setWorstState(AreaStatus.OK);
    }, [globalState]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={
                        `text-white hover:text-white fixed bottom-36 right-4 w-12 h-12 shadow-xl` +
                        `${worstState === AreaStatus.EMERGENCY ? ' hover:bg-red-900 bg-red-900 ' : ''}` +
                        `${worstState === AreaStatus.STOPPED ? ' hover:bg-red-500 bg-red-500 ' : ''}` +
                        `${worstState === AreaStatus.SLOWED ? ' hover:bg-orange-600 bg-orange-500 ' : ''}` +
                        `${worstState === AreaStatus.OK ? ' hover:bg-green-500 bg-green-500 ' : ''}`
                    }>
                    {worstState === AreaStatus.EMERGENCY && <TriangleAlertIcon />}
                    {worstState === AreaStatus.STOPPED && <PauseIcon />}
                    {worstState === AreaStatus.SLOWED && <TurtleIcon />}
                    {worstState === AreaStatus.OK && <CheckIcon />}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={'w-fit max-w-[90vw] h-96 md:h-64'}
                collisionPadding={10}
                sticky="always">
                <div className={'h-[100%] w-[100%] overflow-x-auto'}>
                    <h2 className={'font-bold text-lg mb-2'}>Status</h2>
                    <StatusSelection status={globalState.status} />
                </div>
            </PopoverContent>
        </Popover>
    );
}
