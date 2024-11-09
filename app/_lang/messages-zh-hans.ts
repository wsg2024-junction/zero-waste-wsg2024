export const messages = {
    NAV_HOME: '主页',
    NAV_CHAT: '聊天',
    NAV_LANG: '语言',
    CHAT_SHOW_ORIGINAL: '显示原文',
    CHAT_SHOW_TRANSLATION: '显示翻译',
    CHAT_HINT_ENTER_TEXT: '在此输入文本...',
    CHAT_SEND: '发送',
    GENERAL_PREPRODUCTION: '预生产',
    GENERAL_COOKING: '烹饪',
    GENERAL_STORAGE: '存储',
    GENERAL_PACKAGING: '包装',
} as const;

const locale = { messages };
export default locale;
