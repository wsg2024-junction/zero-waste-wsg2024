import { Batch } from '@/lib/models';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type PreproductionBatch = Omit<Batch, 'status'> & {
    status: Extract<Batch['status'], { stage: 'preproduction' }>;
};

export type BatchSelectorProps = {
    batches: PreproductionBatch[];
    selectedBatch: PreproductionBatch | undefined;
    onSelected: (batch: PreproductionBatch) => void;
};

export function BatchSelector(props: BatchSelectorProps) {
    const t = useTranslations('preproduction');
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center space-x-4">
            <Label htmlFor="batchSelector">{t('batch')}</Label>
            <Popover
                open={open}
                onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="batchSelector"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between">
                        {props.selectedBatch && props.selectedBatch.number
                            ? `${t('batch')} ${props.selectedBatch.number}`
                            : t('selectBatch')}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder={t('searchBatch')} />
                        <CommandList>
                            <CommandEmpty>{t('noBatchAvailable')}</CommandEmpty>
                            <CommandGroup>
                                {props.batches.map((batch) => (
                                    <CommandItem
                                        key={batch.number}
                                        value={batch.number.toString()}
                                        disabled={props.selectedBatch?.number === batch.number}
                                        onSelect={() => {
                                            props.onSelected(batch);
                                            setOpen(false);
                                        }}>
                                        {t('batch')} {batch.number}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                props.selectedBatch?.number === batch.number
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
