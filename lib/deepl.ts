'use server';
import * as deepl from 'deepl-node';
import { TargetLanguageCode, TextResult } from 'deepl-node';
import { deepLConfig } from '@/firebaseConfig';

const translator = new deepl.Translator(deepLConfig.apiKey);
export async function translate(text: string, targetLang: TargetLanguageCode): Promise<TextResult> {
    return await translator.translateText(text, null, targetLang);
}
