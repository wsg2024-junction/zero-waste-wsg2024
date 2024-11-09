'use client';
import { TargetLanguageCode } from 'deepl-node';
import enUs from '../_lang/messages-en-US.ts';
import de from '../_lang/messages-de.ts';
import cs from '../_lang/messages-cs.ts';
import es from '../_lang/messages-es.ts';
import fi from '../_lang/messages-fi.ts';
import id from '../_lang/messages-id.ts';
import ko from '../_lang/messages-ko.ts';
import pl from '../_lang/messages-pl.ts';
import ro from '../_lang/messages-ro.ts';
import ru from '../_lang/messages-ru.ts';
import uk from '../_lang/messages-uk.ts';
import zhHans from '../_lang/messages-zh-hans.ts';

const locales = {
    'en-US': enUs,
    de: de,
    cs: cs,
    es: es,
    fi: fi,
    id: id,
    ko: ko,
    pl: pl,
    ro: ro,
    ru: ru,
    uk: uk,
    'zh-Hans': zhHans,
} as const;

export const useLocale = (lang: TargetLanguageCode) => {
    return locales[lang] ?? locales['en-US'];
};
