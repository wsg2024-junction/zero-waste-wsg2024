import { translate } from '@/lib/deepl';
import { TargetLanguageCode } from 'deepl-node';
import { useEffect, useState } from 'react';

export function useDeepLTranslate(locale: TargetLanguageCode) {
    const [text, setText] = useState<string>('');
    const [translation, setTranslation] = useState<string>('');

    useEffect(() => {
        if (!text || !locale) return;
        translate(text, locale as TargetLanguageCode).then((translation) => {
            setTranslation(translation.text);
        });
    }, [locale, text]);

    return [translation, setText] as const;
}
export function useDeepLTranslated(locale: TargetLanguageCode, text: string) {
    const [translation, setTranslation] = useState<string>('');

    useEffect(() => {
        if (!text || !locale) return;
        translate(text, locale as TargetLanguageCode).then((translation) => {
            setTranslation(translation.text);
        });
    }, [locale, text]);

    return translation;
}
