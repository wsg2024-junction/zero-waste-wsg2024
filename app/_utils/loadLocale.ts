'use client';
import { TargetLanguageCode } from 'deepl-node';
import enUs from '../_lang/messages-en-US.ts';
import de from '../_lang/messages-de.ts';

const locales = {
    'en-US': enUs,
    de: de,
} as const;

export const useLocale = (lang: TargetLanguageCode) => {
    return locales[lang] ?? locales['en-US'];
};
