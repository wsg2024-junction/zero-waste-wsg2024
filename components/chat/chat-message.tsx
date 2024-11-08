import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import moment from 'moment';

export interface ChatMessageProperties {
    sender: User;
    receiver: User;
    message: string;
    timestamp: Date;
}

export default async function ChatMessage({
    currentUser,
    chatMessage,
}: {
    currentUser: User;
    chatMessage: ChatMessageProperties;
}) {
    const isCurrentUser = chatMessage.sender.userId === currentUser.userId;

    return (
        <div className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            <div>
                <Image
                    src="/images/default_user.png"
                    height={48}
                    width={48}
                    className={'rounded-full flex-auto'}
                    alt="HK Foods"></Image>
            </div>
            <Card
                className={`relative p-3 pb-6 text-wrap break-words overflow-hidden  max-w-[75%] ${isCurrentUser ? 'ml-auto bg-primary-200 ' : ''}`}>
                <span>{chatMessage.message}</span>
                <span className={'absolute bottom-1 right-2 opacity-40 text-[0.875rem]'}>
                    {moment(chatMessage.timestamp).format('DD/MM/YYYY, h:mm a')}
                </span>
            </Card>
        </div>
    );
}
