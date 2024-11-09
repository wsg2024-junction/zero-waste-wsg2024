export const messages = {
    NAV_HOME: 'Acasă',
    NAV_CHAT: 'Chat',
    NAV_LANG: 'Limbă',
    CHAT_SHOW_ORIGINAL: 'Afișează originalul',
    CHAT_SHOW_TRANSLATION: 'Afișează traducerea',
    CHAT_HINT_ENTER_TEXT: 'Introduceți text aici...',
    CHAT_SEND: 'Trimite',
    GENERAL_PREPRODUCTION: 'Pre-producție',
    GENERAL_COOKING: 'Gătit',
    GENERAL_STORAGE: 'Depozitare',
    GENERAL_PACKAGING: 'Ambalare',
} as const;

const locale = { messages };
export default locale;
