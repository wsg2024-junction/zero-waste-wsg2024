'use client';
import ChatMessage, { ChatMessageProperties } from '@/components/chat/chat-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ChatProperties {}

const mockUser: User = {
    userId: 1,
    username: 'manager_cooking',
    firstname: 'Max',
    lastname: 'Mustermann',
    production_step: 'COOKING',
};

const mockUser2: User = {
    userId: 2,
    username: 'manager_preproduction',
    firstname: 'Joe',
    lastname: 'Doe',
    production_step: 'PREPRODUCTION',
};

export default function Chat() {
    // const cookieStore = await cookies(); // Get user from cookies
    const currentUser = mockUser;
    const [message, setMessage] = useState('');
    const [showOriginal, setShowOriginal] = useState(false);

    const chatMessages: ChatMessageProperties[] = [
        {
            sender: mockUser,
            receiver: mockUser2,
            message: 'Hello Maria, I have a question regarding the new product launch.',
            timestamp: new Date(),
        },
        {
            sender: mockUser2,
            receiver: mockUser,
            message: 'Hello Max, what is your question?',
            timestamp: new Date(),
        },
    ];

    const [messages, setMessages] = useState<ChatMessageProperties[]>(chatMessages);

    const onUpdateMessage = (event: any) => {
        setMessage(event.currentTarget.value);
    };

    const onAddMessage = () => {
        const newMessage = {
            sender: currentUser,
            receiver: mockUser2,
            message: message,
            timestamp: new Date(),
        };
        setMessage('');
        setMessages((prevValue) => {
            return [...prevValue, newMessage];
        });
    };

    const t = useTranslations();

    return (
        <div className={'relative flex flex-col h-[100%] pb-[4rem]'}>
            <div className={'flex flex-row-reverse'}>
                <Button
                    className={'ml-auto'}
                    variant="link"
                    onClick={() => setShowOriginal(!showOriginal)}>
                    {showOriginal ? t('CHAT_SHOW_TRANSLATION') : t('CHAT_SHOW_ORIGINAL')}
                </Button>
            </div>
            <div className={'space-y-2 p-1 overflow-y-auto'}>
                {messages.map((chatMessage, index) => (
                    <ChatMessage
                        showOriginal={showOriginal}
                        currentUser={currentUser}
                        key={index}
                        chatMessage={chatMessage}
                    />
                ))}
            </div>
            <div className={'absolute bottom-1 w-full flex flex-row gap-2'}>
                <Input
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') onAddMessage();
                    }}
                    inputMode="text"
                    value={message}
                    onInput={onUpdateMessage}
                    className={'w-full'}
                    placeholder={t('CHAT_HINT_ENTER_TEXT')}
                />
                <Button
                    className={'flex-shrink-0'}
                    disabled={message.length === 0}
                    variant="secondary"
                    title={t('CHAT_SEND')}
                    onClick={onAddMessage}
                    size="icon">
                    <SendIcon />
                </Button>
            </div>
        </div>
    );
}
