export const messages = {
    NAV_HOME: '홈',
    NAV_CHAT: '채팅',
    NAV_LANG: '언어',
    CHAT_SHOW_ORIGINAL: '원본 보기',
    CHAT_SHOW_TRANSLATION: '번역 보기',
    CHAT_HINT_ENTER_TEXT: '여기에 텍스트를 입력하세요...',
    CHAT_SEND: '보내기',
    GENERAL_PREPRODUCTION: '사전 제작',
    GENERAL_COOKING: '요리',
    GENERAL_STORAGE: '저장',
    GENERAL_PACKAGING: '포장',
} as const;

const locale = { messages };
export default locale;
