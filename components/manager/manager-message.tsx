import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGlobalState } from '@/hooks/useModels';
import { Area, AreaEnum } from '@/lib/models';
import { useDeepLTranslate } from '@/hooks/useDeepLTranslate';
import { setDashboardMessage } from '@/lib/firebase';
import humanizeString from 'humanize-string';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { TargetLanguageCode } from 'deepl-node';

export function ManagerMessage() {
    const locale = useLocale();
    const t = useTranslations();
    const globalMOTDs = useGlobalState();
    const areas = Object.keys(AreaEnum).map((key) => AreaEnum[key as keyof typeof AreaEnum] as Area);
    const [currentArea, setCurrentArea] = useState<Area>(areas[0]);
    const [currentMOTD, setCurrentMOTD] = useState<string>(globalMOTDs.dashboardMessages[currentArea]);
    const [translation, setText] = useDeepLTranslate(locale as TargetLanguageCode);

    useEffect(() => setCurrentMOTD(translation), [translation]);

    useEffect(() => {
        if (!globalMOTDs) return;
        setText(globalMOTDs.dashboardMessages[currentArea]);
    }, [currentArea, globalMOTDs]);

    const onSubmitMOTD = () => {
        setDashboardMessage(currentArea as Area, currentMOTD);
    };
    const onUpdateMOTD = (event: any) => {
        setCurrentMOTD(event.currentTarget.value);
    };

    return (
        <>
            <Select
                defaultValue={currentArea}
                onValueChange={setCurrentArea}>
                <SelectTrigger>
                    <SelectValue placeholder={'Area'} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Stage</SelectLabel>
                        <>
                            {areas.map((area) => (
                                <SelectItem
                                    key={area}
                                    value={area}>
                                    {humanizeString(area)}
                                </SelectItem>
                            ))}
                        </>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Textarea
                className={'mt-2'}
                value={currentMOTD}
                onInput={onUpdateMOTD}
                placeholder={'Enter message of the day...'}
            />
            <div className={'flex justify-between items-center'}>
                <span className={'text-[0.825rem] opacity-50'}>{t('HINT_AUTOMATIC_TRANSLATION')}</span>
                <Button
                    className={'mt-2'}
                    variant={'secondary'}
                    onClick={onSubmitMOTD}>
                    Submit
                </Button>
            </div>
        </>
    );
}
