'use client';
import { Button } from '@/components/ui/button';
import { MaximizeIcon, MessageSquareIcon, MinimizeIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Chat from '@/components/chat/chat';
import { useState } from 'react';
import LanguageSelector from '@/components/language-selector/language-selector';
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";
import {useParams, useSearchParams} from "next/navigation";

export default function ChatPopover() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();
    const [expanded, setExpanded] = useState(true);
    const queryParams = useSearchParams();
    const open = queryParams.get('open') === 'true';

    const setLang = (nextLocale: string) => {
        const queryParams = { open: true };

        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname: pathname, params: params, query: queryParams },
            { locale: nextLocale },
        );
    };
    const onOpenChange = (isOpen: boolean) => {
        const newQueryParams = new URLSearchParams(queryParams.toString());
        if (isOpen) {
            newQueryParams.set('open', 'true');
        } else {
            newQueryParams.delete('open');
        }

        router.replace(
            { pathname, query: Object.fromEntries(newQueryParams.entries()) },
            undefined,
        );
    };

    return (
        <Popover defaultOpen={open} onOpenChange={onOpenChange}>
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
                    <div className={'absolute top-2 left-[50px] z-10'}>
                        <LanguageSelector
                            lang={locale}
                            setLang={setLang}
                        />
                    </div>
                    <Chat />
                </div>
            </PopoverContent>
        </Popover>
    );
}
