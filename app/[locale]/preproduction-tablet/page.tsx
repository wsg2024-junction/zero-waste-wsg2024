'use client';

import { BatchSelector } from '@/components/preproduction-tablet/batch-selector';
import { BatchSizeForm } from '@/components/preproduction-tablet/batch-size-form';
import { H4 } from '@/components/ui/typography';
import { useBatches } from '@/hooks/useModels';
import { updateBatch } from '@/lib/firebase';
import { Batch } from '@/lib/models';
import { useState } from 'react';

export default function PreproductionApp() {
    const batches = useBatches();
    const preproductionBatches = batches.filter((batch) => batch.status.stage === 'preproduction');
    const [selectedBatch, setSelectedBatch] = useState<Batch>();

    return (
        <div className="space-y-4">
            <BatchSelector
                batches={preproductionBatches}
                selectedBatch={selectedBatch}
                onSelected={setSelectedBatch}></BatchSelector>
            {selectedBatch === undefined ? (
                <H4>Please select a batch</H4>
            ) : preproductionBatches.every((batch) => batch.number !== selectedBatch.number) ? (
                <H4>Batch got moved out of production</H4>
            ) : (
                <>
                    <H4>Please enter your measurements</H4>
                    <BatchSizeForm
                        onSubmit={(measurements) => {
                            updateBatch({
                                ...selectedBatch,
                                status: {
                                    ...selectedBatch.status,
                                    samples: [...selectedBatch.status.samples],
                                },
                            });
                        }}></BatchSizeForm>
                </>
            )}
        </div>
    );
}
