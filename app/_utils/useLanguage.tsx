'use client';

import { createContext, useContext, useState } from 'react';
import { TargetLanguageCode } from 'deepl-node';
import { loadLocale } from '@/app/_utils/loadLocale';

interface LanguageContextProps {
    lang: TargetLanguageCode;
    setLang: (lang: TargetLanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    lang: 'en-US',
    setLang: () => {},
});

export const LanguageProvider = ({ children }: React.PropsWithChildren) => {
    const [lang, setLang] = useState<TargetLanguageCode>(
        (localStorage?.getItem('lang') as TargetLanguageCode) || 'en-US',
    );

    const setLanguage = (lang: TargetLanguageCode) => {
        localStorage.setItem('lang', lang);
        setLang(lang);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: setLanguage }}>{children}</LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const { lang, setLang } = useContext(LanguageContext);

    return [lang, setLang];
};
