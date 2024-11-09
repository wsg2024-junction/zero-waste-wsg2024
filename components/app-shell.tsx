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
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { LanguagesIcon } from 'lucide-react';

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
        code: 'de',
        name: 'German',
        flagIcon: '🇩🇪',
    },
    {
        code: 'es',
        name: 'Spanish',
        flagIcon: '🇪🇸',
    },
    {
        code: 'fr',
        name: 'French',
        flagIcon: '🇫🇷',
    },
    {
        code: 'fi',
        name: 'Finnish',
        flagIcon: '🇫🇮',
    },
];

export function AppShell(props: React.PropsWithChildren<AppShellProps>) {
    const localStorageLanguage = localStorage.getItem('language');
    let languageStore = languages[0];
    if (localStorageLanguage) {
        console.log(localStorageLanguage);
        languageStore = JSON.parse(localStorageLanguage) as Language;
    }

    const [selectedLanguage, setSelectedLanguage] = useState<string>(languageStore.code);

    const onChangeLanguage = (language: string) => {
        setSelectedLanguage(language);
        const selectedLanguage = languages.find((lang) => lang.code === language);
        localStorage.setItem('language', JSON.stringify(selectedLanguage));
        window.dispatchEvent(new Event('languagechange'));
    };

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
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Select
                    value={selectedLanguage}
                    onValueChange={onChangeLanguage}>
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
