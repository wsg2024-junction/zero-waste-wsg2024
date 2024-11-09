'use client';
import { Button } from '@/components/ui/button';
import { MaximizeIcon, MessageSquareIcon, MinimizeIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Chat from '@/components/chat/chat';
import { useState } from 'react';

export default function ChatPopover() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className={'absolute bottom-4 right-4 w-12 h-12 shadow-xl'}>
                    <MessageSquareIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={`${expanded ? 'w-[90vw] h-[90vh]' : 'w-96 h-96'}`}
                collisionPadding={10}
                sticky="always">
                <div className={'h-[100%] w-[100%]'}>
                    <Button
                        className={'absolute top-2 left-2 z-10'}
                        onClick={() => {
                            setExpanded((t) => !t);
                        }}
                        size="icon">
                        {expanded ? <MinimizeIcon /> : <MaximizeIcon />}
                    </Button>
                    <Chat />
                </div>
            </PopoverContent>
        </Popover>
    );
}
