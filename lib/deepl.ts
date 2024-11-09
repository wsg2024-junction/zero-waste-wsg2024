'use server';
import * as deepl from 'deepl-node';
import { TargetLanguageCode, TextResult } from 'deepl-node';
import { deepLConfig } from '@/firebaseConfig';

const translator = new deepl.Translator(deepLConfig.apiKey);

// In Memory Cache

const cache = new Map<string, TextResult>();

export async function translate(text: string, targetLang: TargetLanguageCode): Promise<TextResult> {
    const cacheKey = targetLang + '__' + text;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as TextResult;
    }

    const result = await translator.translateText(text, null, targetLang);
    cache.set(targetLang + '__' + text, result);

    return result;
}
