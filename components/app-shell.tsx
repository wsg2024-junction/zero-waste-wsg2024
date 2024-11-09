'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from '@/components/ui/select';
import { LanguagesIcon } from 'lucide-react';
import { useLanguage } from '@/app/_utils/useLanguage';
import { useLocale } from '@/app/_utils/loadLocale';

export type AppShellProps = {
    links: {
        name: string;
        url: string;
    }[];
};

interface Language {
    code: string;
    name: string;
    flagIcon: string;
}

const languages: Language[] = [
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
        flagIcon: 'ko',
    },
];

export function AppShell(props: React.PropsWithChildren<AppShellProps>) {
    const [lang, setLang] = useLanguage();
    const locale = useLocale(lang);

    return (
        <div className="h-full flex flex-col">
            <header className="border-b flex justify-between items-center p-2 gap-2">
                <nav className="flex h-16 px-4 items-center p-2  max-w-7xl lg:px-8">
                    <Link
                        href="/"
                        className="mr-12">
                        <Image
                            src="/images/logo.png"
                            height={34}
                            width={164}
                            alt="HK Foods"></Image>
                    </Link>
                    <ul className="flex list-none gap-8">
                        {props.links.map((link) => (
                            <li key={link.url}>
                                <Link
                                    href={link.url}
                                    className="hover:text-primary font-semibold leading-[4rem]">
                                    {locale.messages['NAV_' + link.name.toUpperCase()]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Select
                    value={lang}
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
            </header>
            <main className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden isolate">
                <div className="flex-1 w-full p-6 mx-auto max-w-7xl lg:px-8">{props.children}</div>
            </main>
        </div>
    );
}
