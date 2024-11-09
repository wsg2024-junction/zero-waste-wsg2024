'use client';
import React, { useState } from 'react';
import ChatMessage, { ChatMessageProperties } from '@/components/chat/chat-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';

interface ChatProperties {}

const mockUser = {
    userId: 1,
    username: 'manager_cooking',
    firstname: 'Max',
    lastname: 'Mustermann',
};

const mockUser2 = {
    userId: 2,
    username: 'manager_preproduction',
    firstname: 'Joe',
    lastname: 'Doe',
};

export default function Chat() {
    // const cookieStore = await cookies(); // Get user from cookies
    const currentUser = mockUser;
    const [message, setMessage] = useState('');

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

    return (
        <div className={'relative m-2 h-max pb-[4rem]'}>
            <div className={'space-y-2'}>
                {messages.map((chatMessage, index) => (
                    <ChatMessage
                        currentUser={currentUser}
                        key={index}
                        chatMessage={chatMessage}
                    />
                ))}
            </div>
            <div className={'absolute bottom-1 left-1 right-1 flex flex-row gap-2'}>
                <Input
                    inputMode="text"
                    value={message}
                    onInput={onUpdateMessage}
                    className={'w-full'}
                    placeholder={'Type your message here...'}
                />
                <Button
                    disabled={message.length === 0}
                    variant="secondary"
                    onClick={onAddMessage}
                    size="icon">
                    <SendIcon />
                </Button>
            </div>
        </div>
    );
}
