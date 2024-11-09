export const messages = {
    NAV_HOME: 'Home',
    NAV_CHAT: 'Chat',
    NAV_LANG: 'Sprache',
    CHAT_SHOW_ORIGINAL: 'Original anzeigen',
    CHAT_SHOW_TRANSLATION: 'Übersetzung anzeigen',
    CHAT_HINT_ENTER_TEXT: 'Geben Sie hier den Text ein...',
    CHAT_SEND: 'Senden',
    GENERAL_PREPRODUCTION: 'Vorproduktion',
    GENERAL_COOKING: 'Kochen',
    GENERAL_STORAGE: 'Lagerung',
    GENERAL_PACKAGING: 'Verpackung',
} as const;

const locale = { messages };
export default locale;
