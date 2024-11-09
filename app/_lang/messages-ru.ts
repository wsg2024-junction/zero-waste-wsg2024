export const messages = {
    NAV_HOME: 'Главная',
    NAV_CHAT: 'Чат',
    NAV_LANG: 'Язык',
    CHAT_SHOW_ORIGINAL: 'Показать оригинал',
    CHAT_SHOW_TRANSLATION: 'Показать перевод',
    CHAT_HINT_ENTER_TEXT: 'Введите текст здесь...',
    CHAT_SEND: 'Отправить',
    GENERAL_PREPRODUCTION: 'Предварительное производство',
    GENERAL_COOKING: 'Готовка',
    GENERAL_STORAGE: 'Хранение',
    GENERAL_PACKAGING: 'Упаковка',
} as const;

const locale = { messages };
export default locale;
