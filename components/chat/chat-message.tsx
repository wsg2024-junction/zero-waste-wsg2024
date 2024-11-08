import React from 'react'


export interface ChatMessageProperties {
    sender: User;
    receiver: User;
    message: string;
    timestamp: Date;
}

export default async function ChatMessage({chatMessage}: {chatMessage: ChatMessageProperties}) {
    return (
        <div className="">
            {chatMessage.sender.username}
            {chatMessage.receiver.username}
            {chatMessage.message}
            {chatMessage.timestamp.toISOString()}
        </div>
    );
}