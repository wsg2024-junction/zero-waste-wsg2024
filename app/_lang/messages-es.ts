export const messages = {
    NAV_HOME: 'Avaleht',
    NAV_CHAT: 'Vestlus',
    NAV_LANG: 'Keel',
    CHAT_SHOW_ORIGINAL: 'Näita originaali',
    CHAT_SHOW_TRANSLATION: 'Näita tõlget',
    CHAT_HINT_ENTER_TEXT: 'Sisesta tekst siia...',
    CHAT_SEND: 'Saada',
    GENERAL_PREPRODUCTION: 'Eeltootmine',
    GENERAL_COOKING: 'Küpsetamine',
    GENERAL_STORAGE: 'Ladustamine',
    GENERAL_PACKAGING: 'Pakendamine',
} as const;

const locale = { messages };
export default locale;
