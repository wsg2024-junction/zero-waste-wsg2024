import { Button } from '@/components/ui/button';
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
import { useDeepLTranslate } from '@/hooks/useDeepLTranslate';
import { useGlobalState } from '@/hooks/useModels';
import { setDashboardMessage } from '@/lib/firebase';
import { Area, AreaEnum } from '@/lib/models';
import { TargetLanguageCode } from 'deepl-node';
import humanizeString from 'humanize-string';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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
        if (!setText) return;

        setText(globalMOTDs.dashboardMessages[currentArea]);
    }, [currentArea, globalMOTDs, setText]);

    const onSubmitMOTD = () => {
        setDashboardMessage(currentArea as Area, currentMOTD);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                        <SelectLabel>{t('stage')}</SelectLabel>
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
                placeholder={t('managerApp.message.placeholder')}
            />
            <div className={'flex justify-between items-center'}>
                <span className={'text-[0.825rem] opacity-50'}>
                    {t('managerApp.message.automaticTranslationHint')}
                </span>
                <Button
                    className={'mt-2'}
                    variant={'secondary'}
                    onClick={onSubmitMOTD}>
                    {t('managerApp.message.submit')}
                </Button>
            </div>
        </>
    );
}
