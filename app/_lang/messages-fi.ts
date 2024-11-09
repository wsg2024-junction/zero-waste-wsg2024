export const messages = {
    NAV_HOME: 'Koti',
    NAV_CHAT: 'Keskustelu',
    NAV_LANG: 'Kieli',
    CHAT_SHOW_ORIGINAL: 'Näytä alkuperäinen',
    CHAT_SHOW_TRANSLATION: 'Näytä käännös',
    CHAT_HINT_ENTER_TEXT: 'Kirjoita teksti tähän...',
    CHAT_SEND: 'Lähetä',
    GENERAL_PREPRODUCTION: 'Esituotanto',
    GENERAL_COOKING: 'Ruonlaitto',
    GENERAL_STORAGE: 'Varastointi',
    GENERAL_PACKAGING: 'Pakkaaminen',
} as const;

const locale = { messages };
export default locale;
