'use client';
import { Button } from '@/components/ui/button';
import { setAreaState } from '@/lib/firebase';
import { Area, AreaEnum, AreaStatus } from '@/lib/models';
import humanizeString from 'humanize-string';
import { CheckIcon, PauseIcon, TriangleAlertIcon, TurtleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function StatusSelection({ status }: { status: Record<string, AreaStatus> }) {
    const areas = Object.values(AreaEnum);

    const onChangeStatus = (area: string, status: AreaStatus) => {
        setAreaState(area as Area, status);
    };

    return (
        <div className={'flex flex-col gap-2'}>
            {areas.map((area) => {
                return (
                    <SingleAreaStatusSelection
                        key={area}
                        area={area}
                        status={status[area] || AreaStatus.OK}
                        onStatusChange={(status) => onChangeStatus(area, status)}
                    />
                );
            })}
        </div>
    );
}

function SingleAreaStatusSelection({
    area,
    status = AreaStatus.OK,
    onStatusChange = () => {},
}: {
    area: string;
    status: AreaStatus;
    onStatusChange?: (status: AreaStatus) => void;
}) {
    const t = useTranslations();
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const onChangeStatus = (status: AreaStatus) => {
        onStatusChange(status);
        setCurrentStatus(status);
    };

    return (
        <div className={'flex flex-col md:flex-row md:items-center'}>
            <h3 className={'w-32'}>{humanizeString(area)}:</h3>
            <div className={'flex flex-row gap-2'}>
                <Button
                    onClick={() => onChangeStatus('OK')}
                    variant={currentStatus === 'OK' ? 'ghost' : 'outline'}
                    className={`w-20 border-green-600 ${currentStatus === 'OK' ? 'hover:bg-green-600 hover:text-white bg-green-500 text-white' : 'text-green-600'}`}>
                    <CheckIcon />
                    <span>{t('managerApp.areaStatus.ok')}</span>
                </Button>
                <Button
                    onClick={() => onChangeStatus('SLOWED')}
                    variant={currentStatus === 'SLOWED' ? 'ghost' : 'outline'}
                    className={`w-24 border-orange-600  ${currentStatus === 'SLOWED' ? 'hover:bg-orange-600 hover:text-white bg-orange-500 text-white' : 'text-orange-600'}`}>
                    <TurtleIcon />
                    <span>{t('managerApp.areaStatus.slowed')}</span>
                </Button>
                <Button
                    onClick={() => onChangeStatus('STOPPED')}
                    variant={currentStatus === 'STOPPED' ? 'ghost' : 'outline'}
                    className={`w-24 border-red-600 ${currentStatus === 'STOPPED' ? 'hover:bg-red-600 hover:text-white bg-red-500 text-white' : 'text-red-600'}`}>
                    <PauseIcon />
                    <span>{t('managerApp.areaStatus.stopped')}</span>
                </Button>
                <Button
                    onClick={() => onChangeStatus('EMERGENCY')}
                    variant={currentStatus === 'EMERGENCY' ? 'destructive' : 'outline'}
                    className={`w-36 border-red-600 ${currentStatus === 'EMERGENCY' ? '' : 'text-red-600'}`}>
                    <TriangleAlertIcon />
                    <span>{t('managerApp.areaStatus.emergency')}</span>
                </Button>
            </div>
        </div>
    );
}
