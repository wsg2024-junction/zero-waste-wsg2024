'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from '@/components/ui/select';
import { LanguagesIcon } from 'lucide-react';

export interface Language {
    code: string;
    name: string;
    flagIcon: string;
}

export const languages: Language[] = [
    {
        code: 'en-US',
        name: 'English',
        flagIcon: '🇺🇸',
    },
    {
        code: 'fi',
        name: 'Finnish',
        flagIcon: '🇫🇮',
    },
    {
        code: 'de',
        name: 'German',
        flagIcon: '🇩🇪',
    },
    {
        code: 'pl',
        name: 'Polish',
        flagIcon: '🇵🇱',
    },
    {
        code: 'ru',
        name: 'Russian',
        flagIcon: '🇷🇺',
    },
    {
        code: 'uk',
        name: 'Ukrainian',
        flagIcon: '🇺🇦',
    },
    {
        code: 'es',
        name: 'Estonian',
        flagIcon: '🇪🇪',
    },
    {
        code: 'ro',
        name: 'Romanian',
        flagIcon: '🇷🇴',
    },
    {
        code: 'cs',
        name: 'Czech',
        flagIcon: '🇨🇿',
    },
    {
        code: 'id',
        name: 'Indonesian',
        flagIcon: '🇮🇩',
    },
    {
        code: 'zh-hans',
        name: 'Chinese',
        flagIcon: '🇨🇳',
    },

    {
        code: 'ko',
        name: 'Korean',
        flagIcon: '🇰🇷',
    },
];

export default function LanguageSelector({
    lang,
    setLang,
}: {
    lang: string;
    setLang: (lang: string) => void;
}) {
    return (
        <Select
            defaultValue={lang}
            onValueChange={setLang}>
            <SelectTrigger className={'w-[65px]'}>
                <LanguagesIcon size={20} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <>
                        {languages.map((language) => (
                            <SelectItem
                                key={language.code}
                                value={language.code}>
                                {language.flagIcon} {language.name}
                            </SelectItem>
                        ))}
                    </>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
