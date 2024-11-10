import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ManagerMessage } from '@/components/manager/manager-message';

export function ManagerMessagePopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className={
                        'text-black hover:text-black bg-amber-200 hover:bg-amber-300 absolute bottom-20 right-4 w-12 h-12 shadow-xl'
                    }>
                    <Send />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={'w-96 max-w-[90vw] h-96 md:h-64'}
                collisionPadding={10}
                sticky="always">
                <div className={'h-[100%] w-[100%] overflow-x-auto'}>
                    <h2 className={'font-bold text-lg mb-2'}>Send Dashboard Message</h2>
                    <ManagerMessage />
                </div>
            </PopoverContent>
        </Popover>
    );
}
