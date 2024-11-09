'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { useLocale } from '@/app/_utils/loadLocale';
import { useLanguage } from '@/app/_utils/useLanguage';
import { sendMessage, streamMessages } from '@/lib/firebase';
import { ChatMessageModel, User } from '@/lib/models';
import ChatMessage from '@/components/chat/chat-message';
import { Timestamp } from '@firebase/firestore';

const mockUser: User = {
    userId: 1,
    username: 'manager_cooking',
    firstname: 'Max',
    lastname: 'Mustermann',
    production_step: 'COOKING',
};

export default function Chat() {
    // const cookieStore = await cookies(); // Get user from cookies
    const currentUser = mockUser;
    const [message, setMessage] = useState('');
    const [showOriginal, setShowOriginal] = useState(false);
    const [messages, setMessages] = useState<ChatMessageModel[]>([]);

    useEffect(() => {
        streamMessages((messages: ChatMessageModel[]) => {
            console.log('Messages', messages);
            setMessages(messages);
        });
    }, []);

    const onUpdateMessage = (event: any) => {
        setMessage(event.currentTarget.value);
    };

    const onAddMessage = () => {
        const newMessage: ChatMessageModel = {
            sender: currentUser,
            message: message,
            createdAt: Timestamp.now(),
            area: 'PREPRODUCTION',
        };
        setMessage('');
        sendMessage(newMessage).then((t) => {
            console.log('Message sent', t);
        });
    };

    const [lang] = useLanguage();
    const locale = useLocale(lang);

    return (
        <div className={'relative flex flex-col h-[100%] pb-[4rem]'}>
            <div className={'flex flex-row-reverse'}>
                <Button
                    className={'ml-auto'}
                    variant="link"
                    onClick={() => setShowOriginal(!showOriginal)}>
                    {showOriginal
                        ? locale.messages.CHAT_SHOW_TRANSLATION
                        : locale.messages.CHAT_SHOW_ORIGINAL}
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
                    placeholder={locale.messages.CHAT_HINT_ENTER_TEXT}
                />
                <Button
                    className={'flex-shrink-0'}
                    disabled={message.length === 0}
                    variant="secondary"
                    title={locale.messages.CHAT_SEND}
                    onClick={onAddMessage}
                    size="icon">
                    <SendIcon />
                </Button>
            </div>
        </div>
    );
}
