import { Batch } from '@/lib/models';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type BatchSelectorProps = {
    batches: Batch[];
    selectedBatch: Batch | undefined;
    onSelected: (batch: Batch) => void;
};

export function BatchSelector(props: BatchSelectorProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center space-x-4">
            <Label htmlFor="batchSelector">Batch</Label>
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
                            ? `Batch ${props.selectedBatch.number}`
                            : 'Select batch...'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search batch..." />
                        <CommandList>
                            <CommandEmpty>No batch available.</CommandEmpty>
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
                                        Batch {batch.number}
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
