import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { P } from '../ui/typography';

type Measurement = {
    id: string;
    weight: number;
};

export type BatchSizeFormType = {
    onSubmit: (sizes: Measurement[]) => void;
};

export function BatchSizeForm(props: BatchSizeFormType) {
    const t = useTranslations('preproduction');

    const weightSchema = z.object({
        weight: z.coerce
            .number({
                invalid_type_error: t('enterWeight'),
                required_error: t('enterWeight'),
            })
            .positive(t('enterWeight')),
    });
    const weightForm = useForm<z.infer<typeof weightSchema>>({
        resolver: zodResolver(weightSchema),
        defaultValues: {
            weight: '',
        },
    });

    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [submitError, setSubmitError] = useState<string>();

    const addMeasurement = ({ weight }: z.infer<typeof weightSchema>) => {
        setMeasurements((measurements) => [...measurements, { id: crypto.randomUUID(), weight }]);
        weightForm.reset({ weight: '' });
    };

    const submit = () => {
        if (measurements.length === 0) {
            setSubmitError(t('noMeasurements'));
            return;
        }

        props.onSubmit(measurements);
        setMeasurements([]);
        setSubmitError(undefined);
        weightForm.reset({ weight: '' });
    };

    return (
        <>
            <div className="w-full flex flex-col items-stretch">
                <Form {...weightForm}>
                    <form onSubmit={weightForm.handleSubmit(addMeasurement)}>
                        <FormField
                            control={weightForm.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="weight">{t('weight')} (g)</FormLabel>
                                    <FormControl>
                                        <div className="flex max-w-sm items-center space-x-2">
                                            <Input
                                                id="weight"
                                                type="number"
                                                placeholder={`${t('weight')}...`}
                                                {...field}
                                            />
                                            <Button
                                                variant="outline"
                                                type="submit"
                                                size="icon">
                                                <PlusIcon></PlusIcon>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>

            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('measurements')}</TableHead>
                            <TableHead className="w-9"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {measurements.map((measurement) => (
                            <TableRow key={measurement.id}>
                                <TableCell>{measurement.weight} g</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setMeasurements((measurements) =>
                                                measurements.filter((m) => measurement.id !== m.id),
                                            )
                                        }>
                                        <TrashIcon></TrashIcon>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {measurements.length === 0 && (
                            <TableRow>
                                <TableCell>{t('noMeasurements')}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex w-full justify-between items-baseline">
                <P className="text-[0.8rem] font-medium text-destructive">{submitError}</P>
                <Button
                    className={'text-white'}
                    onClick={submit}>
                    {t('submit')}
                </Button>
            </div>
        </>
    );
}
