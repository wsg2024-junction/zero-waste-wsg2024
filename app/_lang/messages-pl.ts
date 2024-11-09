export const messages = {
    NAV_HOME: 'Strona główna',
    NAV_CHAT: 'Czat',
    NAV_LANG: 'Język',
    CHAT_SHOW_ORIGINAL: 'Pokaż oryginał',
    CHAT_SHOW_TRANSLATION: 'Pokaż tłumaczenie',
    CHAT_HINT_ENTER_TEXT: 'Wpisz tekst tutaj...',
    CHAT_SEND: 'Wyślij',
    GENERAL_PREPRODUCTION: 'Przedprodukcja',
    GENERAL_COOKING: 'Gotowanie',
    GENERAL_STORAGE: 'Przechowywanie',
    GENERAL_PACKAGING: 'Pakowanie',
} as const;

const locale = { messages };
export default locale;
