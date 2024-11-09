'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Area, AreaEnum } from '@/lib/models';
import { useEffect, useState } from 'react';
import humanizeString from 'humanize-string';
import { Button } from '@/components/ui/button';
import { useGlobalState } from '@/hooks/useModels';
import { Textarea } from '@/components/ui/textarea';
import { setDashboardMessage } from '@/lib/firebase';
import { useDeepLTranslate } from '@/hooks/useDeepLTranslate';
import { useLocale, useTranslations } from 'next-intl';
import { TargetLanguageCode } from 'deepl-node';

export default function ManagerApp() {
    const locale = useLocale();
    const t = useTranslations();
    const globalMOTDs = useGlobalState();
    const areas = Object.keys(AreaEnum).map((key) => AreaEnum[key] as string);
    const [currentArea, setCurrentArea] = useState(areas[0]);
    const [currentMOTD, setCurrentMOTD] = useState<string>(globalMOTDs.dashboardMessages[currentArea]);
    const [translation, setText] = useDeepLTranslate(locale as TargetLanguageCode);

    useEffect(() => {
        console.log(translation);
        setCurrentMOTD(translation);
    }, [translation]);

    useEffect(() => {
        if (!globalMOTDs) return;
        setText(globalMOTDs.dashboardMessages[currentArea]);
    }, [currentArea, globalMOTDs]);

    const onSubmitMOTD = () => {
        setDashboardMessage(currentArea as Area, currentMOTD).then((r) => console.log(r));
    };
    const onUpdateMOTD = (event: any) => {
        setCurrentMOTD(event.currentTarget.value);
    };

    return (
        <div className={'flex flex-col '}>
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
            <span className={'text-[0.825rem] opacity-50'}>{t('HINT_AUTOMATIC_TRANSLATION')}</span>
            <Button
                className={'mt-2'}
                variant={'secondary'}
                onClick={onSubmitMOTD}>
                Submit
            </Button>
        </div>
    );
}
