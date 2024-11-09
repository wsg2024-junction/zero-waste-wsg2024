import { useEffect, useState } from 'react';
import { translate } from '@/lib/deepl';
import { TargetLanguageCode } from 'deepl-node';

export function useDeepLTranslate(locale: TargetLanguageCode) {
    const [text, setText] = useState<string>('');
    const [translation, setTranslation] = useState<string>('');

    useEffect(() => {
        if (!text || !locale) return;
        translate(text, locale as TargetLanguageCode).then((translation) => {
            setTranslation(translation.text);
        });
    }, [locale, text]);

    return [translation, setText];
}
