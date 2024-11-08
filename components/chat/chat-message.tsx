import React from 'react';
import { Card } from '@/components/ui/card';

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
    return (
        <Card
            className={`p-3 max-w-[75%] ${currentUser.userId === chatMessage.sender.userId ? 'ml-auto bg-pink-200 ' : ''}`}>
            {chatMessage.sender.username}
            {chatMessage.receiver.username}
            {chatMessage.message}
            {chatMessage.timestamp.toISOString()}
        </Card>
    );
}
