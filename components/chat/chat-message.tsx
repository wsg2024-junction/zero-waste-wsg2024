'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import moment from 'moment';
import { translate } from '@/lib/deepl';
import { useLanguage } from '@/app/_utils/useLanguage';
import { useLocale } from '@/app/_utils/loadLocale';
import { ChatMessageModel, User } from '@/lib/models';

export interface ChatMessageProperties {
    sender: User;
    message: string;
    area?: string;
    createdAt?: Date;
}

export default function ChatMessage({
    showOriginal = false,
    currentUser,
    chatMessage,
}: {
    showOriginal?: boolean;
    currentUser: User;
    chatMessage: ChatMessageModel;
}) {
    const [lang] = useLanguage();
    const locale = useLocale(lang);
    const isCurrentUser = chatMessage.sender.userId === currentUser.userId;

    const [translation, setTranslation] = useState<string>(chatMessage.message);

    useEffect(() => {
        translate(chatMessage.message, lang).then((translation) => {
            setTranslation(translation.text);
        });
    }, [lang]);

    return (
        <div>
            <div className={`w-fit opacity-40 text-[0.825rem] ${isCurrentUser ? 'ml-auto' : ''}`}>
                {locale.messages['GENERAL_' + chatMessage.area]}
            </div>
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
                    className={`relative min-w-[5rem] p-2 pb-6 text-wrap break-words overflow-hidden  max-w-[75%] ${isCurrentUser ? 'ml-auto bg-primary-200 ' : ''}`}>
                    <span>{showOriginal ? chatMessage.message : translation}</span>
                    <span className={'absolute bottom-1 right-2 opacity-40 text-[0.825rem]'}>
                        {moment(chatMessage.createdAt?.toDate()).format('h:mm a')}
                    </span>
                </Card>
            </div>
        </div>
    );
}
